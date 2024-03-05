/*
Given the head node of a linked list, return true if the list contains a cycle and false if not. The list is NOT guaranteed to contain unique values, so you will need a way to remember if you've visited a node before.
*/

class LLNodeExt {
  // basically an array index
  position: number = 0;
  value: number | string;
  next: LLNodeExt | null;

  constructor(val: LLNodeExt['value']) {
    this.value = val;
    this.next = null;
  }

}

// Brute force: Iterate over the list, adding visted nodes to a hash (using something other than their value). 
// time and space: O(n)
const cycleDetectionBrute = (head: LLNodeExt): boolean => {
  const visited = {};
  let currNode: LLNodeExt = head;

  while (currNode) {
    if (visited[currNode.position]) {
      return true;
    } else {
      visited[currNode.position] = true;
      currNode = currNode.next;
    }
  }

  return false;
}


// Floyd's Algorithm: Use two pointers, one that jumps 1 node at a time ("slow") and another that jumps 2 nodes at a time ("fast").
// Think of it like a car race: In a drag race, which is in a straight line, the faster car will never be in the same position as the slower car no matter how far they drive. In Nascar, which is in a circle, the faster car will eventually lap the slower car if they drive for long enough.
// https://www.youtube.com/watch?v=gBTe7lFR3vc
// O(n) time and constant space
const cycleDetectionFloyds = (head: LLNodeExt): boolean => {
  let slowNode = head;
  let fastNode = head;

  // if you can reach a null tail by stepping through the list, you know for sure the list is not cyclic.
  while (fastNode.next && fastNode.next.next) {
    // step the pointers first so it doesn't false-positive on position = 0
    slowNode = slowNode.next;
    fastNode = fastNode.next.next;

    if (slowNode.position == fastNode.position) {
      return true;
    }
  }

  return false;
};

/*

a -- b -- c
     \   /
      d

*/

const a = new LLNodeExt('a');
const b = new LLNodeExt('b');
const c = new LLNodeExt('c');
const d = new LLNodeExt('d');

a.position = 0;
a.next = b;
b.position = 1;
b.next = c;
c.position = 2;
c.next = d;
d.position = 3;
d.next = b;

console.log(cycleDetectionFloyds(a));
// --> true

d.next = null;
console.log(cycleDetectionFloyds(a));
// --> false

export {};