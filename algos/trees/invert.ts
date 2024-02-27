/*
Invert a Binary Tree

At each level of the tree, swap which node is on the right and which is on the left.
*/

import { Tree, TreeNode } from './class';

const invert = (root: TreeNode): TreeNode => {
  if (!root) return null;

  const temp = root.left;
  root.left = invert(root.right);
  root.right = invert(temp);
  return root;
}

/*
before:

     1
  2     3
4  5   6  null

after:

      1
  3       2
null 6   5  4
*/

const tree = new Tree([1, 2, 3, 4, 5, 6]);
const inverted = invert(tree.root);
// debugger;