/*
Breadth-first search

Working with one level of a tree at a time, call a callback on all the nodes in that level of the tree, then progress to the next level down. Start by emitting at the top of the tree first.
*/

import { TreeNode } from "../class";

// O(n)
const breadthFirstSearch = (node: TreeNode | undefined, cb: (node: TreeNode) => void) => {
  const frontier = [node];
  const visited = [];

  while (frontier.length) {
    const currNode = frontier.shift();
    frontier.push(...currNode.children);
    visited.push(currNode);
  }

  while (visited.length) {
    const currNode = visited.shift();
    cb(currNode);
  }
};

/*
If you wanted to emit for the bottom layer first, you'd use a stack instead of a queue for the visited collection.
*/

const one: TreeNode = new TreeNode(1);
const two = new TreeNode(2);
const three = new TreeNode(3);
const four = new TreeNode(4);
one.children = [two, three, four];
two.children = [new TreeNode(5)];
const six = new TreeNode(6);
const seven = new TreeNode(7);
two.children.push(six, seven);
six.children = [new TreeNode(12)];
seven.children = [new TreeNode(13), new TreeNode(14)];
three.children = [new TreeNode(8), new TreeNode(9)];
const ten = new TreeNode(10);
three.children.push(ten);
ten.children = [new TreeNode(15)];
four.children = [new TreeNode(11)];

const callback = (node: TreeNode): void => {
  console.log(node.value);
};

breadthFirstSearch(one, callback);

/*
                  1
    2             3            4 
5  6   7      8   9  10       11
  12  13 14          15
*/