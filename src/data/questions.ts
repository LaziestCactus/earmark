/**
 * The 10 lesson questions. Each one references a graph by id; the listener
 * hears that graph's sonification, answers, then sees the graph revealed.
 * Owner: Person 3.
 *
 * TODO (Person 3): replace the questions marked PLACEHOLDER with the real
 * question bank. Aim for a mix of question types:
 *   - trend      ("Does it go up or down overall?")
 *   - extremum   ("Where is the peak?")
 *   - comparison ("Is the end higher than the start?")
 *   - shape      ("Which description matches what you heard?")
 */
import type { Question } from '../types.ts'

export const QUESTIONS: Question[] = [
  {
    id: 'q1',
    graphId: 'rising',
    prompt: 'What is the overall trend of this graph?',
    choices: ['Steadily rising', 'Steadily falling', 'Flat', 'Up then down'],
    correctIndex: 0,
    explanation: 'Every note is a whole step above the previous one, so the value rises steadily.',
  },
  {
    id: 'q2',
    graphId: 'spike',
    prompt: 'Which description best matches what you heard?',
    choices: [
      'Mostly flat with one sudden jump',
      'A smooth rise',
      'A smooth fall',
      'Up and down repeatedly',
    ],
    correctIndex: 0,
    explanation: 'The pitch stays near the trough, jumps to the peak for one note, then returns.',
  },
  // PLACEHOLDER — replace
  {
    id: 'q3',
    graphId: 'falling',
    prompt: 'What is the overall trend of this graph?',
    choices: ['Steadily rising', 'Steadily falling', 'Flat', 'Up then down'],
    correctIndex: 1,
  },
  // PLACEHOLDER — replace
  {
    id: 'q4',
    graphId: 'temperature',
    prompt: 'In which part of the year is the value highest?',
    choices: ['Start', 'Middle', 'End', 'It never changes'],
    correctIndex: 1,
  },
  // PLACEHOLDER — replace
  {
    id: 'q5',
    graphId: 'peak',
    prompt: 'Where is the peak?',
    choices: ['Near the start', 'Near the middle', 'Near the end'],
    correctIndex: 1,
  },
  // PLACEHOLDER — replace
  {
    id: 'q6',
    graphId: 'valley',
    prompt: 'Which description best matches what you heard?',
    choices: ['Dips then recovers', 'Rises then falls', 'Flat', 'Steadily rising'],
    correctIndex: 0,
  },
  // PLACEHOLDER — replace
  {
    id: 'q7',
    graphId: 'plateau',
    prompt: 'What happens in the second half of the graph?',
    choices: ['It keeps rising', 'It levels off', 'It falls', 'It spikes'],
    correctIndex: 1,
  },
  // PLACEHOLDER — replace
  {
    id: 'q8',
    graphId: 'step',
    prompt: 'How many distinct levels did you hear?',
    choices: ['One', 'Two', 'Three', 'Many'],
    correctIndex: 1,
  },
  // PLACEHOLDER — replace
  {
    id: 'q9',
    graphId: 'stock',
    prompt: 'Is the final value higher or lower than the starting value?',
    choices: ['Higher', 'Lower', 'The same'],
    correctIndex: 0,
  },
  // PLACEHOLDER — replace
  {
    id: 'q10',
    graphId: 'sine',
    prompt: 'Which description best matches what you heard?',
    choices: ['One full wave up and down', 'Steadily rising', 'A single spike', 'Flat'],
    correctIndex: 0,
  },
]
