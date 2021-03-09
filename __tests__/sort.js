const {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
} = require('../algos/sort');

describe('Sorting', () => {
  const unsorted = [5, 1, 4, 3, 2];

  describe('Bubble sort', () => {
    it('should return an array', () => {
      expect(bubbleSort(unsorted)).toBeInstanceOf(Array);
    });

    xit('', () => {});
  });

  xdescribe('Selection sort', () => {
    it('should return an array', () => {
      expect(selectionSort(unsorted)).toBeInstanceOf(Array);
    });

    xit('', () => {});
  });

  xdescribe('Insertion sort', () => {
    it('should return an array', () => {
      expect(insertionSort(unsorted)).toBeInstanceOf(Array);
    });

    xit('', () => {});
  });

  xdescribe('Merge sort', () => {
    it('should return an array', () => {
      expect(mergeSort(unsorted)).toBeInstanceOf(Array);
    });

    xit('', () => {});
  });

  xdescribe('Quick sort', () => {
    it('should return an array', () => {
      expect(quickSort(unsorted)).toBeInstanceOf(Array);
    });

    xit('', () => {});
  });

  xdescribe('Radix sort', () => {
    it('should return an array', () => {
      expect(radixSort(unsorted)).toBeInstanceOf(Array);
    });

    xit('', () => {});
  });
});
