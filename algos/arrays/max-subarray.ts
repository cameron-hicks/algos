/* 
Given an array of positive and negative numbers, find the continuous subarray (must be at least one item long) which has the largest sum. Return its sum.

example:
[-2, 1, -3, 4, -1, 2, 1, -5, 4]
answer: 6
from [4, -1, 2, 1]
*/

// Sliding window
// O(n)
const maxSubarray = (arr: number[]): number => {
  let sum = arr[0];
  // let subarray = [arr[0]];
  if (arr.length == 1) return sum;

  for(let i = 1; i < arr.length; i++) {
    const tentativeSum = sum + arr[i];
    if (tentativeSum < arr[i]) {
      sum = arr[i];
    } else { sum = tentativeSum; }
  }

  return sum;
};

const exampleOne = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
// answer: 6
console.log('Example one: ', maxSubarray(exampleOne));

const exampleTwo = [-2, 1, -3, 4, -1, 2, 1, -5, 4, 100];
// answer: 105
console.log('Example one: ', maxSubarray(exampleTwo));

/*
Optimizing the solution comes from avoiding "negative prefixes", ie, avoiding working on a subarray whose sum is less than one of the eleme nts would be on its own, since you're allowed to build a subarray of length 1. That larger, later item would produce a larger sum on its own. So as you iterate, if you find a positive number, discard the negative numbers that come before it. 

e.g.: On my first iterative loop, I'm looking at subarrays starting with -2. I get to [-2, 1] and at that point my best max sum so far is -1. However, I can find a higher max by just excluding the -2 and starting over with a subarray of [1], then [1, -3]. Essentially, I'm early returning from the loop where i=0 and the first item in the subarray I'm building is -2.

I proceed with item value 1 until I get to [1, -3, 4]. Then my max sum is 2, but I see that it could be 4 if I start over: chopping off the prefix of [1, -3] from my subarray and skipping ahead to the next iterative loop where i = 3 and the first item in the subarray is 4.

Then, to decide where to end my array, I proceed iterating through until the end of the set, exploring all the options before I decide whether to continue my subarray to the end of the set or end it earlier. For example, what if the input array looked like this?
[-2, 1, -3, 4, -1, 2, 1, -5, 4, 100]

Then, even though that subarray [4, -1, 2, 1] looks like it would be reduced by proceeding to add the -5, there's a large element later that makes it worth it to continue iterating.
*/