/*
Given a string containing only brackets and parentheses, return true if the string contains only valid pairs and false if it doesn't.

Example:
[{()}]
--> true

)[{}]
--> false

[{(}]
--> false
*/

const validParentheses = (str: string): boolean => {
  const parens = {
    ']': '[',
    '}': '{',
    ')': '('
  }

  const stack = [];
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    if (parens[char]) {
      if (parens[char] !== stack.pop()) return false;
    } else {
      stack.push(char);
    }
  }

  return true;
};

console.log(
  validParentheses('[{()}]'),
  validParentheses(')[{}]'),
  validParentheses('[{(}]')
);