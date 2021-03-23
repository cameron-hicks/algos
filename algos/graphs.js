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
  // iterative solution using a stack: last in, first out
  dfs(startVert, cb) {
    const stack = [startVert];
    const visited = {
      [startVert.value]: true,
    };

    let last;
    while (stack.length) {
      last = stack.pop();
      cb(last.value);

      last.edges.forEach((vertVal) => {
        if (!visited[vertVal]) {
          stack.push(this.vertices[vertVal]);
          visited[vertVal] = true;
        }
      });
    }
  }
  // recursive solution
  /*
  dfs(startVert, cb) {
    const visited = {};
    const vertices = this.vertices;

    (function traverse(vert) {
      if (!vert) return;
      if (visited[vert.value]) return;

      // emit at this vertex
      visited[vert.value] = true;
      cb(vert.value);

      vert.edges.forEach((vertexVal) => {
        traverse(vertices[vertexVal]);
      });
    })(startVert);

    return 'finished search';
  }
  */

  // visit each vertex's "siblings" before visiting its edges
  // iterative solution using a queue: first in, first out
  bfs(startVert, cb) {
    const queue = [startVert];
    const visited = {
      [startVert.value]: true,
    };

    let first;
    while (queue.length) {
      first = queue.shift();
      cb(first.value);

      first.edges.forEach((vertVal) => {
        if (!visited[vertVal]) {
          queue.push(this.vertices[vertVal]);
          visited[vertVal] = true;
        }
      });
    }
  }

  static numProvinces(matrix) {
    /*
  Given an undirected graph of cities represented as a connection matrix (a matrix of 0s and 1s), determine the number of provinces contained in that graph. A province is a group of cities that are connected to each other. If two cities have no path connecting them, they belong to separate provinces.

  STRATEGY: a variation on numIslands
  Use tree recursion to "walk" from one matrix element to the next. If there is a 1 up, down, left, or right of the current elem, walk in that direction. If you've hit an edge of the matrix or a connection you've already visited, return. When all subproblems have resolved, you've finished exploring an entire province. Increment province count and explore the next province.

  matrix.length = # of rows
  matrix[<any row>].length = # of cols

  EXAMPLES
  Three isolated cities, named A, B, and C, represent three provinces. In matrix form:
  [
       A  B  C
    A [1, 0, 0],
    B [0, 1, 0],
    C [0, 0, 1] 
  ]

  Three cities, named A, B, and C, represent two provinces because A and B are connected to each other. In matrix form:
  [
       A  B  C
    A [1, 1, 0],
    B [1, 1, 0],
    C [0, 0, 1] 
  ]

  GOTCHA: Here's how this graph problem is different from numIslands. Three cities, named A, B, and C, represent two provinces because A and C are connected to each other. In matrix form:
  [
       A  B  C
    A [1, 0, 1],
    B [0, 1, 0],
    C [1, 0, 1] 
  ]
  numIslands would treat this as 5 islands.
  In graph form:
  A   B
   \
    C
  As an adjacency list, adding another connection for clarity:
  {
    A: [C]
    B: []
    C: [A, D]
    D: [C]
  }
  or:
  given this connection matrix:
  [
       A  B  C  D
    A [1, 0, 1, 0],
    B [0, 1, 0, 0],
    C [1, 0, 1, 1] 
  ]
  convert to the adjacency list repped as a matrix-->
  [
  A  [A, C], 
  B  [B], 
  C  [A, C, D], 
  D  [C, D]
  ]
  Then merge any arrays that contain elements in common (union arrays): 
  [[A, C, D], [B]] 
  The answer is the # of subarrays, or the length of the overall matrix.

  Pseudocode for mapping connection matrix to adjacency list:
  Iterate over each subarray. If a 1 is found in a given spot, push that index (= col #) into the new subarray you're building to represent this one. 

  Pseudocode for reducing adjacency list down to intersection arrays:
  First, define a function binaryUnion which takes in a 2D array containing 2 subarrays and returns 1 subarray combining both inputs if they overlap, or returns the inputs unchanged if they do not contain any elements in common.
  Then, iterate over the adjacency list, invoking binaryUnion on every possible pair of subarrays.

  COMPLEXITY: time O(n * m), space O(n + m) (right?)

  another possible strategy: depth-first seach through the graph by mutating the matrix: after visiting a connection, flip relevant elems in matrix from 1 to 0 to prevent double-counting it
  */
    const mapCsToAs = (matrix) => {
      const numRows = matrix.length;
      const numCols = matrix[0].length;
      const adjacencies = [];

      for (let row = 0; row < numRows; row++) {
        adjacencies.push([]);
        for (let col = 0; col < numCols; col++) {
          if (matrix[row][col] === 1) {
            adjacencies[row].push(col);
          }
        }
      }

      return adjacencies;
    };

    // console.log(mapCsToAs(matrix));

    const merge = (twoArrays) => {
      const arr1 = twoArrays[0];
      const arr2 = twoArrays[1];
      const merged = arr1.concat(arr2.filter((elem) => !arr1.includes(elem)));
      return [merged];
    };

    // console.log(merge([[0, 1], [1, 2]]));

    const binaryUnion = (twoArrays) => {
      const arr1 = twoArrays[0];
      const arr2 = twoArrays[1];

      for (let i = 0; i < arr1.length; i++) {
        if (arr2.includes(arr1[i])) {
          twoArrays = merge(twoArrays);
        }
      }

      return twoArrays;
    };

    // TODO
    const provinces = matrix.reduce((accm, curr) => {}, matrix);
    // return provinces.length;
  }
}

// console.log(
//   Graph.numProvinces([
//     [1, 0, 0],
//     [0, 1, 0],
//     [0, 0, 1],
//   ]),
// ); //--> 3

// const g = new Graph();
// g.addVertex(0);
// g.addVertex(1);
// g.addVertex(2);
// g.addVertex(3);
// g.addEdge(0, 2);
// g.addEdge(0, 1);
// g.addEdge(1, 2);
// g.addEdge(1, 3);
// g.addVertex(4);
// g.addEdge(3, 4);
// g.addEdge(0, -1); // shouldn't add an edge for vertices that don't exist
// console.log(g.vertices);
// g.removeEdge(1, 0);
// console.log('Removed (1, 0) connection: \n', g.vertices);
// g.removeVertex(0);
// console.log('Removed vertex 0: \n', g.vertices);
// g.dfs(g.vertices[0], (value) => console.log(value)); // 0, 1, 3, 4, 2 or 0, 2, 1, 3, 4
// g.bfs(g.vertices[0], (value) => console.log(value)); // 0, 1, 2, 3, 4

/*
    0
  /  \
1 --- 2
|
3
|
4
*/

const g = new Graph();

g.addVertex('A');
g.addVertex('B');
g.addVertex('C');
g.addVertex('D');
g.addVertex('E');
g.addVertex('F');

g.addEdge('A', 'B');
g.addEdge('A', 'C');
g.addEdge('B', 'D');
g.addEdge('C', 'E');
g.addEdge('D', 'E');
g.addEdge('D', 'F');
g.addEdge('E', 'F');

//          A
//        /   \
//       B     C
//       |     |
//       D --- E
//        \   /
//          F

// g.dfs(g.vertices['A'], (value) => console.log(value)); // something like A, B, D, F, C, E or A, C, E, F, D, B. Either C or B should be near the end.
// g.bfs(g.vertices['A'], (value) => console.log(value)); // something like A, B, C, D, E, F. B and C should be near the beginning.

// DIRECTED GRAPH

// SCRATCH
// approaching numProvinces like numIslands
/*
static numProvinces(matrix) {
    let count = 0;
    const numRows = matrix.length;
    const numCols = matrix[0].length;
    const visited = {
      // row# : [<col#s visited>]
    };

    // recursive function; takes a pair of coords representing a starting point for each subproblem.
    function traverse(row, col) {
      console.log('Checking row, col:', row, col, 'visited:', visited);
      // base case: edges of the matrix
      if (row < 0 || row > numRows) return;
      if (col < 0 || col > numCols) return;
      // base case: this is not a connection
      if (matrix[row][col] !== 1) return;
      // base case: already visited this connection
      if (visited[row] && visited[row].includes(col)) return;

      console.log('Exploring from coords', row, col, '...');
      // mark this connection visited
      if (visited[row]) visited[row].push(col);
      else visited[row] = [col];

      // go up
      traverse(row - 1, col);
      // go down
      traverse(row + 1, col);
      // go left
      traverse(row, col - 1);
      // go right
      traverse(row, col + 1);

      // only increment the province count when you've finished visiting all the connections for a given starting point
      count++;
    }

    for (let i = 0, j = 0; i < numRows && j < numCols; i++, j++) {

    }

    return count;
  }
*/

/*
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
*/
