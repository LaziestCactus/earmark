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
  {
    id: 'q3',
    graphId: 'falling',
    prompt: 'What is the overall trend of this graph?',
    choices: ['Steadily rising', 'Steadily falling', 'Flat', 'Up then down'],
    correctIndex: 1,
  },
  {
    id: 'q4',
    graphId: 'temperature',
    prompt: 'In which part of the year is the value highest?',
    choices: ['Start', 'Middle', 'End', 'It never changes'],
    correctIndex: 1,
  },
  {
    id: 'q5',
    graphId: 'peak',
    prompt: 'Where is the peak?',
    choices: ['Near the start', 'Near the middle', 'Near the end'],
    correctIndex: 1,
  },
  {
    id: 'q6',
    graphId: 'valley',
    prompt: 'Which description best matches what you heard?',
    choices: ['Dips then recovers', 'Rises then falls', 'Flat', 'Steadily rising'],
    correctIndex: 0,
  },
  {
    id: 'q7',
    graphId: 'plateau',
    prompt: 'What happens in the second half of the graph?',
    choices: ['It keeps rising', 'It levels off', 'It falls', 'It spikes'],
    correctIndex: 1,
  },
  {
    id: 'q8',
    graphId: 'step',
    prompt: 'How many distinct levels did you hear?',
    choices: ['One', 'Two', 'Three', 'Many'],
    correctIndex: 1,
  },
  {
    id: 'q9',
    graphId: 'stock',
    prompt: 'Is the final value higher or lower than the starting value?',
    choices: ['Higher', 'Lower', 'The same'],
    correctIndex: 0,
  },
  {
    id: 'q10',
    graphId: 'sine',
    prompt: 'Which description best matches what you heard?',
    choices: ['One full wave up and down', 'Steadily rising', 'A single spike', 'Flat'],
    correctIndex: 0,
  },
]

export const TEST_QUESTIONS: Question[] = [
  {
    id: 't1',
    graphId: 'test-ambiguous-rise',
    prompt: 'Which description best matches this graph?',
    choices: ['A gradual rise with a brief plateau and late recovery', 'A steady drop', 'A flat line', 'Two sharp spikes'],
    correctIndex: 0,
    explanation: 'The graph trends upward overall, but the middle section flattens and then rises again.',
  },
  {
    id: 't2',
    graphId: 'test-double-oscillation',
    prompt: 'What is the main shape of the chart?',
    choices: ['A wave with a late surge', 'A constant line', 'A single sudden jump', 'Steady decline'],
    correctIndex: 0,
    explanation: 'The values oscillate across the middle of the sequence and then finish with a strong late rise.',
  },
  {
    id: 't3',
    graphId: 'test-peak-trough',
    prompt: 'What happens after the middle of the graph?',
    choices: ['It peaks, falls, and then recovers', 'It rises sharply', 'It keeps rising forever', 'It oscillates without recovery'],
    correctIndex: 0,
    explanation: 'The graph rises to a peak, dips dramatically, and then settles back upward.',
  },
  {
    id: 't4',
    graphId: 'test-saw-bias',
    prompt: 'Where is the strongest point in the sequence?',
    choices: ['It trends upward overall but with jagged steps', 'At the very start', 'At the very end', 'It never changes'],
    correctIndex: 0,
    explanation: 'The line repeatedly jumps upward and downward, but the overall pattern remains biased upward.',
  },
  {
    id: 't5',
    graphId: 'test-recovery-shock',
    prompt: 'Which statement best describes the graph?',
    choices: ['A sharp drop followed by recovery', 'It rises steadily', 'It is completely flat', 'It only drops at the end'],
    correctIndex: 0,
    explanation: 'There is a steep initial shock, then a rebound and eventual flattening near the end.',
  },
  {
    id: 't6',
    graphId: 'test-drift-then-jump',
    prompt: 'How would you summarize this pattern?',
    choices: ['Steady drift, then a sharp jump', 'Constant decline', 'One single peak', 'Alternating flat segments'],
    correctIndex: 0,
    explanation: 'The graph remains fairly steady for most of the sequence and then jumps upward near the end.',
  },
  {
    id: 't7',
    graphId: 'test-multi-peak',
    prompt: 'What is the best summary of this pattern?',
    choices: ['Several local peaks with an overall upward drift', 'A straight line', 'A single sharp increase', 'A smooth downward trend'],
    correctIndex: 0,
    explanation: 'There are several wave-like rises and dips, but the overall move is upward.',
  },
  {
    id: 't8',
    graphId: 'test-flat-then-surge',
    prompt: 'What is the overall direction of this chart?',
    choices: ['Flat early, then a strong upward surge', 'Mostly falling throughout', 'Flat all the way', 'Random and chaotic'],
    correctIndex: 0,
    explanation: 'The series stays relatively level before climbing sharply near the end.',
  },
  {
    id: 't9',
    graphId: 'test-final-dip',
    prompt: 'Which description fits this graph best?',
    choices: ['Mostly steady with a late dip', 'A single peak then flat line', 'A steady decline', 'A perfect sine wave'],
    correctIndex: 0,
    explanation: 'Most of the graph stays near a stable level, but it dips down near the finish.',
  },
  {
    id: 't10',
    graphId: 'test-reverse-wave',
    prompt: 'When does the graph most clearly change direction?',
    choices: ['Around the middle and late in the sequence', 'At the very beginning', 'At the very end', 'It never changes direction'],
    correctIndex: 0,
    explanation: 'The graph alternates between upward and downward movement, especially in the middle and late stages.',
  },
]
