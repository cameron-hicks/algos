/*
Given a sorted array of numbers and a target number, return the indices
of the two items in the array that sum up to the target. There is guaranteed
to be one answer. Do not use the same value twice.
*/

// O(n^2)
const twoSumBruteForce = (arr: number[], target: number): number[] => {
  for (let i = 0; i < arr.length - 1; i++) {

    // Main difference from unsorted array: You can stop iterating
    // if the sum exceeds the target.
    let j = i + 1;
    while (arr[i] + arr[j] <= target) {
      if (arr[i] != arr[j] && arr[i] + arr[j] == target) {
        return [i, j];
      }

      j++;
    }
  }

  return []; 
}

// O(n)
const twoSumTwoPointers = (arr: number[], target: number): number[] => {
  let i = 0;
  let j = arr.length - 1;

  while (i < j) {
    const sum = arr[i] + arr[j];

    if (sum == target && arr[i] != arr[j]) {
      return [i, j];
    } else if (sum > target) {
      j--;
    } else if (sum < target) {
      i++;
    }
  }

  return []
}

const arr = [1, 3, 4, 5, 7, 10, 11];
const target = 9;
// answer: [2, 3]

const bruteResult = twoSumBruteForce(arr, target);
console.log('Brute force: ', bruteResult, arr[bruteResult[0]] + arr[bruteResult[1]]);

const twoPointersResult = twoSumTwoPointers(arr, target);
console.log('With two pointers: ', twoPointersResult, arr[twoPointersResult[0]] + arr[twoPointersResult[1]]);

export {};