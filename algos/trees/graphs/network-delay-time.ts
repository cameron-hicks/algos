/*
Given a directed graph with weighted edges representing a server system and the time it takes for a signal to travel from one server to the next (the source server's latency), and a particular source server, return the shortest time it could take for the signal to reach all of the servers. If not all servers can be reached by the signal — for example, if there is a server that is not at the receiving end of any edges — return -1.

a --1--> b --1--> c 
  \             /
    4         1 
     \      /
        d

(Nodes A and C both point to D.)

Strategy

A shortest path algorithm (Djikstra's algorithm), which is essentially breadth-first search but with a min heap (aka priority queue) instead of just a regular queue. When you visit a node, you add both the node's name and its cumulative path weight to the heap. If there are multiple edges pointing to a node, you'd end up adding the node to the heap multiple times. While deciding which item to pop off the heap, you choose the one with the least cumulative weight. You also don't pop a given node name off the heap more than once. This means that if there are multiple ways to reach a node, you'll choose the least-weighted.
*/

import { MinHeap } from "../min-heap";

class Edge {
  latency: number = 0;
  receiver: Server | null;

  constructor(latency, receiver) {
    this.receiver = receiver;
    this.latency = receiver ? latency : 0;
  }
}

class Server {
  name: string;
  receiver: Server | null;
  edges: Edge[] = [];

  constructor(name: Server['name']) {
    this.name = name;
  }
}

// TODO: try with other shapes of graphs, for example one with a node that sits off by itself disconnected from the others (should return -1) and one with at least one node that points to null
// TODO: my MinHeap's add() implementation is flawed... it chose the higher-weighted edge to get to D.
// I could try an array with insertion sort instead, using a callback arg to compare the items.
const networkDelayTime = (source: Server, numServers: number = 1) => {
  let totalLatency = 0;
  const visited = new Set();  
  const frontier = new MinHeap<Edge>(); 

  // the latency to get from nowhere to the start of the graph is 0
  frontier.add(new Edge(0, source));

  while (!frontier.empty()) {
    // you know you're done when you've visited every node once
    if (visited.size == numServers) break;

    const currEdge = frontier.remove(); 
    console.log('after removing:', frontier.heap.map(edge => edge.receiver.name))

    totalLatency += currEdge.latency; 
    currEdge.receiver.edges.forEach(edge => frontier.add(edge));
    visited.add(currEdge.receiver.name);
  }

  return visited.size == numServers ? totalLatency : -1;
}

const a = new Server('a');
const b = new Server('b');
const c = new Server('c');
const d = new Server('d');

a.edges.push(new Edge(1, b), new Edge(4, d));
b.edges.push(new Edge(1, c));
c.edges.push(new Edge(1, d));

console.log(networkDelayTime(a, 4));
// --> 3

export {};