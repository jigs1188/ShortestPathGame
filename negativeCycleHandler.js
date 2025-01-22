// negativeCycleHandler.js
import { bellmanFord } from './Algorithms';

export const adjustNegativeCycles = (nodes, edges, startNode, setEdges, setOptimalPathWeight, dijkstra) => {
  const MAX_ITERATIONS = 100;
  let attempts = 0;

  while (attempts < MAX_ITERATIONS) {
    const { negativeCycleEdges } = bellmanFord(nodes, edges, startNode);

    if (negativeCycleEdges.length === 0) {
      const { weight } = dijkstra(nodes, edges, startNode, edges.endNode);
      setOptimalPathWeight(weight);
      return;
    }

    adjustWeightsToResolveCycle(negativeCycleEdges, edges, setEdges);
    attempts++;
  }

  throw new Error('Failed to resolve negative cycles after multiple attempts');
};

const adjustWeightsToResolveCycle = (negativeCycleEdges, edges, setEdges) => {
  const totalCycleWeight = negativeCycleEdges.reduce((sum, edge) => sum + edge.weight, 0);
  const requiredIncrement = Math.abs(totalCycleWeight) + 1;

  const newEdges = edges.map(edge => {
    if (negativeCycleEdges.some(cycleEdge => cycleEdge.from === edge.from && cycleEdge.to === edge.to)) {
      return { ...edge, weight: edge.weight + requiredIncrement };
    }
    return edge;
  });

  setEdges(newEdges);
};
