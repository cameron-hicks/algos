/*
Given an unsorted array of numbers and a target number, return the indices
of the two items in the array that sum up to the target. There is guaranteed
to be one answer. Do not use the same value twice.
*/

// O(n^2)
const twoSumBruteForce = (arr: number[], target: number): number[] => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] != arr[j] && arr[i] + arr[j] == target) {
        return [i, j];
      }
    }
  }

  return []; 
}

// O(n)
const twoSumHash = (arr: number[], target: number): number[] => {
  const visited: Record<number, number> = {};
  
  for(let i = 0; i < arr.length; i++) {
    const searchValue = target - arr[i];
    
    if (visited[searchValue]) {
      return [i, visited[searchValue]];
    }

    visited[arr[i]] = i;
  }

  return []; 
}

const arr = [3, 1, 5, 7, 4, 10, 11]
const target = 9;
// answer: [2, 4]

const bruteResult = twoSumBruteForce(arr, target);
console.log('Brute force: ', bruteResult, arr[bruteResult[0]] + arr[bruteResult[1]]);

const hashResult = twoSumHash(arr, target);
console.log('With a hash: ', hashResult, arr[hashResult[0]] + arr[hashResult[1]]);

export {};