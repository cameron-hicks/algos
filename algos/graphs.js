class Vertex {
  constructor(val) {
    this.value = val;
    this.edges = [];
  }
}

// UNDIRECTED GRAPH
// constructed using an adjacency list rather than a matrix
export class Graph {
  constructor() {
    this.vertices = {};
  }

  // for the sake of practice, using the vertices' values to identify them on the graph. In a real use case, we'd probably use a unique id so you can have multiple nodes with the same value.
  addVertex(val) {
    this.vertices[val] = new Vertex(val);
  }

  removeVertex(val) {
    if (!this.vertices[val]) return;
    // iterate over all vertices, removing this one from their edges
    for (const vert in this.vertices) {
      if (vert !== val) {
        this.removeEdge(vert, val);
      }
    }
    // delete this vertex
    delete this.vertices[val];
  }

  addEdge(val1, val2) {
    if (!this.vertices[val1] || !this.vertices[val2]) return;
    this.vertices[val1].edges.push(val2);
    this.vertices[val2].edges.push(val1);
  }

  removeEdge(val1, val2) {
    if (!this.vertices[val1] || !this.vertices[val2]) return;
    // reassign each vertex's edges array to a version of itself that excludes the other vertex
    this.vertices[val1].edges = this.vertices[val1].edges.filter(
      (vert) => vert !== val2,
    );
    this.vertices[val2].edges = this.vertices[val2].edges.filter(
      (vert) => vert !== val1,
    );
  }

  // vist all the vertices in each vertex's edges array (its "children") before visiting that vertex's "siblings"
  dfs(startVert) {
    const visited = {};
    const vertices = this.vertices;

    (function traverse(vert) {
      if (!vert) {
        return 'null vertex';
      }
      if (visited[vert.value]) {
        return 'aready visited this vertex';
      }

      visited[vert.value] = true;

      // emit at this vertex
      console.log('Emitting:', vert.value);
      vert.edges.forEach((vertexVal) => {
        traverse(vertices[vertexVal]);
      });
    })(startVert);

    return 'finished search';
  }

  // visit each vertex's "siblings" before visiting its edges
  // TODO: executing in same order as dfs, probably because of the graph I'm testing on
  bfs(startVert) {
    const visited = {};
    const vertices = this.vertices;

    (function traverse(vert) {
      if (!vert) {
        return 'null vertex';
      }
      if (visited[vert.value]) {
        return 'aready visited this vertex';
      }

      // emit at this and all adjacent vertices
      console.log('Emitting:', vert.value);
      visited[vert.value] = true;
      vert.edges.forEach((vertexVal) => {
        if (visited[vert.value]) {
          return 'aready visited this vertex';
        }
        console.log('Emitting:', vertexVal);
        visited[vertexVal.value] = true;
      });
      // traverse through all adjacent vertices
      vert.edges.forEach((vertexVal) => {
        traverse(vertices[vertexVal]);
      });
    })(startVert);

    return 'finished search';
  }
}

const g = new Graph();
g.addVertex(0);
g.addVertex(1);
g.addVertex(2);
g.addVertex(3);
g.addEdge(0, 1);
g.addEdge(0, 2);
g.addEdge(1, 2);
g.addEdge(1, 3);
g.addEdge(0, -1); // shouldn't ad an edge for vertices that don't exist
// console.log(g.vertices);
// g.removeEdge(1, 0);
// console.log('Removed (1, 0) connection: \n', g.vertices);
// g.removeVertex(0);
// console.log('Removed vertex 0: \n', g.vertices);
console.log(g.dfs(g.vertices[0]));
console.log(g.bfs(g.vertices[0]));

/*
    0
  /  \
1 --- 2
|
3


*/

// DIRECTED GRAPH
