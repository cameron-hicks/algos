const { arrays, PriorityQueue } = require('../algos/arrays');

describe('Arrays', () => {
  describe('binarySearch', () =>{
    it('should return the index of the search target', () => {
      expect(arrays.binarySearch([0, 1, 2, 3, 4, 5, 6], 1)).toEqual(1);
      expect(arrays.binarySearch([0, 1, 2, 3, 4, 5, 6], 0)).toEqual(0);
      expect(arrays.binarySearch([0, 1, 2, 3, 4, 5, 6], 6)).toEqual(6);
      expect(arrays.binarySearch([0, 1, 2, 3, 4, 5, 6], 4)).toEqual(4);
      expect(arrays.binarySearch([10, 30, 45, 62, 78, 112, 174, 240], 78)).toEqual(4);
    })

    it('should return -1 if the target is not found', () => {
      expect(arrays.binarySearch([0, 1, 2, 3, 4, 5, 6], 7)).toEqual(-1);
    })
  })

  describe('twoSum', () =>{
    it('should work in regular cases', () => {
      expect(arrays.twoSum([2, 7, 11, 15], 9)).toEqual([0, 1]);
    })
  })

  describe('coinSum', () =>{
    it('should work in regular cases', () => {
      expect(arrays.coinSum([1, 2, 5], 11)).toEqual(3);
    })

    it('should work for large inputs', () => {
      expect(arrays.coinSum([1, 2, 5], 100)).toEqual(20);
    })

    it('should work for short input arrays', () => {
      expect(arrays.coinSum([1], 1)).toEqual(1);
      expect(arrays.coinSum([1], 2)).toEqual(2);
    })

    it('should return 0 if target amount is 0', () => {
      expect(arrays.coinSum([10], 0)).toEqual(0);
    })

    it('should return -1 if no combination of coins can produce the target amount', () => {
      expect(arrays.coinSum([2], 3)).toEqual(-1);
    })
  })

  xdescribe('stock', () => {
    it('should return 0 for an array of length < 2', () => {
      expect(arrays.stock([100])).toEqual(0);
    })

    it('should return 0 when no positive profit can be made', () => {
      expect(arrays.stock([7, 6, 4, 3, 1])).toEqual(0);
    })

    it('should return the max profit when one can be made from buying on the absolute lowest date', () => {
      expect(arrays.stock([7, 1, 5, 3, 6, 4])).toEqual(5);
    })

    it('should return the max profit when it can be made from buying on a date which is not the absolute lowest', () => {
      expect(arrays.stock([6, 3, 7, 2, 3, 4])).toEqual(4);
    })
  })

  xdescribe('spiral matrix', () => {
    it('should work for square matrices', () => {
      expect(arrays.spiralMatrix([[1,2,3],[4,5,6],[7,8,9]])).toEqual([1,2,3,6,9,8,7,4,5]);
    })

    it('should work for rectangular matrices', () => {
      expect(arrays.spiralMatrix([[1,2,3,4],[5,6,7,8],[9,10,11,12]])).toEqual([1,2,3,4,8,12,11,10,9,5,6,7]);
    })

    it('should work for matrices with more than 3 rows', () => {
      expect(arrays.spiralMatrix([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]])).toEqual([1,2,3,4,8,12,16,15,14,13,9,5,6,7,11,10]);
    })
  })
})