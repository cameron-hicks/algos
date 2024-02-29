import { swap } from './bubble';

const insertionSort = (arr: number[]): void => {
  for(let i = 1; i < arr.length; i++) {
    // iterate backwards from i to 0, or until you find this element's proper place in the sort
    for (let j = i; j > 0 && arr[j] < arr[j - 1]; j--) {
      swap(arr, j, j - 1);
    }
  }
}

const array = [9, 4, 8, 6, 3, 1, 7, 2, 5]
insertionSort(array)
console.log(array);