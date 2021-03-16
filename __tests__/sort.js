const {
  bubbleSort,
  selectionSort,
  insertionSort,
  mergeSort,
  quickSort,
  radixSort,
} = require('../algos/sort');

describe('Sorting', () => {

  describe('Bubble sort', () => {
    let unsorted, nearlySorted, reverseSorted, sorted, empty, single, dups, dupsSorted;

    beforeEach(() => {
      unsorted = [5, 1, 4, 3, 2];
      nearlySorted = [1, 2, 3, 5, 4];
      reverseSorted = [5, 4, 3, 2, 1];
      sorted = [1, 2, 3, 4, 5];

      // edge cases
      empty = [];
      single = [1];
      dups = [5, 5, 1, 4, 3, 3, 2];
      dupsSorted = [1, 2, 3, 3, 4, 5, 5];
    });

    it('should return an array', () => {
      expect(bubbleSort(unsorted)).toBeInstanceOf(Array);
    });

    it('should return a sorted array', () => {
      expect(bubbleSort(unsorted)).toEqual(sorted);
      expect(bubbleSort(nearlySorted)).toEqual(sorted);
      expect(bubbleSort(reverseSorted)).toEqual(sorted);
    });

    it('should manipulate the array in-place', () => {
      expect(bubbleSort(unsorted)).toBe(unsorted);
    });

    it('should handle empty and single-value arrays', () => {
      expect(bubbleSort(empty)).toEqual(empty);
      expect(bubbleSort(single)).toEqual(single);
    });

    it('should handle arrays with duplicate values', () => {
      expect(bubbleSort(dups)).toEqual(dupsSorted);
    });
  });

  describe('Selection sort', () => {
    let unsorted, nearlySorted, reverseSorted, sorted, empty, single, dups, dupsSorted;

    beforeEach(() => {
      unsorted = [5, 1, 4, 3, 2];
      nearlySorted = [1, 2, 3, 5, 4];
      reverseSorted = [5, 4, 3, 2, 1];
      sorted = [1, 2, 3, 4, 5];

      // edge cases
      empty = [];
      single = [1];
      dups = [5, 5, 1, 4, 3, 3, 2];
      dupsSorted = [1, 2, 3, 3, 4, 5, 5];
    });

    it('should return an array', () => {
      expect(selectionSort(unsorted)).toBeInstanceOf(Array);
    });

    it('should manipulate the array in-place', () => {
      expect(selectionSort(unsorted)).toBe(unsorted);
    });

    it('should return a sorted array', () => {
      expect(selectionSort(unsorted)).toEqual(sorted);
      expect(selectionSort(nearlySorted)).toEqual(sorted);
      expect(selectionSort(reverseSorted)).toEqual(sorted);
    });

    it('should handle empty and single-value arrays', () => {
      expect(selectionSort(empty)).toEqual(empty);
      expect(selectionSort(single)).toEqual(single);
    });

    it('should handle arrays with duplicate values', () => {
      expect(selectionSort(dups)).toEqual(dupsSorted);
    });
  });

  describe('Insertion sort', () => {
    let unsorted, nearlySorted, reverseSorted, sorted, empty, single, dups, dupsSorted;

    beforeEach(() => {
      unsorted = [5, 1, 4, 3, 2];
      nearlySorted = [1, 2, 3, 5, 4];
      reverseSorted = [5, 4, 3, 2, 1];
      sorted = [1, 2, 3, 4, 5];

      // edge cases
      empty = [];
      single = [1];
      dups = [5, 5, 1, 4, 3, 3, 2];
      dupsSorted = [1, 2, 3, 3, 4, 5, 5];
    });

    it('should return an array', () => {
      expect(insertionSort(unsorted)).toBeInstanceOf(Array);
    });

    it('should manipulate the array in-place', () => {
      expect(insertionSort(unsorted)).toBe(unsorted);
    });

    it('should return a sorted array', () => {
      expect(insertionSort(unsorted)).toEqual(sorted);
      expect(insertionSort(nearlySorted)).toEqual(sorted);
      expect(insertionSort(reverseSorted)).toEqual(sorted);
    });

    it('should handle empty and single-value arrays', () => {
      expect(insertionSort(empty)).toEqual(empty);
      expect(insertionSort(single)).toEqual(single);
    });

    it('should handle arrays with duplicate values', () => {
      expect(insertionSort(dups)).toEqual(dupsSorted);
    });
  });

  describe('Merge sort', () => {
    let unsorted, nearlySorted, reverseSorted, sorted, empty, single, dups, dupsSorted;

    beforeEach(() => {
      unsorted = [5, 1, 4, 3, 2];
      nearlySorted = [1, 2, 3, 5, 4];
      reverseSorted = [5, 4, 3, 2, 1];
      sorted = [1, 2, 3, 4, 5];

      // edge cases
      empty = [];
      single = [1];
      dups = [5, 5, 1, 4, 3, 3, 2];
      dupsSorted = [1, 2, 3, 3, 4, 5, 5];
    });

    it('should return an array', () => {
      expect(mergeSort(unsorted)).toBeInstanceOf(Array);
    });

    xit('should manipulate the array in-place', () => {
      expect(mergeSort(unsorted)).toBe(unsorted);
    });

    it('should return a sorted array', () => {
      expect(mergeSort(unsorted)).toEqual(sorted);
      expect(mergeSort(nearlySorted)).toEqual(sorted);
      expect(mergeSort(reverseSorted)).toEqual(sorted);
    });

    it('should handle empty and single-value arrays', () => {
      expect(mergeSort(empty)).toEqual(empty);
      expect(mergeSort(single)).toEqual(single);
    });

    it('should handle arrays with duplicate values', () => {
      expect(mergeSort(dups)).toEqual(dupsSorted);
    });
  });

  describe('Quick sort', () => {
    let unsorted, nearlySorted, reverseSorted, sorted, empty, single, dups, dupsSorted;

    beforeEach(() => {
      unsorted = [5, 1, 4, 3, 2];
      nearlySorted = [1, 2, 3, 5, 4];
      reverseSorted = [5, 4, 3, 2, 1];
      sorted = [1, 2, 3, 4, 5];

      // edge cases
      empty = [];
      single = [1];
      dups = [5, 5, 1, 4, 3, 3, 2];
      dupsSorted = [1, 2, 3, 3, 4, 5, 5];
    });

    it('should return an array', () => {
      expect(quickSort(unsorted)).toBeInstanceOf(Array);
    });

    it('should manipulate the array in-place', () => {
      expect(quickSort(unsorted)).toBe(unsorted);
    });

    it('should return a sorted array', () => {
      expect(quickSort(unsorted)).toEqual(sorted);
      expect(quickSort(nearlySorted)).toEqual(sorted);
      expect(quickSort(reverseSorted)).toEqual(sorted);
    });

    it('should handle empty and single-value arrays', () => {
      expect(quickSort(empty)).toEqual(empty);
      expect(quickSort(single)).toEqual(single);
    });

    it('should handle arrays with duplicate values', () => {
      expect(quickSort(dups)).toEqual(dupsSorted);
    });
  });

  xdescribe('Radix sort', () => {
    let unsorted, nearlySorted, reverseSorted, sorted, empty, single, dups, dupsSorted;

    beforeEach(() => {
      unsorted = [5, 1, 4, 3, 2];
      nearlySorted = [1, 2, 3, 5, 4];
      reverseSorted = [5, 4, 3, 2, 1];
      sorted = [1, 2, 3, 4, 5];

      // edge cases
      empty = [];
      single = [1];
      dups = [5, 5, 1, 4, 3, 3, 2];
      dupsSorted = [1, 2, 3, 3, 4, 5, 5];
    });

    it('should return an array', () => {
      expect(radixSort(unsorted)).toBeInstanceOf(Array);
    });

    it('should return a sorted array', () => {
      expect(radixSort(unsorted)).toEqual(sorted);
      expect(radixSort(nearlySorted)).toEqual(sorted);
      expect(radixSort(reverseSorted)).toEqual(sorted);
    });

    it('should handle empty and single-value arrays', () => {
      expect(radixSort(empty)).toEqual(empty);
      expect(radixSort(single)).toEqual(single);
    });

    it('should handle arrays with duplicate values', () => {
      expect(radixSort(dups)).toEqual(dupsSorted);
    });
  });
});
