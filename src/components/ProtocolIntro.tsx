/**
 * Onboarding: explains the protocol before the first question.
 * Owner: Person 1.
 *
 * TODO (Person 1): write the real explanation, add an interactive example
 * (play a short clip, show the graph at the same time), and a
 * "play the reference notes" button.
 */
import { GRAPHS } from '../data/graphs.ts'
import { describePreamble, sonify } from '../audio/sonification.ts'
import type { Player } from '../audio/usePlayer.ts'
import { LineChart } from './LineChart.tsx'

interface Props {
  player: Player
  onStart: () => void
}

export function ProtocolIntro({ player, onStart }: Props) {
  const sample = GRAPHS[0]
  const sonification = sonify(sample)
  const busy = player.status !== 'idle'

  return (
    <section className="intro">
      <h2>How to listen</h2>
      <p>
        Each graph is played as a short sequence of piano notes. Higher values are higher notes.
        Before the notes you will hear a short preamble:
      </p>
      <ul>
        <li>how long the clip is,</li>
        <li>the lowest value and the note it plays as,</li>
        <li>the highest value and the note it plays as,</li>
        <li>the starting value and its note,</li>
        <li>how much the value changes per whole step.</li>
      </ul>
      <p className="preamble">{describePreamble(sonification, sample.unit)}</p>

      <LineChart series={sample} activeIndex={player.activeIndex} />

      <div className="controls">
        <button
          type="button"
          onClick={() => (busy ? player.stop() : void player.play(sonification, describePreamble(sonification, sample.unit)))}
        >
          {busy ? 'Stop' : 'Play example'}
        </button>
        <button type="button" className="secondary" onClick={onStart}>
          Start lesson
        </button>
      </div>
    </section>
  )
}
