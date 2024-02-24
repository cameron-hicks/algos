class LinkedListNode {
  val: number | string;
  next: LinkedListNode | null;

  constructor(value: LinkedListNode['val']) {
    this.val = value;
    this.next = null;
  }
}

export class LinkedList {
  head: LinkedListNode | null;

  constructor(node_vals: (number | string)[]) {
    const head_value = node_vals.shift();
    if (!head_value) {
      throw new Error();
    }
    
    let curr = new LinkedListNode(head_value);
    this.head = curr;

    while (node_vals.length) {
      const next = new LinkedListNode(node_vals.shift()!);
      curr.next = next;
      curr = next;
    }
  }

  print () {
    let curr: LinkedListNode | null = this.head;
    const arr: (string | number)[] = [];
  
    while (curr) {
      arr.push(curr.val);
      curr = curr.next;
    }
  
    console.log(arr);
  };

  reverse () {
    return this;
  };
}