// BST
/*
Complexity:
  Search, Insert, and Delete: average O(log n), worst case O(n)
*/
class BST {
  constructor(value) {
    this.val = value;
    this.left = null;
    this.right = null;
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
      // however, I think num < undefined = NaN, which evaluates to falsey
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

class RedBlackTree extends BST {
  constructor(val) {
    super(val);
    this.color = 0;
  }

  // self-balancing insertion
  /*
    How to tell if a tree is balanced: difference in height btw left and right subtree <= 1. To find out, add the new leaf at the position where you would typically add it, then call balancedBST on the root. If it returns false, you then call rebalance on the root.
  */
  insert(val) {
    this.add(val);
    if (!this.balancedBST()) {
      this.rebalance();
    }
  }

  rebalance() {}

  // self-balancing deletion
  delete(val) {}
}

// Red-black tree
// wikipedia: https://en.wikipedia.org/wiki/Red%E2%80%93black_tree
/*
What it is:
  A self-balancing BST. Each node stores an extra property representing its "color", red or black, which helps keep the tree balanced during insertions and deletions. This prop takes up only 1 bit of space because it's binary: one color or the other. This makes the RB tree's space complexity basically equivalent to a regular BST. 

  When the tree is modified, you rearrange its nodes and then repaint them to constrain how unbalanced the tree can become in the worst case scenario going forward.

Advantage and use cases:
  — Guaranteed logarithmic worst-case time complexity for all operations. That guarantee  makes them ideal for time-sensitive applications, eg, real-time. It also makes them a good choice as building blocks for other data structures which also provide worst-case guarantees, eg, computational geometry and some Linux stuff. 
  — Underlying data structure of a lot of structures used in functional programming, eg: versions of associative arrays (objects) and sets that preserve information about their previous state during a mutation. 
      — eg, Java's HashMap class used to be handle collisions using LinkedLists, but newer versions of Java replaced that with a red-black tree for faster search within hash buckets (from O(n) to O(log n)).
  
Complexity (worst case):
  Search, Insert, and Delete: O(log n) guaranteed

Variants: 
  — AVL tree: same worst-case guarantee, same red-black colorign, but more balanced than RB trees because they guarantee a shorter worst-case height. This means they're usually (average case) faster than RB trees.

Methods:
  — Read-only methods (eg search, contains) are the same as BSTs.
  — Write operations (eg insert, delete) require rebalancing using 2 tree rotations for insert and 3 for delete. However, the time is still O(log n).
*/

// B-tree
// wikipedia: https://en.wikipedia.org/wiki/B-tree
/*
What it is:
  A generalization of the BST that allows more than two children per node. It is self-balancing, maintains sorted order, and allows search, access, insertion, and deletion in O(log n). 

What it's used for:
  Storage systems that read and write data in large blocks, eg, disks. Used for databases and filesystems.

Advantages: 
  — Keeps keys in sorted order so they can be traversed in-order. (BSTs do not keep keys in sorted order.)
  — Implementations use a self-balancing indexing system to group nodes together in blocks for fewer disk reads per search, and the blocks are kept partially full for faster insertion and deletion.

Variants:
  — B-trees are similar to red-black trees, and similar algorithms can be applied to both.
*/

// B+ tree
// wikipedia: https://en.wikipedia.org/wiki/B%2B_tree
// visualize basic methods: https://www.cs.usfca.edu/~galles/visualization/BPlusTree.html
/*
What it is:
  A tree with a variable (but usually large) number of children per node. Similar to a B-tree, except each node contains only keys (whereas a B-tree contains key-value pairs in its nodes). Also, the leaves on the bottom level are linked to each other in a linked list to allow faster in-order search.

  Another advantage of a B+ tree is that their keys can be compressed using delta encoding or other approaches to save space. This is ueful for storing data in RAM.

  B+ trees can store more keys per internal node (= more children) compared to a B-tree, provided both are the same height. But B+trees tend to be shorter than B-trees (b/c more children per node); this plus the linked list on the leaf level makes B+trees faster at accessing records.

  B+ trees have a quality called their order, or branching factor (b). This is the max # of children an internal node can have. The actual # of children a node has in practice (m) will be less than b, but never less than half of b: 1/2*b <= m <= b. Eg, if the order of a B+ tree is 7, each internal node (ie, not the root or a leaf) may have from 4 through 7 children. (The root can have as few as 2 or as many as b children.)

  Each node can contain multiple keys. The root may have from 1 to b-1 keys; a leaf node may have from 1/2b to b keys. Leaves don't have children; their keys point to data records (values). There's a relationship between keys and children: the keys are the keys of data records, but each key is represented redundantly on multiple nodes, because each node represents a subinterval of all the keys from the entire tree. Ie, the root node will contain as many as b-1 keys which point to b-1 subintervals; each of those subintervals is represented by a separate child (an internal node), which in turn breaks its interval down into further subintervals, until finally at the leaves each interval is one key long, so the keys point to their values instead of to further subintervals/nodes.
  
  To reiterate, what makes B+ trees unique is that all the tree's data is stored in the leaf nodes, and that there are a large number of redundant pointers pointing to each data value. (Compare that to a BST, where the tree's data is stored across all nodes.)

What it's used for:
  1. Filesystems. It makes retrieval more efficient in a block-oriented storage context, eg RAM. What makes them better for filesystems than BSTs is that they have "high fanout", which means there's a lot of pointers to each child node (typically 100+ pointers). This reduces the number of I/O operations required to find a specific node. (Ie, search is fast.)
  2. Databases. Some relational DBMSes (eg, Oracle, SQLite) use B+ trees for table indices so they can search for specific tables more quickly.Some key-value non-relational DBMSes (eg CouchDB) use this tree for data access.

Time complexities (worst / average):
  Search: O(log n + log L) / O(log n)
  Insert: O(M * log n + log L) / O(log n)
  Delete: O(M * log n + log L) / O(log n)
  --> where n = # of key-value pairs to represent on the tree, L = # of levels (height of tree), and M = the actual (or max?) # of children per internal node

IMPLEMENTATION
instructions: https://www.guru99.com/introduction-b-plus-tree.html#5
Insertion:
  Add the new key to the right leaf by traversing depth-first, asking at each step whether to go right or left based on a numerical > or < comparison.
Rebalancing:
  If adding a key to a leaf would overflow the leaf's capacity, add a new leaf and make sure to add a key to the parent that points to that leaf. If adding a new leaf & key would overflow the parent's capacity, split the parent into two separate nodes and divide the children between them, adjusting pointers accordingly. Do this logic recursively up the tree all the way to the node; if adding more children one level below the node (= adding more keys to the root) would overflow the root's capacity, insert a new level between root and level 1 that contains two nodes.
*/

module.exports = { BST, BinaryHeap, RedBlackTree };
