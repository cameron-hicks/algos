/**
 * Minimum Cost to Acquire Required Items
 * 
 * You are given five integers cost1, cost2, costBoth, need1, and need2.

There are three types of items available:

An item of type 1 costs cost1 and contributes 1 unit to the type 1 requirement only.
An item of type 2 costs cost2 and contributes 1 unit to the type 2 requirement only.
An item of type 3 costs costBoth and contributes 1 unit to both type 1 and type 2 requirements.
You must collect enough items so that the total contribution toward type 1 is at least need1 and the total contribution toward type 2 is at least need2.

Return an integer representing the minimum possible total cost to achieve these requirements.
 * 
 *
Example 1:

Input: cost1 = 3, cost2 = 2, costBoth = 1, need1 = 3, need2 = 2

Output: 3

Explanation:

After buying three type 3 items, which cost 3 * 1 = 3, the total contribution to type 1 is 3 (>= need1 = 3) and to type 2 is 3 (>= need2 = 2).
Any other valid combination would cost more, so the minimum total cost is 3.

Example 2:

Input: cost1 = 5, cost2 = 4, costBoth = 15, need1 = 2, need2 = 3

Output: 22

Explanation:

We buy need1 = 2 items of type 1 and need2 = 3 items of type 2: 2 * 5 + 3 * 4 = 10 + 12 = 22.
Any other valid combination would cost more, so the minimum total cost is 22.

Example 3:

Input: cost1 = 5, cost2 = 4, costBoth = 15, need1 = 0, need2 = 0

Output: 0

Explanation:

Since no items are required (need1 = need2 = 0), we buy nothing and pay 0.
*
*
                                need 3 of type 1, 2 of type 2
    1-1, 0-2                                0-1, 1-2                                 1-1, 1-2
2-1, 0-2. 1-1, 1-2, 2-1, 1-2.      1-1, 1-2. 0-1, 2-2. 1-1, 2-2               2-1, 1-2. 1-1, 2-2. 2-1, 2-2

 */

/* The below is a greedy approach. It passes Leetcode's time-constrained test cases. */
function minimumCost(
  cost1: number,
  cost2: number,
  costBoth: number,
  need1: number,
  need2: number
): number {
  // option 1: use type 3 items to cover both requirements. Whichever requirement is greater, you'll have to buy that many type 3 items to meet both reqs.
  const costOption1 = costBoth * Math.max(need1, need2);

  // option 2: use typ 1 items to meet the type 1 req and type 2 items to meet the type 2 req.
  const costOption2 = cost1 * need1 + cost2 * need2;

  // option 3: use type 3 items to cover the common overlap in the venn diagram btw the requirements, then type 1 for the remainder of the type 1 req and type 2 for the remainder of the type 2 req.
  const overlap = Math.min(need1, need2);
  const costOption3 =
    costBoth * overlap + cost1 * (need1 - overlap) + cost2 * (need2 - overlap);

  return Math.min(costOption1, costOption2, costOption3);
}

/* The below is a breadth-first search approach. It works but it doesn't pass Leetcode's time-constrained test cases. You would need a greedy algorithm for that. */

interface Solution {
  num1: number;
  num2: number;
  costSoFar: number;
}

function minimumCostBFS(
  cost1: number,
  cost2: number,
  costBoth: number,
  need1: number,
  need2: number
): number {
  let lowestCost = Infinity;
  const q: Solution[] = [
    {
      num1: 0,
      num2: 0,
      costSoFar: 0,
    },
  ];

  while (q.length) {
    const curr = q.shift();

    if (!curr) break;
    if (curr.num1 >= need1 && curr.num2 >= need2) {
      if (curr.costSoFar < lowestCost) {
        lowestCost = curr.costSoFar;
      }

      continue;
    }

    // it's only worth exploring child nodes if they add items we need more of
    if (curr.num1 < need1) {
      q.push({
        num1: curr.num1 + 1,
        num2: curr.num2,
        costSoFar: curr.costSoFar + cost1,
      });
    }

    if (curr.num2 < need2) {
      q.push({
        num1: curr.num1,
        num2: curr.num2 + 1,
        costSoFar: curr.costSoFar + cost2,
      });
    }

    if (curr.num1 < need1 || curr.num2 < need2) {
      q.push({
        num1: curr.num1 + 1,
        num2: curr.num2 + 1,
        costSoFar: curr.costSoFar + costBoth,
      });
    }
  }

  return lowestCost;
}

console.log(minimumCost(12, 28, 50, 6, 8));
