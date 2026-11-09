function leftChildIndex(index: number): number {
    return 2 * index + 1;
}

function rightChildIndex(index: number): number {
    return 2 * index + 2;
}

function parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
}

/**
 * Given an integer array nums and an integer k, return the kth largest element in the array.

Note that it is the kth largest element in the sorted order, not the kth distinct element.

Can you solve it without sorting?

Example 1:

Input: nums = [3,2,1,5,6,4], k = 2
Output: 5
Example 2:

Input: nums = [3,2,3,1,2,4,5,5,6], k = 4
Output: 4

 * Strategy:
You COULD solve this with a max heap, removing the root node k times to get the kth largest element. HOWEVER, using a min heap lets you use less space complexity: The kth largest element is the smallest element in an array containing the k largest elements. This makes the space complexity O(K) instead of O(N). 

Time complexity: O(nlogk). The time complexity of adding or removing a node from a heap is logarithmic to the size of the heap; you can constrain the size of the heap to the value of k rather than the length of the array; and while building the heap, you have to add/remove to the heap for every item in the original array.

Heaps can be represented as (unsorted) arrays where the array index reflects the position of the node in the tree. A parent node and its children are placed in the array at predictable indices:

parentIndex(i) = Math.floor((i - 1) / 2)
leftChildIndex(i) = 2 * i + 1
rightChildIndex(i) = 2 * i + 2


Properly formed heaps:
- Are complete and left-justified
- A parent is always smaller than its children (in a min heap), but it doesn't matter what order the siblings are in.
 */
function findKthLargest(nums: number[], k: number): number | undefined {
    if (nums.length <= 1) return nums[0];
    const heap: number[] = [];

    function removeMax(): number | undefined {
        if(heap.length <= 1) return heap.shift();

        const min = heap.shift()!;
        const leaf = heap.pop();
        
        // put the last element into the root and bubble it down to re-sort the tree
        if (leaf !== undefined) {
            heap.unshift(leaf);
            bubbleDown(0);
        }

        return min;
    }
    
    function add(num: number): void {
        heap.push(num);
        bubbleUp(heap.length - 1);
    }
    
    // As long as the node is larger than its parent, swap it with its parent.
    function bubbleUp(childInd: number): void {
        const child = heap[childInd];
        const parentInd = parentIndex(childInd);
        const parent = heap[parentInd];

        if (parent != undefined && child > parent) {
            heap[childInd] = parent;
            heap[parentInd] = child;

            bubbleUp(parentInd);
        }
    }
    
    // As long as the node is smaller than its children, swap it with the largest of its children.
    function bubbleDown(parentInd: number): void {
        const num = heap[parentInd];

        const leftInd = leftChildIndex(parentInd);
        const left = heap[leftInd];
        const rightInd = rightChildIndex(parentInd);
        const right = heap[rightInd];

        if ((left !== undefined || right !== undefined) && (num < left || num < right)) {
            const largestChildInd = left > (right ?? -Infinity) ? leftInd : rightInd;

            heap[parentInd] = heap[largestChildInd];
            heap[largestChildInd] = num;

            bubbleDown(largestChildInd);
        }
    }

    // Build the heap, always keeping the total size to k elements.
    // We only need the k largest elements we've seen so far.
    for(let i = 0; i < nums.length; i++) {
        add(nums[i]);

        // if adding this node has made the heap larger than k,
        // we can safely truncate the leaf, as it's been re-sorted.
        // this constrains the space complexity; however, I'm
        // cutting it out bc I can't figure out how to make it work. 
        // bc siblings are unsorted relative to each other, this ended 
        // up chopping off the, eg, 2nd and third largest items.
        // if (heap.length > k) heap.pop();
    }
    console.log('heap after building', heap);

    for(let i = 0; i < k - 1; i++) {
        removeMax();
    }

    return removeMax();
};

// console.log('answer is 5');
// console.log([3,2,1,5,6,4], 2);
// console.log('answer: ', findKthLargest([3,2,1,5,6,4], 2));

// console.log('answer is 9999');
// console.log([0,1,2,3,4,5,9999], 1); 
// console.log('answer: ', findKthLargest([0,1,2,3,4,5,9999], 1));
console.log('answer is 3: ', findKthLargest([5,2,4,1,3,6,0], 4));

// console.log('answer is 4');
// console.log([3,2,3,1,2,4,5,5,6], 4);
// console.log('answer: ', findKthLargest([3,2,3,1,2,4,5,5,6], 4));

// const left = undefined;
// const right = 4;
// // @ts-ignore
// console.log(left > (right ?? -Infinity) ? left : right);
