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
}
