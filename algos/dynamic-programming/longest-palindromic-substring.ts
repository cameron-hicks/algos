/**
 * 
 * Given a string s, return the longest palindromic substring in s. One-letter strings count as palindromes.
 

Example 1:

Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.
Example 2:

Input: s = "cbbd"
Output: "bb"

s = 'iffabcdmlolmdcbagghpods'
answer: 'abcdmlolmdcba'
--> 'lol' and 'mlolm' are sub-solutions

Hint 1
How can we reuse a previously computed palindrome to compute a larger palindrome?
 */

function longestPalindrome(s: string): string {
    if (s.length <= 1) return s;

    const tested: Record<string, boolean> = {};
    // store previously visited pointer pairs as a 2D matrix with left coord as the rows and right coord as the columns. If matrix[0][3] is `true`, that means that the substring beginning at 0 and ending at 3 is a palindrome.
    // All single chars are palindromes, so initialize entries like matrix[0][0] to true.
    // TODO: AlgoMonster initializes all cells to true. I think it's significant to the outcome. The lower left corner of the matrix is cells we don't visit bc the right index would be greater than the left index. Filling them with stub Trues allows our algorithm to identify some palindromes located at the center of words that it otherwise wouldn't.
    const matrix = Array(s.length).fill(null).map(() => Array(s.length).fill(true));
    let longest = s[0];

    // move the left pointer backwards from the right edge so that by the time you want to check s[i][j], you've already checked s[i + 1][j-1]
    for(let left = s.length - 2; left >= 0; left--) {
        for(let right = left + 1; right <= s.length - 1; right++) {
            const substring = s.slice(left, right + 1);

            // if we've seen this exact substring before elsewhere, skip
            if (tested[substring]) {
                matrix[left][right] = tested[substring];
                continue;
            }

            if (s[left] === s[right] && matrix[left + 1][right - 1] === true) {
                // it's a palindrome!
                tested[substring] = true;
                matrix[left][right] = true;

                if (
                    substring.length > longest.length
                ) {
                    longest = substring;
                }   
            } else {
                tested[substring] = false;
                matrix[left][right] = false;
            }
        }
    }

    return longest;
};

console.log('answer is "bab" or "aba":', longestPalindrome('babad') || 'none');
console.log('answer is "bb":', longestPalindrome('cbbd') || 'none');
console.log('answer is "abcdmlolmdcba":', longestPalindrome('iffabcdmlolmdcbagghpods') || 'none');
console.log('answer is "a" or "c":', longestPalindrome('ac') || 'none');
console.log('answer is ???:', longestPalindrome('zudfweormatjycujjirzjpyrmaxurectxrtqedmmgergwdvjmjtstdhcihacqnothgttgqfywcpgnuvwglvfiuxteopoyizgehkwuvvkqxbnufkcbodlhdmbqyghkojrgokpwdhtdrwmvdegwycecrgjvuexlguayzcammupgeskrvpthrmwqaqsdcgycdupykppiyhwzwcplivjnnvwhqkkxildtyjltklcokcrgqnnwzzeuqioyahqpuskkpbxhvzvqyhlegmoviogzwuiqahiouhnecjwysmtarjjdjqdrkljawzasriouuiqkcwwqsxifbndjmyprdozhwaoibpqrthpcjphgsfbeqrqqoqiqqdicvybzxhklehzzapbvcyleljawowluqgxxwlrymzojshlwkmzwpixgfjljkmwdtjeabgyrpbqyyykmoaqdambpkyyvukalbrzoyoufjqeftniddsfqnilxlplselqatdgjziphvrbokofvuerpsvqmzakbyzxtxvyanvjpfyvyiivqusfrsufjanmfibgrkwtiuoykiavpbqeyfsuteuxxjiyxvlvgmehycdvxdorpepmsinvmyzeqeiikajopqedyopirmhymozernxzaueljjrhcsofwyddkpnvcvzixdjknikyhzmstvbducjcoyoeoaqruuewclzqqqxzpgykrkygxnmlsrjudoaejxkipkgmcoqtxhelvsizgdwdyjwuumazxfstoaxeqqxoqezakdqjwpkrbldpcbbxexquqrznavcrprnydufsidakvrpuzgfisdxreldbqfizngtrilnbqboxwmwienlkmmiuifrvytukcqcpeqdwwucymgvyrektsnfijdcdoawbcwkkjkqwzffnuqituihjaklvthulmcjrhqcyzvekzqlxgddjoir') || 'none');
