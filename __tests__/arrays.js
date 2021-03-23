const arrays = require('../algos/arrays');

describe('Arrays', () => {
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

  describe('spiral matrix', () => {
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