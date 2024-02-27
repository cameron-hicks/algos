export class TreeNode {
  contructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  // Iterative approach — uses a queue
  // If you want the tree to be sorted, just sort the queue
  constructor(values) {
    this.head = new TreeNode(values.shift());
    let currNode = this.head;

    while (values.length) {
      if (!currNode.left) {
        currNode.left = new TreeNode(values.shift());
      } else if (!currNode.right) {
        currNode.right = new TreeNode(values.shift());
      } else {
        currNode = currNode.left;
      }
    }
  }
}
