/*
Given a sorted array of numbers and a target number, find the all the possible sets of three indexes of three items that sum up to the target. Don't use the same value more than once within a set. Don't return identical
solution sets.

Example solution: 
[
  [0, 1, 4],
  [2, 4, 5]
]

Brute force solution would be a triple loop, O(n^3).
*/

// O(n^2)
// If the input array were not sorted, you would just do that first
// in O(n*logn). Overall time-complexity would still be O(n^2).
const threeSum = (arr: number[], target: number): number[][] => {
  const allSolutions: number[][] = [];

  for (let i = 0; i < arr.length - 2; i++) {
    // Now do two sum on the remaining array:
    const twoSumTarget = target - arr[i];
    let j = i + 1;

    // prevent using duplicate values (duplicates will be adjacent)
    if (arr[i] == arr[j]) j++;

    let k = arr.length - 1;
    while (j < k && arr[j] != arr[k]) {
      const twoSum = arr[j] + arr[k];

      if (twoSum == twoSumTarget && arr[j] != arr[k]) {
        allSolutions.push([i, j, k]);
        break;
      } else if (twoSum > twoSumTarget) {
        k--;
      } else if (twoSum < twoSumTarget) {
        j++;
      }
    }
  }

  return allSolutions;
}

const arr = [-3, -3, 1, 2, 3, 4];
const target = 0;

const result = threeSum(arr, target);
console.log('With two pointers: ', result);

export {};