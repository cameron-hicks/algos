export class TreeNode {
  value: number;
  left: TreeNode | null;
  right: TreeNode | null; 

  constructor(value: TreeNode['value']) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

export class Tree {
  root: TreeNode;

  // Iterative approach — uses a queue
  // If you want the tree to be sorted, just sort the queue

  /*
     1
  2     3
4  5   6
*/

  constructor(values: number[]) {
    this.root = new TreeNode(values.shift()); // 1
    const queue: TreeNode[] = [this.root];
    let currNode, val;
    
    while (queue.length && values.length) {
      currNode = queue.shift(); //1

      val = values.shift(); //4
      currNode.left = new TreeNode(val);
      queue.push(currNode.left);

      val = values.shift(); //5
      if (!val) break;
      currNode.right = new TreeNode(val);
      queue.push(currNode.right);
    }
  }
}
