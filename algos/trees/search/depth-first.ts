/*
Traverse to the bottom nodes of each branch then backtrack, calling a passed-in callback on the value of each node.
*/

import { TreeNode } from "../class";

const depthFirstSearch = (node: TreeNode | undefined, cb: (node: TreeNode) => void) => {
  if (!node) return;

  node.children.forEach((node) => depthFirstSearch(node, cb));
  cb(node); 
}

const callback = (node: TreeNode): void => {
  console.log(node.value);
};

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

depthFirstSearch(one, callback);

/*
                  1
    2             3            4 
5  6   7      8   9  10       11
  12  13 14          15
*/