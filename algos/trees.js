export class BST {
  constructor(value) {
    this.val = value;
  }

  add(value) {
    const tree = this;

    if (value > tree.value) {
      return tree.right ? tree.right.add(value) : (tree.right = new BST(value));
    } else {
      return tree.left ? tree.left.add(value) : (tree.left = new BST(value));
    }
  }

  // Return true if the difference between the heights of the left and right subtrees is not greater than 1.
  balancedBST() {
    // TODO
  }

  // Return true if, at each node, this tree's value equals the other tree's value.
  equals(other) {
    // TODO
  }

  // Return true if this is a valid binary search tree.
  valid() {
    // TODO
  }

  // Reverse all the nodes such that at each level, the child that is greater than the parent is on the left, while the child that is less than the parent is on the right.
  reverse() {
    // TODO
  }
}
