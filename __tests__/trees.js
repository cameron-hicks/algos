const {
  BST,
} = require('../algos/trees');

describe('Trees', () => {

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