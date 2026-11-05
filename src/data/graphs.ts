/**
 * Tutorial graphs are the simple onboarding set used in the lesson.
 * Test graphs are a harder second-stage bank for future scoring/assessment.
 * Owner: Person 1.
 */
import type { Graph, GraphDifficulty, GraphStage } from '../types.ts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function graph(
  id: string,
  title: string,
  ys: number[],
  labels: { xLabel: string; yLabel: string; unit?: string; xLabels?: string[] },
  stage: GraphStage = 'tutorial',
  difficulty: GraphDifficulty = 'easy',
): Graph {
  return {
    id,
    title,
    ...labels,
    stage,
    difficulty,
    points: ys.map((y, x) => ({ x, y })),
  }
}

export const TUTORIAL_GRAPHS: Graph[] = [
  graph('rising', 'Steady rise', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
  graph('falling', 'Steady fall', [10, 9, 8, 7, 6, 5, 4, 3, 2, 1], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
  graph(
    'temperature',
    'Average monthly high, Cleveland',
    [34, 37, 47, 59, 70, 79, 83, 81, 74, 62, 50, 39],
    { xLabel: 'Month', yLabel: 'Temperature', unit: '°F', xLabels: MONTHS },
  ),
  graph(
    'sine',
    'One sine wave',
    Array.from({ length: 16 }, (_, i) => Number(Math.sin((i / 15) * 2 * Math.PI).toFixed(2))),
    { xLabel: 't', yLabel: 'sin(t)' },
  ),
  graph('spike', 'Flat with a spike', [20, 21, 20, 20, 22, 60, 21, 20, 19, 20], {
    xLabel: 'Day',
    yLabel: 'Requests',
  }),
  graph(
    'stock',
    'Share price, 20 trading days',
    [102, 104, 101, 99, 97, 100, 106, 110, 108, 112, 115, 113, 109, 104, 98, 95, 99, 103, 107, 111],
    { xLabel: 'Day', yLabel: 'Price', unit: '$' },
  ),
  graph('valley', 'Dip then recover', [8, 6, 4, 2, 1, 2, 4, 6, 8, 9], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
  graph('plateau', 'Climb to a plateau', [1, 3, 5, 7, 8, 8, 8, 8, 8, 8], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
  graph('step', 'Step change', [5, 5, 5, 5, 5, 15, 15, 15, 15, 15], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
  graph('peak', 'Rise to a peak then fall', [1, 3, 6, 9, 10, 9, 6, 3, 1, 0], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
]

export const TEST_GRAPHS: Graph[] = [
  graph(
    'test-ambiguous-rise',
    'Ambiguous rise with a plateau',
    [42, 44, 46, 48, 49, 50, 52, 53, 52, 51, 54, 58],
    { xLabel: 'Sample', yLabel: 'Value', xLabels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'] },
    'test',
    'hard',
  ),
  graph(
    'test-double-oscillation',
    'Oscillation with a late surge',
    [66, 62, 58, 60, 65, 63, 57, 61, 69, 74, 72, 77],
    { xLabel: 'Week', yLabel: 'Value', xLabels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'] },
    'test',
    'hard',
  ),
  graph(
    'test-peak-trough',
    'Peak, trough, and recovery',
    [30, 34, 39, 45, 42, 38, 41, 47, 50, 46, 40, 43],
    { xLabel: 'Day', yLabel: 'Signal' },
    'test',
    'hard',
  ),
  graph(
    'test-saw-bias',
    'Sawtooth with downward bias',
    [80, 84, 79, 83, 88, 82, 86, 90, 85, 81, 78, 75],
    { xLabel: 'Sample', yLabel: 'Index' },
    'test',
    'hard',
  ),
  graph(
    'test-recovery-shock',
    'Shock, recovery, then flattening',
    [95, 88, 81, 76, 79, 86, 92, 96, 93, 90, 89, 90],
    { xLabel: 'Month', yLabel: 'Price', unit: '$', xLabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    'test',
    'hard',
  ),
  graph(
    'test-drift-then-jump',
    'Slow drift, then sharp jump',
    [35, 37, 36, 38, 39, 41, 43, 42, 46, 52, 51, 50],
    { xLabel: 'Hour', yLabel: 'Value', xLabels: ['1a', '2a', '3a', '4a', '5a', '6a', '7a', '8a', '9a', '10a', '11a', '12p'] },
    'test',
    'hard',
  ),
  graph(
    'test-multi-peak',
    'Multiple local peaks',
    [58, 60, 57, 62, 61, 66, 64, 59, 63, 70, 68, 64],
    { xLabel: 'Quarter', yLabel: 'Metric', xLabels: ['Q1', 'Q2', 'Q3', 'Q4', 'Q5', 'Q6', 'Q7', 'Q8', 'Q9', 'Q10', 'Q11', 'Q12'] },
    'test',
    'hard',
  ),
  graph(
    'test-flat-then-surge',
    'Flat then surging climb',
    [50, 51, 49, 50, 52, 51, 54, 59, 65, 70, 72, 76],
    { xLabel: 'Week', yLabel: 'Value', xLabels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8', 'W9', 'W10', 'W11', 'W12'] },
    'test',
    'hard',
  ),
  graph(
    'test-final-dip',
    'Mostly steady with a final dip',
    [70, 72, 71, 73, 74, 75, 72, 71, 70, 69, 68, 65],
    { xLabel: 'Sample', yLabel: 'Value' },
    'test',
    'hard',
  ),
  graph(
    'test-reverse-wave',
    'Wave with asymmetric troughs',
    [60, 64, 62, 58, 57, 61, 68, 65, 59, 55, 60, 67],
    { xLabel: 'Step', yLabel: 'Signal' },
    'test',
    'hard',
  ),
]

export const GRAPH_LIBRARY: Graph[] = [...TUTORIAL_GRAPHS, ...TEST_GRAPHS]
export const GRAPHS: Graph[] = TUTORIAL_GRAPHS

export function getGraph(id: string): Graph {
  const g = GRAPH_LIBRARY.find((x) => x.id === id)
  if (!g) throw new Error(`Unknown graph id: ${id}`)
  return g
}

/** Human-readable x tick label for a graph. */
export function xTickLabel(graph: Graph, x: number): string {
  return graph.xLabels?.[x] ?? String(x)
}
