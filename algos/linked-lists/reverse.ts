import { LinkedList, LinkedListNode } from './class';

// Reverse a linked list.
// Iterative
LinkedList.prototype.reverse = function () {
  let curr: LinkedListNode | null = this.head;
  let prev: LinkedListNode | null = null;
  let rest: LinkedListNode | null = null;

  while (curr) {
    rest = curr.next;
    curr.next = prev;
    
    prev = curr;
    curr = rest;
  }

  this.head = prev;
  return this;
};

let ll = new LinkedList([1, 2, 3, 4, 5]);
ll.print();
ll.reverse().print();


// Reverse a linked list.
// Recursive
LinkedListNode.prototype.reverseRecursive = function () {
  const rest: LinkedListNode | null = this.next;
  if (!rest) return this;

  rest.reverseRecursive();
  rest.next = this;
  this.next = null;

  return this;
}

const ll = new LinkedList([1, 2, 3, 4, 5]);
ll.print();
const head: LinkedListNode = ll.head;

// set a pointer to the tail of the list
let currNode: LinkedListNode | null = head;
while (currNode.next) {
  currNode = currNode.next;
}

head.reverseRecursive();

// print, starting from the tail
while (currNode) {
  console.log(currNode.val);
  currNode = currNode.next;
}