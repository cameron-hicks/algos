/*
Given two sorted linked lists, merge them to create a sorted linked list.
Return the head of the list.
*/

class LLNode {
  value: number;
  next: LLNode | null;

  constructor(val: number) {
    this.value = val;
    this.next = null;
  }

  concat(vals: number[]): this {
    const arr = vals;
    let curr: LLNode = this;

    while (arr.length) {
      curr.next = new LLNode(arr.shift()!);
      curr = curr.next;
    }

    return this;
  }
}

const mergeToLinkedList = (a: LLNode, b: LLNode): LLNode => {
  let head: LLNode;
  let aNode: LLNode | null = a;
  let bNode: LLNode | null = b;

  if (aNode?.value <= bNode?.value) {
    head = aNode;
    aNode = aNode.next;
  } else {
    head = bNode;
    bNode = bNode.next
  }

  let curr: LLNode | null = head;
  while (curr) {
    if (aNode && bNode && aNode.value <= bNode.value) {
      curr.next = aNode;
      aNode = aNode.next;
    } else if (bNode) {
      curr.next = bNode;
      bNode = bNode.next;
    } else if (aNode) {
      curr.next = aNode;
      aNode = aNode.next;
    }

    curr = curr.next;
  }

  return head;
}

const a = new LLNode(1).concat([1, 4, 6, 7]);
const b = new LLNode(2).concat([3, 5, 8]);
// result: [1, 1, 2, 3, 4, 5, 6, 7, 8]

let result: LLNode | null = mergeToLinkedList(a, b);
console.log('result:')
while (!!result) {
  console.log(result.value);
  result = result.next;
}