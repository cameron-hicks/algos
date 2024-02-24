import { LinkedList } from './class';

// Reverse a linked list.
LinkedList.prototype.reverse = function () {
  let curr = this.head;
  let prev = null;
  let rest = null;

  while (curr) {
    rest = curr.next;
    curr.next = prev;
    prev = curr;
    curr = rest;
  }

  this.head = prev;
  return this;
};

const ll = new LinkedList([1, 2, 3, 4, 5]);
ll.print();
ll.reverse().print();
