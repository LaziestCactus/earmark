/**
 * Onboarding: explains the protocol before the first question.
 * Owner: Person 1.
 *
 * TODO (Person 1): write the real explanation, add an interactive example
 * (play a short clip, show the graph at the same time), and a
 * "play the reference notes" button.
 */
import { GRAPHS, TEST_GRAPHS } from '../data/graphs.ts'
import { describePreamble, preambleNumbers, sonify } from '../audio/sonification.ts'
import type { Player } from '../audio/usePlayer.ts'
import { LineChart } from './LineChart.tsx'

interface Props {
  player: Player
  onStart: () => void
  mode?: 'tutorial' | 'test'
}

export function ProtocolIntro({ player, onStart, mode = 'tutorial' }: Props) {
  const sample = mode === 'test' ? TEST_GRAPHS[0] : GRAPHS[0]
  const sonification = sonify(sample)
  const busy = player.status !== 'idle'
  const activePoint = sonification.notes[player.activeIndex]?.pointIndex ?? -1

  if (mode === 'test') {
    return (
      <section className="intro">
        <h2>Test mode</h2>
        <p>
          Each clip starts by naming the axes, then gives the protocol numbers in this order: length in seconds,
          lowest value, highest value, starting value, value per step. Then the notes play. Press Stop at any time
          to hear the value at that moment.
        </p>
        <p className="preamble">{describePreamble(sonification, sample)}</p>

        <LineChart series={sample} activeIndex={activePoint} />

        <div className="controls">
          <button
            type="button"
            onClick={() => (busy ? player.stop() : void player.play(sonification, describePreamble(sonification, sample)))}
          >
            {busy ? 'Stop' : 'Play sample'}
          </button>
          <button type="button" className="secondary" onClick={onStart}>
            Start test
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="intro">
      <h2>How to listen</h2>
      <p>
        Each graph is played as a run of short piano notes. Higher values are higher notes, one semitone per step.
        Before the notes you hear the axes, then five numbers in a fixed order:
      </p>
      <ol>
        <li>length of the clip in seconds,</li>
        <li>the lowest value,</li>
        <li>the highest value,</li>
        <li>the starting value,</li>
        <li>how much the value changes per step.</li>
      </ol>
      <p className="preamble">{describePreamble(sonification, sample, true)}</p>
      <p>
        In the test you only hear the short form: <strong>{preambleNumbers(sonification)}</strong>. Press Stop
        during playback to hear the value at that moment.
      </p>

      <LineChart series={sample} activeIndex={activePoint} />

      <div className="controls">
        <button
          type="button"
          onClick={() => (busy ? player.stop() : void player.play(sonification, describePreamble(sonification, sample, true)))}
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
