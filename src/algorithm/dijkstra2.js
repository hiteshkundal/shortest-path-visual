/* eslint-disable no-restricted-syntax */
/* eslint-disable max-classes-per-file */
import buildGrid from '../container/Pathfinder/util/util';

class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor(grid) {
    this.adjacencyList = {};
    this.grid = grid;
  }

  addVertex() {
    for (const row of this.grid) {
      for (const col of row) {

      }
    }
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let smallest;
    const visited = {};
    const path = [];

    // build up initial state

    // eslint-disable-next-line no-restricted-syntax
    // eslint-disable-next-line guard-for-in
    for (const vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }

      previous[vertex] = null;
    }

    // build up the logic as long as there is node in priority queue

    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      visited[smallest] = true;
      if (smallest === finish) {
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }

      if (smallest || distances[smallest] !== Infinity) {
        for (const neighbor of this.adjacencyList[smallest]) {
          if (!visited[neighbor.node]) {
            const candidate = distances[smallest] + neighbor.weight;
            if (candidate < distances[neighbor.node]) {
              distances[neighbor.node] = candidate;
              previous[neighbor.node] = smallest;
              nodes.enqueue(neighbor.node, candidate);
            }
          }
          // smallest = A
          // this.adjacencyList[smallest] = [{node : B, weight : 4}, {node : C, weight : 2}]
          // neighbor = {node : B, weight : 4}
        }
      }
    }
    return path.concat(smallest).reverse();
  }
}


const graph = new WeightedGraph(buildGrid());

graph.addVertex('A');


graph.addEdge('A', 'B', 4);
graph.addEdge('A', 'C', 2);
graph.addEdge('B', 'E', 3);
graph.addEdge('C', 'D', 2);
graph.addEdge('C', 'F', 4);
graph.addEdge('D', 'E', 3);
graph.addEdge('D', 'F', 1);
graph.addEdge('E', 'F', 1);
