export const swap = (arr, a, b) => {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}

// this works, but is not the solution I saw online
const bubbleSort = (arr: number[]): void => {
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] > arr[j]) {
        swap(arr, i, j);
      }
    }
  }
}

/*
[9, 4, 8, 6]
i = 0
j = 1
9 vs 4 --> SWAP
[4, 9, 8, 6]
i = 0
j = 2
4 vs 8 --> NO SWAP
[4, 9, 8, 6]
i = 0
j = 3
4 vs 6 --> NO SWAP
[4, 9, 8, 6]
i = 1
j = 2
9 vs 8 --> SWAP
[4, 8, 9, 6]
i = 1
j = 3
8 vs 6 --> SWAP
[4, 6, 9, 8]
i = 2
j = 3
9 vs 8 --> SWAP
[4, 6, 8, 9]
*/



// what I saw online
const otherBubbleSort = (arr: number[]): void => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        swap(arr, j, j + 1);
      }
    }
  }
}

/*
length: 4
[9, 4, 8, 6]
i = 1
j = 0
9 vs 4 --> SWAP
[4, 9, 8, 6]
i = 1
j = 1
9 vs 8 --> SWAP
[4, 8, 9, 6]
i = 1
j = 2
9 vs 6 --> SWAP
[4, 8, 6, 9]
i = 2
j = 1
8 vs 6 --> SWAP
[4, 6, 8, 9]
*/

const array = [9, 4, 8, 6, 3, 1, 7, 2, 5]
bubbleSort(array)
// console.log(array);