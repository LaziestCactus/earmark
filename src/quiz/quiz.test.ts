import { describe, expect, it } from 'vitest'
import { checkAnswer, orderQuestions, scoreAnswers, shuffle, validateQuestion } from './quiz.ts'
import { QUESTIONS } from '../data/questions.ts'
import { GRAPHS } from '../data/graphs.ts'
import type { Question } from '../types.ts'

const q: Question = { id: 'x', graphId: 'rising', prompt: '?', choices: ['a', 'b', 'c'], correctIndex: 1 }

describe('shuffle', () => {
  it('keeps every item exactly once', () => {
    const out = shuffle([1, 2, 3, 4, 5], () => 0.42)
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5])
  })
  it('does not mutate the input', () => {
    const input = [1, 2, 3]
    shuffle(input)
    expect(input).toEqual([1, 2, 3])
  })
})

describe('orderQuestions', () => {
  it('returns all questions', () => {
    expect(orderQuestions(QUESTIONS)).toHaveLength(QUESTIONS.length)
    expect(orderQuestions(QUESTIONS, false)).toEqual(QUESTIONS)
  })
})

describe('checkAnswer / scoreAnswers', () => {
  it('marks correct and incorrect answers', () => {
    expect(checkAnswer(q, 1).correct).toBe(true)
    expect(checkAnswer(q, 0).correct).toBe(false)
    expect(checkAnswer(q, null).correct).toBe(false)
  })
  it('totals the score', () => {
    const r = scoreAnswers([checkAnswer(q, 1), checkAnswer(q, 0), checkAnswer(q, 1)])
    expect(r.correct).toBe(2)
    expect(r.total).toBe(3)
  })
})

describe('question bank', () => {
  it('has 10 well-formed questions that reference existing graphs', () => {
    expect(QUESTIONS).toHaveLength(10)
    const ids = new Set(GRAPHS.map((g) => g.id))
    for (const question of QUESTIONS) {
      expect(() => validateQuestion(question)).not.toThrow()
      expect(ids.has(question.graphId)).toBe(true)
    }
    expect(new Set(QUESTIONS.map((x) => x.id)).size).toBe(10)
  })
  it('has 10 graphs', () => {
    expect(GRAPHS).toHaveLength(10)
  })
})
