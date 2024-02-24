/*
Given two strings, determine whether they are perfect anagrams. (Return true or false.)
*/

// Build a hash where the keys are the chars of the strings and the values are the number of times that char appears in the string. Then compare the count hashes.
// time: O(n) where n is the length of the strings
// space: O(n) in the worst case where all chars are unique
const anagramHash = (a: string, b: string): boolean => {
  if (a.length != b.length) return false;
  
  const countA: Record<string, number> = {};
  const countB: Record<string, number> = {};

  for(let i = 0; i < a.length; i++) {
    if (!countA[a[i]]) countA[a[i]] = 1;
    else countA[a[i]]++;
    
    if (!countB[b[i]]) countB[b[i]] = 1;
    else countB[b[i]]++; 
  }

  for (const key in countA) {
    if (countA[key] != countB[key]) return false;
  }

  return true;
}

// First sort both strings. Then iterate over them in parallel. As soon as you find an index where the chars don't match, you can return false. 
// Advantage: uses less memory.
// time: O(n logn)
// space: O(1)
const anagramSorted = (a: string, b: string): boolean => {
  if (a.length != b.length) return false;
  
  // In other languages, strings have a native sort() method...
  const sortedA = a.split('').sort().join();
  const sortedB = b.split('').sort().join();

  for (let i = 0; i < a.length; i++) {
    if (sortedA != sortedB) return false;
  }
  
  return true;
}

const a = 'rainbow';
const b = 'winobar';

console.log('With a hash: ', anagramHash(a, b));
console.log('With sorting: ', anagramSorted(a, b));

const aWrong = 'serendipity';
const bWrong = 'dude';

console.log('With a hash: ', anagramHash(aWrong, bWrong));
console.log('With sorting: ', anagramSorted(aWrong, bWrong));

const aOff = 'exam';
const bOff = 'exas';

console.log('With a hash: ', anagramHash(aOff, bOff));
console.log('With sorting: ', anagramSorted(aOff, bOff));