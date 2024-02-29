/*
Use merge sort to sort the array in place. Return void.
*/

// O(n + m)
// constant space
const merge = (arr: number[], result: number[] = [], startInd: number, endInd: number): void => {
  const middle = Math.floor((endInd + startInd)/2);
  let resultInd = startInd;
  let leftPointer = startInd;
  let rightPointer = middle + 1;

  while (leftPointer <= middle && rightPointer <= endInd) {
    if (arr[leftPointer] < arr[rightPointer]) {
      result[resultInd] = arr[leftPointer];
      leftPointer++;
    } else {
      result[resultInd] = arr[rightPointer];
      rightPointer++;
    }
    resultInd++;
  }

  while (leftPointer <= middle) {
    result[resultInd] = arr[leftPointer];
    leftPointer++;
    resultInd++;
  }

  while (rightPointer <= endInd) {
    result[resultInd] = arr[rightPointer];
    rightPointer++;
    resultInd++;
  }

  for(let i = startInd; i <= endInd; i++) {
    arr[i] = result[i];
  }
};

// the startInd and endInd params are a way to do subarrays without storing them in memory
const mergeSort = (arr: number[], result: number[] = [], startInd: number = 0, endInd: number = arr.length - 1): void => {
  // this is a way of saying the subarray is of length 0
  if (startInd >= endInd) return;

  const middle = Math.floor((endInd + startInd)/2);
  // sort the left and right halves of the subarray
  mergeSort(arr, result, startInd, middle);
  mergeSort(arr, result, middle + 1, endInd);

  // sort the overall subarray
  merge(arr, result, startInd, endInd);
}

const array = [9, 4, 6, 3, 1, 7, 2, 5]
mergeSort(array)
console.log(array);

export {};