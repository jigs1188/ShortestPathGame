export const dijkstra = (nodes, edges, startNode, endNode) => {
  const distances = {};
  const previousNodes = {};
  const unvisitedNodes = nodes.slice();

  nodes.forEach(node => {
    distances[node.id] = Infinity;
  });

  distances[startNode] = 0;
  previousNodes[startNode] = null;

  while (unvisitedNodes.length > 0) {
    const currentNode = unvisitedNodes.reduce((minNode, node) => {
      return distances[node.id] < distances[minNode.id] ? node : minNode;
    }, unvisitedNodes[0]);

    unvisitedNodes.splice(unvisitedNodes.indexOf(currentNode), 1);

    if (currentNode.id === endNode) break;

    edges.forEach(edge => {
      if (edge.from === currentNode.id) {
        const neighborNode = nodes.find(node => node.id === edge.to);
        const distance = distances[currentNode.id] + edge.weight;

        if (distance < distances[neighborNode.id]) {
          distances[neighborNode.id] = distance;
          previousNodes[neighborNode.id] = currentNode.id;
        }
      }
    });
  }

  const shortestPath = [];
  let currentNode = endNode;

  while (currentNode) {
    shortestPath.unshift(currentNode);
    currentNode = previousNodes[currentNode];
  }

  return { shortestPath, weight: distances[endNode] };
};

export const bellmanFord = (nodes, edges, startNode, endNode) => {
  const distances = {};
  const predecessors = {};

  nodes.forEach(node => {
    distances[node.id] = Infinity;
    predecessors[node.id] = null;
  });

  distances[startNode] = 0;

  // Relax edges |V| - 1 times
  for (let i = 0; i < nodes.length - 1; i++) {
    edges.forEach(edge => {
      if (distances[edge.from] + edge.weight < distances[edge.to]) {
        distances[edge.to] = distances[edge.from] + edge.weight;
        predecessors[edge.to] = edge.from;
      }
    });
  }

  // Detect negative cycles
  const negativeCycle = [];
  edges.forEach(edge => {
    if (distances[edge.from] + edge.weight < distances[edge.to]) {
      let cycleStart = edge.to;
      for (let i = 0; i < nodes.length; i++) {
        cycleStart = predecessors[cycleStart];
      }

      // Collect edges in the negative cycle
      let currentNode = cycleStart;
      do {
        negativeCycle.push(
          edges.find(e => e.from === predecessors[currentNode] && e.to === currentNode)
        );
        currentNode = predecessors[currentNode];
      } while (currentNode !== cycleStart);

      return;
    }
  });

  if (negativeCycle.length > 0) {
    // Adjust edges to fix the negative cycle
    const adjustedEdges = adjustNegativeCycle(edges, negativeCycle);

    return { 
      shortestPath: [], 
      weight: Infinity, 
      negativeCycleEdges: negativeCycle, 
      adjustedEdges 
    };
  }

  // Reconstruct the optimal path
  const shortestPath = [];
  let currentNode = endNode;

  while (currentNode) {
    shortestPath.unshift(currentNode);
    currentNode = predecessors[currentNode];
  }

  return { shortestPath, weight: distances[endNode], negativeCycleEdges: [], adjustedEdges: edges };
};

// Adjusts the weights in a negative cycle
const adjustNegativeCycle = (edges, negativeCycleEdges) => {
  const cycleWeight = negativeCycleEdges.reduce((sum, edge) => sum + edge.weight, 0);
  const adjustment = Math.abs(cycleWeight) + 1;

  const adjustedEdges = edges.map(edge => {
    if (negativeCycleEdges.includes(edge)) {
      return { ...edge, weight: edge.weight + adjustment };
    }
    return edge;
  });

  return adjustedEdges;
};

// When to use Dijkstra or Bellman-Ford
export const calculateOptimalPath = (nodes, edges, startNode, endNode) => {
  const hasNegativeWeights = edges.some(edge => edge.weight < 0);

  if (hasNegativeWeights) {
    console.log("Using Bellman-Ford as graph contains negative weights.");
    return bellmanFord(nodes, edges, startNode, endNode);
  } else {
    console.log("Using Dijkstra as graph has only positive weights.");
    return dijkstra(nodes, edges, startNode, endNode);
  }
};
