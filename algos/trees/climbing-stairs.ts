/*
You are climbing a staircase. It takes n total steps to reach the top. Each time you climb you may take 1 step or 2 steps. In how many distinct combinations of climbs can you reach the top?
*/

import { Tree, BinaryTreeNode } from './class';

// O(2^n)
const climbingStairsBrute = (n: number): number => {
  let numTerminalNodesFound = 0;
  const tree = new BinaryTree([0]);
  let currNode = tree.root;
  const queue = [];

  while(currNode) {
    if (currNode.value == n) {
      numTerminalNodesFound++;
    } else if (currNode.value < n) {
      currNode.left = new BinaryTreeNode(currNode.value + 1);
      currNode.right = new BinaryTreeNode(currNode.value + 2);
      queue.push(currNode.left, currNode.right);
    }
    // some terminal nodes will have value > n; that's overshooting, having taken too many steps. We should disregard those and not count them towards the answer or continue iterating upon them.

    currNode = queue.shift();
  }

  return numTerminalNodesFound;
};

console.log(climbingStairsBrute(4));

const climbingStairsDP = (n: number): number => {

  return n;
};

/*
Examples: 

n = 2 (two steps)
answer: 2 combinations
first move: one step
second move: one step
OR
first move: two steps

n = 3 (three steps)
answer: 3 combinations
[1, 1, 1]
[1, 2]
[2, 1]

n = 4
answer: 5
[1, 1, 1, 1]
[2, 1, 1]
[1, 2, 1]
[1, 1, 2]
[2, 2]

BRUTE FORCE SOLUTION 

Think of it as a decision tree. At each tree, you have a set of 2 decisions available to you. Each of those decisions entails another 2 decisions available after. The value of each node is the cumulative number of steps you've taken so far.

n = 4

            0
        1          2
    2     3      3   4
  3  4  4  5   4  5
4  5  

Notice that we're calculating a subtree starting from 2 several times. Or a subtree starting from 3. We can evaluate the answer to the problem starting from 2 one time and cache it. We can do the same with the subproblem starting from 3, the subproblem starting from 4, etc. 

For that reason, the caching/memoization approach has O(n) time complexity because you do one operation per value between 0 and n.

It's easiest to take a bottom-up dynamic programming approach: start from the base case, currProblem.value = n, and work backwards from there.

if (currProblem.value == n) return 1;
if (n - currProblem.value == 1) return 1 + subProblemN.solution;
etc.

Each subproblem's solution = sum of two later subproblem's solutions. Ie, the solution for n=2 equals the solution of n=3 + the solution of n=4.

Initialize an array where the length = the number of subproblems (n). Store the result of each subproblem at the corresponding index or in a hash with number keys (which in JavaScript is the same thing).
*/
