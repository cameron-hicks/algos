/*
Implement a min heap (aka priority queue). A min heap allows you to add elements to a tree but always ensure that you will be able to remove the minimum element in O(1) time. We do this using a complete binary tree and balancing the tree each time we add a new element. It is often represented as an array of nodes, where the minimum node is at index 0.

For any ith node, i.e., Arr[i]:
Arr[(i -1) / 2] returns its parent node. (Index of the node is i + 0)
Arr[(2 * i) + 1] returns its left child node. (Index of its left child is 2i + 1)
Arr[(2 * i) + 2] returns its right child node. (Index of its right child is 2i + 2)
Working backwards from a child node at index j, this means the parent node would be at Math.floor(((j - 1)/2)). B/c of rounding down, works for both left and right child.

[0, 1, 2, 3, 4, 5, 6, 7]

            0
    1                2
 3    4           5    6
7    


Methods:

Heapify: create a heap from an array.
Insertion: insert an element into an existing heap in O(log N). (For empty heaps, insertion is O(1).)
Deletion: remove the top element of the heap in O(1), then organize the heap in O(log N).
Peek: return the top element of the heap (without removing it) in O(1).

Helper methods:

The heapifyDown() method maintains the heap structure when an element is deleted.
The heapifyUp() method maintains the heap structure when an element is added to the heap. 
swap() interchanges value at two nodes
*/

export class MinHeap<T> {
  heap: T[] = [];

  construct() {
    this.heap = [];
  }

  empty(): boolean {
    return this.heap.length == 0;
  }

  leftChildIdx(parentIdx: number) {
    return 2 * parentIdx + 1;
  }

  rightChildIdx(parentIdx: number) {
    return 2 * parentIdx + 2;
  }

  parentIdx(childIdx: number) {
    return Math.floor(((childIdx - 1)/2));
  }

  hasLeftChild(parentIdx: number) {
    return this.leftChildIdx(parentIdx) < this.heap.length;
  }

  hasRightChild(parentIdx: number) {
    return this.rightChildIdx(parentIdx) < this.heap.length;
  }

  hasParent(childIdx: number) {
    return this.parentIdx(childIdx) >= 0;
  }

  leftChild(parentIdx: number) {
    return this.heap[this.leftChildIdx(parentIdx)];
  }

  rightChild(parentIdx: number) {
    return this.heap[this.rightChildIdx(parentIdx)];
  }

  parent(childIdx: number) {
    return this.heap[this.parentIdx(childIdx)];
  }

  swap(i: number, j: number) {
    const temp = this.heap[i];
    this.heap[i] = this.heap[j];
    this.heap[j] = temp;
  }

  remove(): MinHeap<T>['heap'][0] {
    if (!this.heap.length) return;

    const item = this.heap[0];

    // copy the last item in the priority queue up to the front
    this.heap[0] = this.heap[this.heap.length - 1];
    // remove duplicate
    this.heap.pop();
    this.heapifyDown();
    
    return item;
  }
  
  // rebalance by bubbling the previously-last item back down to the bottom
  // will require swapping the other children around as well to keep the tree complete
  heapifyDown() {
    let i = 0;

    while (this.hasLeftChild(i)) {
      let smallerChildIdx = this.leftChildIdx(i);

      if (this.hasRightChild(i) && this.rightChild(i) < this.leftChild(i)) {
        smallerChildIdx = this.rightChildIdx(i);
      }

      // curr item belongs as parent of smallerChild
      if (this.heap[i] < this.heap[smallerChildIdx]) {
        // the item has bubbled down to its sorted position; you're done
        break;  
      } else {
        this.swap(i, smallerChildIdx);

        // increment the index to the new position the item is in now, 
        // now that it's swapped with its child.
        i = smallerChildIdx;
      }
    }
  }

  add(item: any) {
    // add it to the end of the queue
    this.heap.push(item);
    this.heapifyUp();
  }
  
  // rebalance by bubbling the new item as far up as it belongs
  heapifyUp() {
    let i = this.heap.length - 1;
    while (this.hasParent(i) && this.parent(i) > this.heap[i]) {
      this.swap(this.parentIdx(i), i);

      // decrement index to the new position the item is in now,
      // now that it's swapped with its parent.
      i = this.parentIdx(i);
    }

  }
}