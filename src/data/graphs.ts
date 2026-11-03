/**
 * The 10 hardcoded graphs used in the lesson.
 * Owner: Person 1.
 *
 * TODO (Person 1): replace the four graphs marked PLACEHOLDER with real ones.
 * Keep ids stable: data/questions.ts references them.
 */
import type { Graph } from '../types.ts'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function graph(
  id: string,
  title: string,
  ys: number[],
  labels: { xLabel: string; yLabel: string; unit?: string; xLabels?: string[] },
): Graph {
  return { id, title, ...labels, points: ys.map((y, x) => ({ x, y })) }
}

export const GRAPHS: Graph[] = [
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
  // PLACEHOLDER — replace
  graph('valley', 'Dip then recover', [8, 6, 4, 2, 1, 2, 4, 6, 8, 9], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
  // PLACEHOLDER — replace
  graph('plateau', 'Climb to a plateau', [1, 3, 5, 7, 8, 8, 8, 8, 8, 8], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
  // PLACEHOLDER — replace
  graph('step', 'Step change', [5, 5, 5, 5, 5, 15, 15, 15, 15, 15], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
  // PLACEHOLDER — replace
  graph('peak', 'Rise to a peak then fall', [1, 3, 6, 9, 10, 9, 6, 3, 1, 0], {
    xLabel: 'Step',
    yLabel: 'Value',
  }),
]

export function getGraph(id: string): Graph {
  const g = GRAPHS.find((x) => x.id === id)
  if (!g) throw new Error(`Unknown graph id: ${id}`)
  return g
}

/** Human-readable x tick label for a graph. */
export function xTickLabel(graph: Graph, x: number): string {
  return graph.xLabels?.[x] ?? String(x)
}
