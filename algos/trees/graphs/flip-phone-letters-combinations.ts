/**
 * Letter Combinations of a Phone Number
 * 
 * Given a string containing `n` digits from 2-9 inclusive, return all possible letter combinations that the number could represent. Return the answer in any order. The string of digits will be between 1 and 4 characters in length. A valid letter combination will be a string the same length as the input digit string.

A mapping of digits to letters (just like on the telephone buttons) is given below.
• 2: abc
• 3: def
• 4: ghi
• 5: jkl
• 6: mno
• 7: pqrs
• 8: tuv
• 9: wxyz
• 1 and 0: No letters

Example 1:

Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]
Example 2:

Input: digits = "2"
Output: ["a","b","c"]

Use a backtracking algo; will be O(4^n) worst case, where `n` is the length of the input string, because each digit can map to up to 4 letters.
DFS; base case for recursion is when string is `n` characters long.
 */

/**
 *         2a        2b.          2c
 *   3d. 3e. 3f   3d. 3e. 3f.   3d. 3e. 3f
 */

const DIG_TO_CHAR: Record<string, string[]> = {
  2: ['a', 'b', 'c'],
  3: ['d', 'e', 'f'],
  4: ['g', 'h', 'i'],
  5: ['j', 'k', 'l'],
  6: ['m', 'n', 'o'],
  7: ['p', 'q', 'r', 's'],
  8: ['t', 'u', 'v'],
  9: ['w', 'x', 'y', 'z'],
};

function letterCombinations(digits: string): string[] {
  const solutions: string[] = [];

  const dfs = (stringSoFar: string, digitsRemaining: string) => {
    if (!digitsRemaining.length) {
      solutions.push(stringSoFar);
      return;
    }

    const nextDigit = digitsRemaining[0];
    DIG_TO_CHAR[nextDigit].forEach((char) => {
      dfs(stringSoFar + char, digitsRemaining.slice(1));
    });
  };

  dfs('', digits);
  return solutions;
}

export {};
