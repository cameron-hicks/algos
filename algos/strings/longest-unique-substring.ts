/*
Return the length of the longest substring that can be formed from a string that may or may not contain repeating characters.

Examples:

abcabcbb
3

bbbbb
1

pwwkew
3

au
2

a
1
*/

const longestUniqueSubstring = (s: string): number => {
  const set = new Set(s[0]);
  let longestSubstring = set.size;

  let start = 0;
  let end = 0;

  while (end < s.length - 1) {
    end++;

    if (set.has(s[end])) {
      longestSubstring = Math.max(
        longestSubstring,
        set.size
      );

      while (set.has(s[end])) {
        set.delete(s[start]);
        start++;
      }
    } 
    
    if(s[end]) {
      set.add(s[end]);
    }
  }

  return Math.max(
    longestSubstring,
    set.size
  );
};

console.log(longestUniqueSubstring('abcabcbb') == 3 ? 'pass' : `fail => ${longestUniqueSubstring('abcabcbb')}`);
console.log(longestUniqueSubstring('bbbbb') == 1 ? 'pass' : `fail => ${longestUniqueSubstring('bbbbb')}`);
console.log(longestUniqueSubstring('pwwkew') == 3 ? 'pass' : `fail => ${longestUniqueSubstring('pwwkew')}`);
console.log(longestUniqueSubstring('au') == 2 ? 'pass' : `fail => ${longestUniqueSubstring('au')}`);
console.log(longestUniqueSubstring('a') == 1 ? 'pass' : `fail => ${longestUniqueSubstring('a')}`);
console.log(longestUniqueSubstring('aab') == 2 ? 'pass' : `fail => ${longestUniqueSubstring('aab')}`);