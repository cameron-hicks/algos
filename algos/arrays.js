// O(n) Set.insert(value) method
const addToSet = (set, item) => {
  let i = 0;
  while (i < set.length && item > set[i]) {
    i++;
  }
  // don't add duplicate items
  if (set[i] === item) return set;
  // shift everything greater than item 1 index to the right and insert item at i
  for (let j = set.length; j > i; j--) {
    set[j] = set[j - 1];
  }
  set[i] = item;
  return set;
};

const arrays = {
  // Given an array of integers, return the indices of the (only) two numbers that add up to the target. Assume there are no duplicates and each number can only be used once. Do it in less than O(n2) time.
  /*
  Ideas for optimization:
  - stop iterating as soon as you find a pair
  - "hash" the values of the array to facilitate O(1) lookup when comparing one element to others in the array.
  */
  twoSum: (arr, target) => {
    const map = {};
    arr.forEach((elem, index) => {
      map[elem] = index;
    });

    let diff;
    for (let i = 0; i < arr.length; i++) {
      diff = target - arr[i];
      if (map[diff] !== undefined && map[diff] !== i) {
        return [i, map[diff]];
      }
    }
  },
  // Given an array of integers, find all unique triplets in the array which add up to the target.
  threeSum: (arr, target) => {},
  // Given an array where the number at each index i is the price of a stock on date i, and assuming you may buy once and sell once, return the max profit you can make. Note: you can't sell the stock before you buy it, and selling price needs to be larger than buying price. If there are no dates where sale price > purchase price, return 0, as no transaction can be made.
  // or, return an array containing: a purchase date, a sell date, and the maximum profit you can make using those dates.
  /* STRATEGY: sliding window
  Iterate over the array. If the value at day i is less than the current buy price, shift the left edge of the window to i. If i is greater than the index of the right edge of the window, shift the right edge to i + 1. If the value at i is greater than the current sale price, shift the right edge of the window to i.
  COMPLEXITY: O(n) time, O(1) space
  */
  stock: (arr) => {
    if (arr.length < 2) return 0;
    let buyDate = 0;
    let sellDate = 1;
    let maxProfit = arr[sellDate] - arr[buyDate];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < arr[buyDate]) {
        // if updating buyDate would invalidate the window, compare the max profit of this window to the max profit thus far before resetting the window.
        if (i >= sellDate) {
          maxProfit = Math.max(maxProfit, arr[sellDate] - arr[buyDate]);
          sellDate = i + 1;
        }
        buyDate = i;
      } else if (arr[i] > arr[sellDate]) {
        sellDate = i;
      }
    }
    // gotcha: compare local profit of last-derived window to maxProfit
    maxProfit = Math.max(maxProfit, arr[sellDate] - arr[buyDate]);
    return maxProfit > 0 ? maxProfit : 0;
  },
  mergeIntervals: (arr) => {
    // Given a 2D collection of intervals, merge all overlapping intervals.
  },
  // Given an m x n matrix, return all elements of the matrix in spiral order.
  /*
  Example:
  input: [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
  output: [1,2,3,4,8,12,11,10,9,5,6,7]
  illustration:
    1 -> 2 ->  3 ->  4
                     |
    5 -> 6 ->  7     8
    |                |
    9 <- 10 <- 11 <- 12

  Example:
  input: [[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]]
  output: [1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]
  illustration
  1 -> 2 -> 3 ->    4
                    |
  5 -> 6  ->  7     8
  |           |     |
  9    10 <- 11    12
  |                 |
  13 <- 14 <- 15 <- 16
  
  Pseudocode:
  m = # of rows, n = # of cols

  Each subproblem involves two steps: traversing horizontally then vertically.
  First:
    At row = 0, iterate from col = 0 to col = n - 1.
    Visit all rows from row = 0 to row = m - 1 at col = n - 1.
  Then:
    At row = m - 1, iterate from col = n - 2 to col = 1.
    Visit all rows from row = m - 1 to row = 1 at col = 0.
  Then: 
    At row = 1, iterate from col = 1 to col = n - 3.
    Visit all rows from row = 1 to row = m - 2 at col = n - 2.

  Repeat until all rows have been used for the first step and all cols have been used for the second step. We can check for this base case by incrementing two pointers for each direction, ie, two row pointers and two column pointers, and stopping when these pointers equal each other.

  Complexity: time O(m + n) space O(m * n) 
  Note: Just because there are nested loops doesn't mean time complexity will be O(n2). Think about the number of operations done ON EACH ITEM or PER ITEM. Each item is visited only once because the bounds of the for-loops change over time.
  */
  spiralMatrix: (matrix) => {
    const output = [];
    let tRow = 0;
    let bRow = matrix.length - 1;
    let lCol = 0;
    let rCol = matrix[0].length - 1;

    while (tRow <= bRow && lCol <= rCol) {
      // traverse topmost row of this layer from left to right
      for (let col = lCol; col <= rCol; col++) {
        output.push(matrix[tRow][col]);
      }

      // traverse right edge of this layer from top to bottom
      for (let row = tRow + 1; row <= bRow; row++) {
        output.push(matrix[row][rCol]);
      }

      // this check prevents duplicate output on odd numbers of rows or cols
      // will proceed only if # rows or cols is even
      if (tRow < bRow && lCol < rCol) {
        // traverse bottommost row of this layer right right to left
        for (let col = rCol - 1; col > lCol; col--) {
          output.push(matrix[bRow][col]);
        }

        // traverse left edge of this layer from bottom to top
        for (let row = bRow; row > tRow; row--) {
          output.push(matrix[row][lCol]);
        }
      }

      tRow++;
      bRow--;
      lCol++;
      rCol--;
    }

    return output;
  },
  setMatrixTo0: (matrix) => {
    //Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do this in-place.
  },
  /* 
  
  Given an array of coin denominations, return the smallest number of coins needed to sum up to the target amount. If that amount of money cannot be made up by any combination of the coins, return -1.

  Example 1:
    Input: coins = [1, 2, 5], amount = 11 
    Output: 3 
    Explanation: 11 = 5 + 5 + 1

  Example 2: 
    Input: coins = [2], amount = 3
    Output: -1

  STRATEGY: 
    combinations (tree recursion), where the answer is the height of the shortest path/subtree. Add a parameter to track the height thus far. Store the heights of the subproblems at the top-level problem. Return the smallest height.

  OPTIMIZATIONS:
    - After making all possible combinations and pushing the # of selections into a results array, you'll have as many elements in the array as you have possible combinations. However, a lot of those elements will be duplicates, expanding space complexity with redundant information. Using a Set reduces the space complexity.
    - To return the smallest # of selections out of your results collection, you might consider sorting the collection and returning the 0th item. However, the native sort() method runs in O(n2). Instead, you might try manually iterating over the Set to find the min item (O(n)), or implementing the logic of an insertion sort every time you add to the set so that it is built in a sorted manner. 
    - Use a dynamic programming approach to avoid duplicating work. Memoize the results of subproblems so that once the answer for a particular amount has been found, it doesn't need to be calculated again.
  */
  coinSum: (coins, amount) => {
    const memo = {
      0: 0,
    };

    for (let amountLeft = 1; amountLeft <= amount; amountLeft++) {
      memo[amountLeft] = Infinity;

      for (let i = 0; i < coins.length; i++) {
        if (coins[i] <= amountLeft) {
          // derive the minimum solution to each subproblem by comparing the cached solutions from each subsequent subproblem (adding 1 b/c this problem adds 1 additional coin to the # of coins used by the subproblem)
          // eslint-disable-next-line prettier/prettier
          memo[amountLeft] = Math.min(memo[amountLeft], memo[amountLeft - coins[i]] + 1);
        }
      }
    }

    return memo[amount] !== Infinity ? memo[amount] : -1;
  },
};

// STOCK
const stock1 = [7, 1, 5, 3, 6, 4];
// console.log(arrays.stock(stock1)); // --> 5
const stock2 = [7, 6, 4, 3, 1];
// console.log(arrays.stock(stock2)); // --> 0
const stock3 = [100];
// console.log(arrays.stock(stock3)); // --> 0

// console.log(
//   arrays.spiralMatrix([
//     [1, 2, 3],
//     [4, 5, 6],
//     [7, 8, 9],
//   ]),
// ); //--> [1,2,3,6,9,8,7,4,5]

module.exports = arrays;

// scratch

// spiralMatrix
/*
spiralMatrix: (matrix) => {
    const output = [];
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // 0th row
    for (let i = 0; i <= numCols - 1; i++) {
      output.push(matrix[0][i]);
    }
    // console.log('After first row:', output);

    // traverse right edge
    for (let i = 1; i < numRows; i++) {
      output.push(matrix[i][numCols - 1]);
    }

    // traverse each remaining row from bottom-up
    for (let i = 1; numRows - i > 0; i++) {
      // traverse right to left
      if (i % 2 !== 0) {
        // exclude elems on the right edge of the matrix
        for (let j = numCols - 2; j >= 0; j--) {
          output.push(matrix[numRows - i][j]);
        }
      }
      // traverse left to right
      else {
        for (let j = 0; j <= numCols - 2; j++) {
          output.push(matrix[numRows - i][j]);
        }
      }
    }

    return output;
  },
*/

/*
coinSum: (coins, amount) => {
    return (function coinSumMemo(amount) {
      // O(n) Set.insert(value) method
      const addToSet = (set, item) => {
        let i = 0;
        while (i < set.length && item > set[i]) {
          i++;
        }
        // don't add duplicate items
        if (set[i] === item) return set;
        // shift everything greater than item 1 index to the right and insert item at i
        for (let j = set.length; j > i; j--) {
          set[j] = set[j - 1];
        }
        set[i] = item;
        return set;
      };

      const numOfCoins = []; // a set
      const select = (amountLeft, numSelected) => {
        if (amountLeft === 0) {
          addToSet(numOfCoins, numSelected);
          return;
        }
        if (amountLeft < 0) return undefined;

        coins.forEach((coin) => {
          select(amountLeft - coin, numSelected + 1);
        });
      };

      select(amount, 0);
      if (!numOfCoins.length) return -1;
      else return numOfCoins[0];
    })(amount);
  },
*/
