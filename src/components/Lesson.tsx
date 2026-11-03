/**
 * The lesson state machine. Connects graphs (P1), audio (P2) and quiz (P3).
 * Owner: Person 4.
 *
 * Flow:  intro -> [listen -> answer -> reveal] x N -> results
 *
 * TODO (Person 4): persist progress in localStorage, limit replays per
 * question (and record the count), keyboard shortcuts (space = play).
 */
import { useMemo, useState } from 'react'
import { describePreamble, sonify } from '../audio/sonification.ts'
import { usePlayer } from '../audio/usePlayer.ts'
import { getGraph } from '../data/graphs.ts'
import { QUESTIONS } from '../data/questions.ts'
import { checkAnswer, orderQuestions, scoreAnswers } from '../quiz/quiz.ts'
import type { AnswerRecord, LessonPhase } from '../types.ts'
import { GraphReveal } from './GraphReveal.tsx'
import { ProgressBar } from './ProgressBar.tsx'
import { ProtocolIntro } from './ProtocolIntro.tsx'
import { QuestionCard } from './QuestionCard.tsx'
import { Results } from './Results.tsx'

export function Lesson() {
  const [questions, setQuestions] = useState(() => orderQuestions(QUESTIONS))
  const [phase, setPhase] = useState<LessonPhase>({ kind: 'intro' })
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [hasListened, setHasListened] = useState(false)
  const player = usePlayer()

  const question = phase.kind === 'question' ? questions[phase.index] : null
  const graph = question ? getGraph(question.graphId) : null
  const sonification = useMemo(() => (graph ? sonify(graph) : null), [graph])
  const current = answers.find((a) => a.questionId === question?.id) ?? null

  const restart = () => {
    player.stop()
    setQuestions(orderQuestions(QUESTIONS))
    setAnswers([])
    setHasListened(false)
    setPhase({ kind: 'intro' })
  }

  const goToQuestion = (index: number) => {
    player.stop()
    setHasListened(false)
    if (index >= questions.length) setPhase({ kind: 'results' })
    else setPhase({ kind: 'question', index, stage: 'listen' })
  }

  const play = async () => {
    if (!sonification || !graph) return
    await player.play(sonification, describePreamble(sonification, graph.unit))
    setHasListened(true)
  }

  const answer = (chosenIndex: number) => {
    if (!question || phase.kind !== 'question') return
    player.stop()
    setAnswers((prev) => [...prev, checkAnswer(question, chosenIndex)])
    setPhase({ ...phase, stage: 'reveal' })
  }

  if (phase.kind === 'intro') {
    return <ProtocolIntro player={player} onStart={() => goToQuestion(0)} />
  }

  if (phase.kind === 'results') {
    return <Results result={scoreAnswers(answers)} questions={questions} onRestart={restart} />
  }

  if (!question || !graph || !sonification) return null
  const busy = player.status !== 'idle'

  return (
    <section className="lesson">
      <ProgressBar current={phase.index + 1} total={questions.length} />

      <div className="controls">
        <button type="button" onClick={busy ? player.stop : () => void play()}>
          {busy ? 'Stop' : hasListened ? 'Replay' : 'Play'}
        </button>
        {!hasListened && phase.stage !== 'reveal' && <span className="hint">Listen first, then answer.</span>}
      </div>

      <QuestionCard
        question={question}
        chosenIndex={current?.chosenIndex ?? null}
        disabled={!hasListened}
        onAnswer={answer}
      />

      {phase.stage === 'reveal' && (
        <>
          <GraphReveal graph={graph} sonification={sonification} activeIndex={player.activeIndex} />
          <button type="button" onClick={() => goToQuestion(phase.index + 1)}>
            {phase.index + 1 < questions.length ? 'Next question' : 'See results'}
          </button>
        </>
      )}
    </section>
  )
}
