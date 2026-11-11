/**
 * Generate Parentheses
 * 
 * Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]
 * 
                  n = 3
                     ( 
              ((                    ()
        (((        (()        ()(          x
      x   ((() (()(  (())  ()(( ()()
x x x ((())

- root will always be (
- each recursive path should return a string of well-formed parentheses
- whether a left child exists depends on comparing the number of open parens so far to n
- whether a right child exists depends on comparing the number of closed parens so far to the number of open parens so far
--- but order matters too... ((())) is valid but (()))( is not.
-- if A is the # of open parens and B is the # of closed parens, then you are allowed to add open parens only when A >= B and A < n. And you are allowed to add closed parens only when B < A.

I used a backtracking algo below, not sure how to do this with dynamic programming but supposedly you can.
 */

const OPEN = '(';
const CLOSE = ')';

interface Solution {
  value: string;
  numOpen: number;
  numClosed: number;
}

const hasOpenChild = (sol: Solution, n: number): boolean => {
  if (sol.numOpen < n) return true;
  return false;
};

const hasClosedChild = (sol: Solution): boolean => {
  if (sol.numClosed < sol.numOpen) return true;
  return false;
};

function generateParenthesis(n: number): string[] {
  const solutions: string[] = [];

  const dfs = (sol: Solution) => {
    if (sol.value.length / 2 === n) {
      solutions.push(sol.value);
      return;
    }

    if (hasOpenChild(sol, n)) {
      dfs({
        value: sol.value + OPEN,
        numOpen: sol.numOpen + 1,
        numClosed: sol.numClosed,
      });
    }

    if (hasClosedChild(sol)) {
      dfs({
        value: sol.value + CLOSE,
        numOpen: sol.numOpen,
        numClosed: sol.numClosed + 1,
      });
    }
  };

  dfs({
    value: OPEN,
    numOpen: 1,
    numClosed: 0,
  });

  return solutions;
}

console.log(generateParenthesis(0));

export {};
