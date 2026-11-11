/**
 * Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.

An island is surrounded by water and is formed by connecting adjacent lands horizontally or vertically. You may assume all four edges of the grid are all surrounded by water.

 

Example 1:

Input: grid = [
  ["1","1","1","1","0"],
  ["1","1","0","1","0"],
  ["1","1","0","0","0"],
  ["0","0","0","0","0"]
]
Output: 1
Example 2:

Input: grid = [
  ["1","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3

Input: grid = [
  ["0","1","0","0","0"],
  ["1","1","0","0","0"],
  ["0","0","1","0","0"],
  ["0","0","0","1","1"]
]
Output: 3
 * 

1. Scan through the entire grid
2. When we find a '1', we've found a new island - increment our island counter
3. Use DFS to explore and "sink" the entire island by turning all connected '1's into '0's
4. Continue scanning - any '1' we find now must belong to a different island
 */

const MOVES = [
  [0, 1],
  [0, -1],
  [1, 0],
  [-1, 0],
];

type Grid = string[][];
enum Coord {
  Water = '0',
  Land = '1',
}

const dfs = (grid: Grid, x: number, y: number) => {
  if (x < 0 || y < 0 || x >= grid.length || y >= grid[0].length) return;

  if (grid[x][y] === Coord.Water) return;

  grid[x][y] = Coord.Water;
  for (const m of MOVES) {
    dfs(grid, x + m[0], y + m[1]);
  }
};

function numIslands(grid: string[][]): number {
  let counter = 0;

  for (let x = 0; x < grid.length; x++) {
    for (let y = 0; y < grid[0].length; y++) {
      if (grid[x][y] === Coord.Land) {
        counter++;
        dfs(grid, x, y);
      }
    }
  }

  return counter;
}

export {};
