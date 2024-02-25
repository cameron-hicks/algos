/*
Given a 2D array where each subarray describes the date and the current price of a stock, return the the dates to buy and sell, [purchaseDate, saleDate], in order to earn largest profit. Ensure that the sale date is after the purchase date.
*/

const buyAndSellStock = (arr: number[]): number[] => {
  if (arr.length < 2) throw new Error("Provide data for at least two dates");
  
  let buyDate = 0;
  let saleDate = 1;
  let bestDiff = -Infinity;

  for (let i = 1; i < arr.length; i++) {
    if (arr[buyDate] > arr[i] && i != arr.length - 1) {
      buyDate = i;
    } else {
      const diff = arr[i] - arr[buyDate];

      if (diff > bestDiff) {
        saleDate = i;
        bestDiff = diff;
      }
    }
  }

  return [buyDate, saleDate];
}

const exampleOne = [7, 1, 6, 5, 4, 5];
// answer: [1, 2]
console.log(buyAndSellStock(exampleOne));

const exampleTwo = [2, 3, 7, 6, 4, 2, 1];
// answer: [0, 2]
console.log(buyAndSellStock(exampleTwo));

const exampleThree = [3, 2, 1, 4, 5, 6, 7];
// answer: [2, 6]
console.log(buyAndSellStock(exampleThree));