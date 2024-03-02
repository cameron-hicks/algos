export class TreeNode {
  value: any;
  children: TreeNode[] = []

  constructor(value: any) {
    this.value = value;
  }
}

export class Tree {
  root: TreeNode;

  constructor(root: TreeNode) {
    this.root = root;
  }
}

export class BinaryTreeNode {
  value: number;
  left: BinaryTreeNode | null;
  right: BinaryTreeNode | null; 

  constructor(value: BinaryTreeNode['value']) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class BinaryTree {
  root: BinaryTreeNode;

  // Iterative approach — uses a queue
  // If you want the tree to be sorted, just sort the queue

  /*
     1
  2     3
4  5   6
*/

  constructor(values: number[]) {
    this.root = new BinaryTreeNode(values.shift()); // 1
    const queue: BinaryTreeNode[] = [this.root];
    let currNode, val;
    
    while (queue.length && values.length) {
      currNode = queue.shift(); //1

      val = values.shift(); //4
      currNode.left = new BinaryTreeNode(val);
      queue.push(currNode.left);

      val = values.shift(); //5
      if (!val) break;
      currNode.right = new BinaryTreeNode(val);
      queue.push(currNode.right);
    }
  }
}
