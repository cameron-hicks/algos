/*
Given two sorted arrays, merge them in place into one sorted array, without creating a new array to hold the result. Tip: you can merge b into a.

Imagine array A as an array with sufficient extra, empty slots added at the end to hold the elements from array B. Iterate backwards from the end of what will be array A once completed.
*/

const mergeArrays = (a: number[], b: number[]): number[] => {
  let aPointer = a.length - 1;
  let bPointer = b.length - 1;

  let openSlot = a.length + b.length - 1;

  while(aPointer >=0 && bPointer >=0) {
    if (a[aPointer] > b[bPointer]) {
      a[openSlot] = a[aPointer];
      aPointer--;
      openSlot--;
    } else {
      a[openSlot] = b[bPointer];
      bPointer--;
      openSlot--;
    }
  }

  while (aPointer >= 0) {
    a[openSlot] = a[aPointer];
    aPointer--;
      openSlot--;
  }

  while (bPointer >= 0) {
    a[openSlot] = b[bPointer];
    bPointer--;
    openSlot--;
  }

  return a;
}

let a = [-1, 0, 1, 2, 4, 7]
let b = [3, 5, 6]
// answer: [-1, 0, 1, 2, 3, 4, 5, 6, 7]
console.log(mergeArrays(a, b));
console.log(mergeArrays(b, a));

a = [3];
b = [1, 2, 4, 5];
// [1, 2, 3, 4, 5]
console.log(mergeArrays(a, b));

a = [1, 2, 3];
b = [2, 5, 6];
// answer: [1, 2, 2, 3, 5, 6]
console.log(mergeArrays(a, b));