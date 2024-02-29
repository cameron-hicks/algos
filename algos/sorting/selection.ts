import { swap } from './bubble';

const selectionSort = (arr: number[]): void => {
  for (let i = 0; i < arr.length - 1; i++) {
    let currentMax = i;
    
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[currentMax]) currentMax = j; 
    }

    swap(arr, i, currentMax);
  }
};

const array = [9, 4, 8, 6, 3, 1, 7, 2, 5]
selectionSort(array)
console.log(array);