class BST {
  constructor(value) {
    this.val = value;
  }

  add(value) {
    const tree = this;

    if (value > tree.value) {
      return tree.right ? tree.right.add(value) : (tree.right = new BST(value));
    } else {
      return tree.left ? tree.left.add(value) : (tree.left = new BST(value));
    }
  }

  // Return true if the difference between the heights of the left and right subtrees is not greater than 1.
  balancedBST() {
    // TODO
  }

  // Return true if, at each node, this tree's value equals the other tree's value.
  equals(other) {
    // TODO
  }

  // Return true if this is a valid binary search tree.
  valid() {
    // TODO
  }

  // Reverse all the nodes such that at each level, the child that is greater than the parent is on the left, while the child that is less than the parent is on the right.
  reverse() {
    // TODO
  }
}

// TODO: TEST & REFACTOR
class BinaryHeap {
  constructor(type) {
    this.type = type; // 'min' or 'max'
    this.values = [];
  }

  swap(i, j) {
    [this.values[i], this.values[j]] = [this.values[j], this.values[i]];
  }

  insert(value) {
    this.values.push(value);
    let childInd = this.values.length - 1;
    let parentInd = this.indexOfParent(childInd);

    // add a new value then bubble it up until its position makes a valid binary heap
    if (this.type === 'min') {
      // the childInd > 0 check is a way to stop iterating if the new val bubbles up to the root (index 0)
      while (value < this.values[parentInd] && childInd > 0) {
        this.swap(childInd, parentInd);
        childInd = parentInd;
        parentInd = this.indexOfParent(childInd);
      }
    } else {
      while (value > this.values[parentInd] && childInd > 0) {
        this.swap(childInd, parentInd);
        childInd = parentInd;
        parentInd = this.indexOfParent(childInd);
      }
    }
  }

  // Remove the min or max elem, the root of the tree. Take the deepest, rightmost leaf (the last position in the values array) and put it at the root. Then, similar to bubbling up, let the root sink down to its correct position by comparing it iteratively to its children.
  extractRoot(value) {
    const sinkDownMin = () => {
      let parentInd = 0;
      let leftChildInd = this.indexOfLeftChild(0);
      let rightChildInd = leftChildInd + 1;
      let swapChild;

      // the childInd < this.values.length check is a way to stop iterating if the new val sinks down to the bottom
      while (
        (value > this.values[leftChildInd] ||
          value > this.values[rightChildInd]) &&
        leftChildInd < this.values.length &&
        rightChildInd < this.values.length
      ) {
        // identify smallest of the two children
        swapChild =
          this.values[leftChildInd] < this.values[rightChildInd]
            ? leftChildInd
            : rightChildInd;
        // swap the bubbling-down element with its smallest child
        this.swap(swapChild, parentInd);

        parentInd = swapChild;
        leftChildInd = this.indexOfLeftChild(parentInd);
        rightChildInd = leftChildInd + 1;
      }
    };

    const sinkDownMax = () => {
      let parentInd = 0;
      let leftChildInd = this.indexOfLeftChild(0);
      let rightChildInd = leftChildInd + 1;
      let swapChild;

      while (
        (value < this.values[leftChildInd] ||
          value < this.values[rightChildInd]) &&
        leftChildInd < this.values.length &&
        rightChildInd < this.values.length
      ) {
        swapChild =
          this.values[leftChildInd] > this.values[rightChildInd]
            ? leftChildInd
            : rightChildInd;

        this.swap(swapChild, parentInd);
        parentInd = swapChild;
        leftChildInd = this.indexOfLeftChild(parentInd);
        rightChildInd = leftChildInd + 1;
      }
    };

    // TODO: edge case
    // replace root with last leaf
    const root = this.values[0];
    this.values[0] = this.values.pop();
    if (this.values.length <= 1) return root;

    // sink the new root down until its position leaves the binary heap in a valid state
    if (this.type === 'min') {
      sinkDownMin();
    } else {
      sinkDownMax();
    }

    return root;
  }

  // Given the index of a parent node, its children's position in the heap's values array can be easily predicted using the formula 2i + 1. (The right child would be 2i + 2.)
  indexOfLeftChild(parentInd) {
    return 2 * parentInd + 1;
  }

  // Given the index of a child node, its parent's position in the heap's values array can be easily predicted using the formula (i - 1)/2. Math.floor ensures that both left and right children (which will be at even and odd indices, respectively) produce the same parent index.
  indexOfParent(childInd) {
    return Math.floor((childInd - 1) / 2);
  }
}

module.exports = { BST, BinaryHeap };

const maxHeap = new BinaryHeap('max');
maxHeap.insert(41);
maxHeap.insert(39);
maxHeap.insert(33);
maxHeap.insert(18);
maxHeap.insert(27);
maxHeap.insert(12);
maxHeap.insert(55);

const minHeap = new BinaryHeap('min');
minHeap.insert(41);
minHeap.insert(39);
minHeap.insert(33);
minHeap.insert(18);
minHeap.insert(27);
minHeap.insert(12);
minHeap.insert(55);
maxHeap.extractRoot();
minHeap.extractRoot();

// TODO: correct result after extracting root?
// console.log('maxHeap', maxHeap.values); // [ 33, 39, 41, 18, 27, 12 ]
// console.log('minHeap', minHeap.values); // [ 55, 27, 18, 41, 33, 39 ]
