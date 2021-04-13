// typical cases
const unsorted = [5, 1, 4, 3, 2];
const nearlySorted = [1, 2, 3, 5, 4];
const reverseSorted = [5, 4, 3, 2, 1];
const sorted = [1, 2, 3, 4, 5];

// edge cases
const empty = [];
const single = [1];
const dups = [5, 5, 1, 4, 3, 3, 2];
const dupsSorted = [1, 2, 3, 3, 4, 5, 5];

/*
Strategy:
Bubble the largest item of a progressively smaller subarray over to the right, cementing items in place from right to left.

Psuedocode:
iterate over array, incrementing i from 0 to length - 1
  iterate over array, incrementing j from 0 to length - 1
    if item at j is greater than item at j+1, swap them

Optimizations:
- iterate j only to j < array.length - 1 to avoid comparing last elem in array (j[array.length - 1]) to undefined (j[array.length - 1 + 1])
- progressively decrease the number of iterations of j as the array is progressively more sorted
  - once largest numbers are bubbled to the back, they'll stay fixed there, so no need to keep comparing them to each other
  - do this by iterating j to array.length - i, where i starts at 1
- stop iterating early as soon as array is fully sorted
  - you know it's fully sorted if no swaps are made at a given i

Complexity:
- time: worst n2, best n
- space: 1

Gotchas:
- two for loops: compare j to j+1, not i to j. i doesn't represent an index in the array but the max number of times you'll have to repeat the process to sort the array

 */
// two for loops
/*
const bubbleSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let swapsMade = false;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j+1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
        swapsMade = true;
      }
    }

    if (!swapsMade) break;
  }

  return arr;
};
*/

// a while loop
const bubbleSort = (arr) => {
  // boolean flag to stop iterating once array is sorted
  let swapsMade;
  // max # of times the bubbling process will have to be repeated
  let i = 0;

  do {
    i++;
    swapsMade = false;

    for (let j = 0; j < arr.length - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapsMade = true;
      }
    }
  } while (swapsMade);

  return arr;
};

// console.log(bubbleSort(nearlySorted)) // --> n operations
// console.log(bubbleSort(unsorted)) // --> n2 operations

/*
Strategy:
The reverse of bubbleSort. Select the minimum value of a progressively smaller subarray, cementing items from left to right.

Psuedocode:
iterate over indices from i to end
  find min elem
  swap min elem to position i

Optimizations:
- can eliminate 1 operation per iteration by swapping the min element to position i only if it is not already in position i

Complexity:
- time: n2 in all cases
- space: 1
 */
const selectionSort = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    let min = i;

    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }

    if (min !== i) {
      [arr[i], arr[min]] = [arr[min], arr[i]];
    }
  }

  return arr;
};

// console.log(selectionSort(dups));

/*
Strategy:
Working from left to right, select each elem and insert it in the right place within a progressively longer sorted subarray. The way you make room for the selected element to be inserted is by shifting elements rightwards.

Psuedocode:
iterate i from 1 to length
  iterate j from 0 to i
    if elem at position i is less than elem at position j, shift elems to make room to insert elem at j

Optimizations:
- break out of inner loop once the correct insertion spot is found

Gotchas: 
- inserting the current elem into its spot in the sorted subarray:
  - easier if you iterate j from i down to the correct position where array[i] needs to go, shifting EACH elem one to the right to make room for array[i]. You can do this by copying arr[j] to arr[j+1]. Make these shifts WHILE you search for the selected elem's sorted postion, not after you've found it. 
  - store that elem in a temp variable rather than trying to access it at arr[i] because arr[i] will change as you copy elems into that spot during the inner, j loop

Complexity:
- time: n2 in all cases
- space: 1
 */
const insertionSort = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const insert = arr[i];
    let j = i - 1;

    while (j >= 0 && insert < arr[j]) {
      arr[j + 1] = arr[j];
      j--;
    }

    arr[j + 1] = insert;
  }

  return arr;
};

// console.log(insertionSort(unsorted));
// console.log(insertionSort(nearlySorted));
// console.log(insertionSort(dups));

/*
Strategy:
Recursively divide the array into smaller and smaller subarrays until you reach an array of length 1 or less. Then, start combining subarrays in order.

Psuedocode:

Optimizations:

Complexity:
- time:
- space: 
 */

const mergeSort = (arr) => {
  if (arr.length <= 1) return arr;

  const midInd = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, midInd));
  const right = mergeSort(arr.slice(midInd));

  const sorted = [];
  while (left.length || right.length) {
    if (left[0] < right[0] || !right.length) {
      // need !right.length or else this evaluates to falsey when right is empty and left still has elems
      sorted.push(left.shift());
    } else sorted.push(right.shift());
  }

  return sorted;
};

// console.log(mergeSort([2, 1]));
// console.log(mergeSort([5, 1, 4, 3, 2]));

/*
Strategy:
Recursion. At each recursive step, elect a "pivot" from either the start, middle, or end of the array and partition the array to either side of the pivot. Repeat on each partition.

To sort each partition, iterate over the array. If the elem at i is less than the pivot, swap it to the pivot's index + 1. If the elem at i is greater than i, increment a counter. When finished, swap the pivot to the index of pivot's index + counter. You now have two new unsorted partitions to the left and right of the correctly-placed pivot. 

Psuedocode:


Optimizations:


Complexity:
- time:
- space: 
 */

const swap = (arr, a, b) => {
  [arr[a], arr[b]] = [arr[b], arr[a]];
};

const placePivot = (arr, start = 0, end = arr.length - 1) => {
  const pivot = arr[start];
  let newPivInd = start;

  for (let i = start + 1; i <= end; i++) {
    if (arr[i] < pivot) {
      newPivInd++;
      swap(arr, i, newPivInd);
    }
  }

  // place pivot in its final location
  swap(arr, start, newPivInd);
  return newPivInd;
};

// infinite loop for some arrays (eg, arrays containing duplicates)
const quickSort = (arr, start = 0, end = arr.length - 1) => {
  if (end <= start) return arr;

  const newPivInd = placePivot(arr, start, end);
  quickSort(arr, start, newPivInd - 1);
  quickSort(arr, newPivInd + 1, end);

  return arr;
};

// console.log(quickSort([5, 1, 4, 3, 2]))
// console.log(quickSort([1, 2, 3, 5, 4]))
// console.log(quickSort([5, 5, 1, 4, 3, 3, 2]));

/*
Strategy:


Psuedocode:


Optimizations:


Complexity:
- time:
- space: 
 */
const radixSort = (arr) => {
  return arr;
};

module.exports = {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
};
