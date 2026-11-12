/**
 * Search a 2D Matrix
 * 
 * You are given an m x n integer matrix matrix with the following two properties:

Each row is sorted in non-decreasing order.
The first integer of each row is greater than the last integer of the previous row.
Given an integer target, return true if target is in matrix or false otherwise.

--> ie, the whole grid is sorted in ascending order, including wrapping around to the next row

You must write a solution in O(log(m * n)) time complexity.

Tip: Array.prototype.slice() creates a shallow copy of the array, making the time complexity O(n) per recursive call instead of O(log n). Use two pointers instead of copying subarrays.

 * 
 * Example 1:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 3
Output: true
 * 
 * Example 2:
Input: matrix = [[1,3,5,7],[10,11,16,20],[23,30,34,60]], target = 13
Output: false

target = 0.5
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
min = 0, max = 9
mid = 4
[0, 1, 2, 3, 4] --> min through mid
min = 0, max = 4
mid = 2
[0, 1, 2] --> min through mid
min = 0, max = 2
mid = 1
[0, 1]
min = 0, max = 1
mid = 0
[0] --> min through mid
only one item left and it's not the target -> return false
 */

function searchMatrix(matrix: number[][], target: number): boolean {
  const numRows = matrix.length;
  const numCols = matrix[0].length;

  // target is less than min element
  if (target < matrix[0][0]) return false;

  // target is greater than max element
  if (target > matrix[numRows - 1][numCols - 1]) return false;

  // first, narrow down which row the target would be in using the first and last elements in each row to find the right range.
  const binarySearchFindRow = (
    minRowIdx: number,
    maxRowIdx: number
  ): number[] => {
    if (minRowIdx > maxRowIdx) return [];
    if (minRowIdx === maxRowIdx) {
      const currRow = matrix[minRowIdx];
      if (currRow[0] <= target && target <= currRow[numCols - 1]) {
        return currRow;
      }

      return [];
    }

    // important!! The middle index is the left pointer PLUS the delta between the two pointers.
    const middleRowIdx = minRowIdx + Math.floor((maxRowIdx - minRowIdx) / 2);
    const middleRow = matrix[middleRowIdx];

    if (middleRow[0] <= target && target <= middleRow[numCols - 1]) {
      return middleRow;
    } else if (target < middleRow[0]) {
      return binarySearchFindRow(minRowIdx, middleRowIdx - 1);
    } else {
      return binarySearchFindRow(middleRowIdx + 1, maxRowIdx);
    }
  };

  const row = binarySearchFindRow(0, numRows - 1);

  const binarySearch = (minIdx: number, maxIdx: number): boolean => {
    if (minIdx > maxIdx) return false;
    if (minIdx === maxIdx && row[minIdx] !== target) return false;

    const mid = minIdx + Math.floor((maxIdx - minIdx) / 2);
    if (row[mid] === target) return true;

    if (target < row[mid]) {
      return binarySearch(minIdx, mid - 1);
    } else {
      return binarySearch(mid + 1, maxIdx);
    }
  };

  return binarySearch(0, row.length - 1);
}

console.log(
  searchMatrix(
    [
      [1, 3, 5, 7],
      [10, 11, 16, 20],
      [23, 30, 34, 60],
    ],
    13
  )
);

/*
const middleCellCoords = (
  width: number,
  height: number
): {
  x: number;
  y: number;
} => {
  return { x: Math.floor(width / 2), y: Math.floor(height / 2) };
};

const midPoint = (
  minX: number,
  maxX: number,
  minY: number,
  maxY: number
): {
  x: number;
  y: number;
} => ({ x: Math.floor((maxX - minX) / 2), y: Math.floor((maxY - minY) / 2) });


function searchMatrix(matrix: number[][], target: number): boolean {
  const height = matrix.length; // x values; num of rows
  const width = matrix[0].length; // y values; num of columns
  const greatestX = matrix.length - 1;
  const greatestY = matrix[0].length - 1;

  // target is less than min element
  if (target < matrix[0][0]) return false;

  // target is greater than min element
  if (target > matrix[height - 1][width - 1]) return false;

  const validCoords = (x: number, y: number): boolean => {
    return x >= 0 && x <= greatestX && y >= 0 && y <= greatestY;
  };

  const numCellsToRightOfCell = (x: number, y: number): number => {
    const numLeftInRow = greatestY - y;
    const numInRowsFurtherDown = (greatestX - x) * width;
    return numLeftInRow + numInRowsFurtherDown;
  };

  let { x, y } = midPoint(0, greatestX, 0, greatestY);
  while (validCoords(x, y)) {
    console.log(x, y, 'cell: ', matrix[x][y]);
    const curr: number = matrix[x][y];

    if (curr === target) {
      return true;
    } else if (curr < target) {
      // check the right half
      console.log('going right');
      const { x: deltaX, y: deltaY } = midPoint(x, greatestX, y, greatestY);
      x = x + deltaX;
      y = y + deltaY;
    } else {
      // check the left half
      console.log('going left');
      const { x: deltaX, y: deltaY } = midPoint(0, x, 0, y);
      x = x - deltaX;
      y = y - deltaY;
    }
  }

  return false;
}
*/

/*

minx = 0, minY = 0
maxX = 2, maxY = 3
midpoint: 
x = (2 - 0)/2 = 1
y = (3 - 0)/2 = 1
curr cell = [11]

13 > 11 --> check right
minx = 1, minY = 1
maxX = 2, maxY = 3
midpoint: 
deltax = (2 - 1)/2 = 0
deltay = (3 - 1)/2 = 1
curr cell = [1 + 0, 1 + 1] => [1, 2] => [16]





*/
