const { BST, BinaryHeap } = require('../algos/trees');

describe('Trees', () => {
  xdescribe('Binary Search Trees', () => {

    describe('balancedBST', () => { 
      it('should return true for null and single-node trees', () => {
        expect(new BST().balancedBST()).toEqual(true);
        expect(new BST(0).balancedBST()).toEqual(true);
      })
  
      it('should return true when heights of subtrees are <= 1', () => {
        const equal = new BST(10);
        equal.add(8);
        equal.add(11);
        expect(equal.balancedBST()).toEqual(true);
  
        const offBy1 = new BST(10);
        offBy1.add(8);
        offBy1.add(6);
        offBy1.add(11);
        expect(offBy1.balancedBST()).toEqual(true);
      })
  
      it('should return true when heights of subtrees are > 1', () => {
        const offByMore = new BST(10);
        offByMore.add(8);
        offByMore.add(6);
        offByMore.add(4);
        offByMore.add(11);
        expect(offByMore.balancedBST()).toEqual(false);
      })
    })
  })
  
  xdescribe('Binary Heaps', () => {
    let maxHeap, minHeap;
  
    beforeAll(() => {
      maxHeap = new BinaryHeap('max');
      maxHeap.insert(41);
      maxHeap.insert(39);
      maxHeap.insert(33);
      maxHeap.insert(18);
      maxHeap.insert(27);
      maxHeap.insert(12);
      maxHeap.insert(55);
  
      minHeap = new BinaryHeap('min');
      minHeap.insert(41);
      minHeap.insert(39);
      minHeap.insert(33);
      minHeap.insert(18);
      minHeap.insert(27);
      minHeap.insert(12);
      minHeap.insert(55);
    })
  
    describe('insert', () => { 
      it('should add values to the heap\'s values array', () => {
        expect(maxHeap.values.length).toEqual(7);
        expect(minHeap.values.length).toEqual(7);
      })
  
      it('should bubble up added values so that they appear in the correct order in the heap array', () => {
        expect(maxHeap.values).toEqual([55, 39, 41, 18, 27, 12, 33]);
        expect(minHeap.values).toEqual([12, 27, 18, 41, 33, 39, 55]);
      })
    })
  
    describe('extractRoot', () => { 
      let max, min;
  
      beforeAll(() => {
        max = maxHeap.extractRoot();
        min = minHeap.extractRoot();
      })
  
      it('should remove the first value from the heap\'s values array', () => {
        expect(max).toEqual(55);
        expect(min).toEqual(12);
        expect(maxHeap.values.length).toEqual(6);
        expect(minHeap.values.length).toEqual(6);
      })
  
      xit('should rebalance heap', () => {
        expect(maxHeap.values).toEqual([41, 39, 33, 18, 27, 12]);
        expect(minHeap.values).toEqual([18, 27, 33, 41, 55, 39]);
      })
    })
  })
  
  xdescribe('Priority Queues', () => {
    describe('', () => {
      it('', () => {
  
      })
    })
  
    xdescribe('', () => {
      it('', () => {
        
      })
    })
  })
})