import { Tree, TreeNode } from './class';

/*
Maximum Depth of Binary Tree
*/

const maxDepth = (root: TreeNode | null): number => {
  if (!root) return 0;

  const leftMax = maxDepth(root.left);
  const rightMax = maxDepth(root.right);

  return 1 + Math.max(leftMax, rightMax);
};

/*
     1
  2     3
4  5   6

depth: 3

    1
  2   3

depth: 2
*/
// const tree = new Tree([1, 2, 3]);
const tree = new Tree([1, 2, 3, 4, 5, 6]);
console.log(maxDepth(tree.root));
