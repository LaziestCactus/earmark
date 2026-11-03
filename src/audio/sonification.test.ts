import { describe, expect, it } from 'vitest'
import { describePreamble, midiToName, nameToMidi, niceStep, sonify, WHOLE_STEP } from './sonification.ts'
import { DEFAULT_OPTIONS } from '../types.ts'
import type { Graph } from '../types.ts'

const series = (ys: number[], id = 's'): Graph => ({
  id,
  title: id,
  xLabel: 'x',
  yLabel: 'y',
  points: ys.map((y, x) => ({ x, y })),
})

describe('note helpers', () => {
  it('round-trips names and midi', () => {
    expect(midiToName(60)).toBe('C4')
    expect(midiToName(69)).toBe('A4')
    expect(nameToMidi('C3')).toBe(48)
    expect(nameToMidi('F#4')).toBe(66)
    expect(nameToMidi(midiToName(84))).toBe(84)
  })
})

describe('niceStep', () => {
  it('rounds up to 1 / 2 / 2.5 / 5 × 10^k', () => {
    expect(niceStep(0.3)).toBe(0.5)
    expect(niceStep(1)).toBe(1)
    expect(niceStep(1.1)).toBe(2)
    expect(niceStep(2.2)).toBe(2.5)
    expect(niceStep(3)).toBe(5)
    expect(niceStep(7)).toBe(10)
    expect(niceStep(0)).toBe(1)
  })
})

describe('sonify', () => {
  const s = sonify(series([10, 20, 15, 40, 5]))

  it('produces one note per point, evenly spaced across the duration', () => {
    expect(s.notes).toHaveLength(5)
    expect(s.notes[0].startMs).toBe(0)
    expect(s.notes[4].startMs + s.notes[4].durationMs).toBeLessThanOrEqual(s.durationMs)
    const slot = s.durationMs / 5
    s.notes.forEach((n, i) => expect(n.startMs).toBeCloseTo(i * slot))
  })

  it('anchors the trough to the lowest allowed note', () => {
    expect(s.trough.value).toBe(5)
    expect(s.trough.midi).toBe(DEFAULT_OPTIONS.lowestMidi)
  })

  it('keeps every note inside the comfortable range and on the whole-step grid', () => {
    for (const n of s.notes) {
      expect(n.midi).toBeGreaterThanOrEqual(DEFAULT_OPTIONS.lowestMidi)
      expect(n.midi).toBeLessThanOrEqual(DEFAULT_OPTIONS.highestMidi)
      expect((n.midi - DEFAULT_OPTIONS.lowestMidi) % WHOLE_STEP).toBe(0)
    }
  })

  it('reports start/peak anchors consistently with the notes', () => {
    expect(s.start.midi).toBe(s.notes[0].midi)
    expect(s.peak.midi).toBe(Math.max(...s.notes.map((n) => n.midi)))
  })

  it('maps higher values to higher (or equal) pitches', () => {
    const mono = sonify(series([1, 2, 3, 4, 5, 6, 7, 8]))
    for (let i = 1; i < mono.notes.length; i++) {
      expect(mono.notes[i].midi).toBeGreaterThanOrEqual(mono.notes[i - 1].midi)
    }
  })

  it('handles a flat series', () => {
    const flat = sonify(series([3, 3, 3]))
    expect(new Set(flat.notes.map((n) => n.midi)).size).toBe(1)
    expect(flat.unitsPerWholeStep).toBe(1)
  })

  it('respects an explicit unitsPerWholeStep', () => {
    const fixed = sonify(series([0, 10, 20]), { unitsPerWholeStep: 10 })
    expect(fixed.notes.map((n) => n.midi)).toEqual([48, 50, 52])
  })

  it('rejects an empty series', () => {
    expect(() => sonify(series([]))).toThrow()
  })

  it('writes a preamble that mentions every anchor', () => {
    const text = describePreamble(s, '°')
    expect(text).toContain('6 seconds')
    expect(text).toContain(s.trough.name)
    expect(text).toContain(s.peak.name)
    expect(text).toContain(s.start.name)
  })
})
