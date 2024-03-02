/*
Given n pairs of parentheses, return all possible combinations of well-formed parentheses.

This can be done brute force with a decision tree or using dynamic programming.
*/

const generateParentheses = (n: number): string[] => {
  const result = [];
  const OPEN = '(';
  const CLOSE = ')';

  const recurse = (currString: string, openCount: number, closeCount: number) => {
    // base case: invalid combination
    if (closeCount > openCount) return;
    // base case: completed string
    if (openCount == n && closeCount == n) {
      result.push(currString);
      return;
    }

    // left branch
    if (openCount < n) {
      recurse(currString + OPEN, openCount + 1, closeCount);
    }

    // right branch
    if (closeCount < n) {
      recurse(currString + CLOSE, openCount, closeCount + 1);
    }
  };

  recurse('', 0, 0);
  return result;
};

console.log(generateParentheses(2));
console.log(generateParentheses(3));
console.log(generateParentheses(0));
console.log(generateParentheses(1));


/*
Brute force strategy: decision tree
At each node, options are to add an opening parenthesis or a closing parenthesis.
A valid string will not have more closing parentheses than opening parentheses.

n = 2
answer: ['(())', '()()']
--> a completed string will have two '('s and two ')'s.

diagram (* means invalid node, doesn't count towards result):
                   empty
          (                    *)
    ((              ()       
      (()      ()(    *())
        (())     ()()
*/