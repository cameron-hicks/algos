import { Tree } from './class';

/*
Maximum Depth of Binary Tree
*/

const maxDepth = function (root) {
  let max = 0;
  let currNode = root;
  // TODO: do this recursively on each node instead
  while (currNode.left) {
    currNode = currNode.left;
    max++;
  }
};

const tree = new Tree([1, 2, 3, 4, 5, 6]);
