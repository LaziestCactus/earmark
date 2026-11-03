/**
 * Sonification engine: graph -> protocol preamble + timed note sequence.
 * Owner: Person 2.
 *
 * Pure TypeScript, no DOM or audio. Playback lives in piano.ts.
 *
 * TODO (Person 2):
 *  - decide trough-anchored (current) vs start-anchored pitch mapping
 *  - decide fixed clip length vs fixed time per point
 *  - optional glissando / continuous mode for the comparison condition
 */
import { DEFAULT_OPTIONS } from '../types.ts'
import type { Anchor, Graph, Note, ProtocolOptions, Sonification } from '../types.ts'

// ---------------------------------------------------------------------------
// Pitch helpers. MIDI 60 = C4 (middle C).
// ---------------------------------------------------------------------------

const NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'] as const

export const WHOLE_STEP = 2 // semitones

export function midiToName(midi: number): string {
  const octave = Math.floor(midi / 12) - 1
  return `${NAMES[((midi % 12) + 12) % 12]}${octave}`
}

export function nameToMidi(name: string): number {
  const m = /^([A-G])(#|b)?(-?\d+)$/.exec(name.trim())
  if (!m) throw new Error(`Bad note name: ${name}`)
  const [, letter, accidental, octave] = m
  let idx = NAMES.indexOf(letter as (typeof NAMES)[number])
  if (accidental === '#') idx += 1
  if (accidental === 'b') idx -= 1
  return (Number(octave) + 1) * 12 + idx
}

export function midiToFrequency(midi: number): number {
  return 440 * 2 ** ((midi - 69) / 12)
}

// ---------------------------------------------------------------------------
// Mapping
// ---------------------------------------------------------------------------

/**
 * Pick the smallest "nice" number (1, 2, 2.5, 5 × 10^k) that is >= `min`.
 * Nice numbers make the preamble easy to say and remember
 * ("one whole step is 5 degrees").
 */
export function niceStep(min: number): number {
  if (!(min > 0)) return 1
  const exp = Math.floor(Math.log10(min))
  const base = 10 ** exp
  for (const m of [1, 2, 2.5, 5, 10]) {
    const candidate = m * base
    if (candidate >= min - 1e-12) return candidate
  }
  return 10 * base // unreachable, keeps TS happy
}

/**
 * Map a graph to the Earmark protocol.
 *
 * Pitch mapping (v0):
 *   - The trough is anchored to `lowestMidi`.
 *   - Every value is quantised to the whole-step grid above the trough:
 *       midi = lowestMidi + 2 * round((y - trough) / unitsPerWholeStep)
 *   - `unitsPerWholeStep` is chosen so the peak still fits under `highestMidi`.
 *
 * Timing (v0):
 *   - Points are spaced evenly across `durationMs`.
 *   - Each note sounds for (1 - gapRatio) of its slot.
 */
export function sonify(graph: Graph, overrides: Partial<ProtocolOptions> = {}): Sonification {
  const opts: ProtocolOptions = { ...DEFAULT_OPTIONS, ...overrides }
  const { points } = graph
  if (points.length === 0) throw new Error('Cannot sonify an empty graph')
  if (opts.highestMidi - opts.lowestMidi < WHOLE_STEP) {
    throw new Error('Pitch range must span at least one whole step')
  }

  const ys = points.map((p) => p.y)
  const troughValue = Math.min(...ys)
  const peakValue = Math.max(...ys)
  const range = peakValue - troughValue

  const stepsAvailable = Math.floor((opts.highestMidi - opts.lowestMidi) / WHOLE_STEP)
  const unitsPerWholeStep = opts.unitsPerWholeStep ?? niceStep(range / stepsAvailable)

  const toMidi = (y: number): number => {
    const steps = Math.round((y - troughValue) / unitsPerWholeStep)
    return Math.min(opts.highestMidi, opts.lowestMidi + steps * WHOLE_STEP)
  }
  const anchor = (value: number): Anchor => {
    const midi = toMidi(value)
    return { value, midi, name: midiToName(midi) }
  }

  const slotMs = opts.durationMs / points.length
  const notes: Note[] = points.map((p, index) => {
    const midi = toMidi(p.y)
    return {
      index,
      value: p.y,
      midi,
      name: midiToName(midi),
      startMs: index * slotMs,
      durationMs: slotMs * (1 - opts.gapRatio),
    }
  })

  return {
    graphId: graph.id,
    durationMs: opts.durationMs,
    trough: anchor(troughValue),
    peak: anchor(peakValue),
    start: anchor(points[0].y),
    unitsPerWholeStep,
    notes,
  }
}

/**
 * The spoken/printed preamble a listener hears before the notes.
 * Keep this the single source of truth for wording so UI and TTS agree.
 */
export function describePreamble(s: Sonification, unit = ''): string {
  const fmt = (v: number) => `${Number(v.toFixed(2))}${unit}`
  const seconds = Number((s.durationMs / 1000).toFixed(1))
  return [
    `This graph plays for ${seconds} seconds.`,
    `The lowest value, ${fmt(s.trough.value)}, is ${s.trough.name}.`,
    `The highest value, ${fmt(s.peak.value)}, is ${s.peak.name}.`,
    `It starts at ${fmt(s.start.value)}, which is ${s.start.name}.`,
    `Each whole step is ${fmt(s.unitsPerWholeStep)}.`,
  ].join(' ')
}
