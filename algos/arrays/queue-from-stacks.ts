/*
https://www.hackerrank.com/challenges/queue-using-two-stacks/problem

Implement a queue using two stacks. It should have methods to enqueue, dequeue, and print the element that is at the front of the queue.

Then process a series of queries, where each query is one of the following methods:

1: Enqueue a value 
2: Dequeue the first value
3: Print the element at the front of the queue.

The queries will be inputted as an array of string instructions.

Sample input: [
  'enqueue 42',
  'dequeue',
  'enqueue 14',
  'print',
  'enqueue 28',
  'print',
  'enqueue 60',
  'dequeue',
  'print'
]

Expected output to console:
'14'
'28'
'28'
*/

class MyStack extends Array {
  sorted: boolean = false;
}

class MyQueue {
  stackOne: MyStack
  stackTwo: MyStack

  constructor() {
    this.stackOne = new MyStack();
    this.stackTwo = new MyStack();
  }

  enqueue(value: any) {
    // both stacks empty
    if (!this.stackOne.length && !this.stackTwo.length) {
      this.stackOne.push(value);
      return;
    }

    // both stacks are NOT sorted
    // one is guaranteed to be empty
    if (!this.stackOne.sorted && !this.stackTwo.sorted) {
      if (this.stackOne.length) {
        this.stackOne.push(value);
        return;
      } else {
        this.stackTwo.push(value);
        return;
      }
    }

    // one of the stacks is sorted
    // push into whichever stack is NOT sorted (may be empty)
    if (this.stackOne.sorted) {
      this.stackTwo.push(value);
    } else {
      this.stackOne.push(value);
    }
  }

  dequeue() {
    // one of the stacks is sorted
    if (this.stackOne.sorted || this.stackTwo.sorted) {
      if (this.stackOne.sorted) {
        this.stackOne.pop();
        if (!this.stackOne.length) {
          this.stackOne.sorted = false;
        }
      }
      else {
        this.stackTwo.pop();
        if (!this.stackTwo.length) {
          this.stackTwo.sorted = false;
        }
      }

      return;
    }

    // both stacks are NOT sorted
    // one is guaranteed to be empty
    this.sort();
    this.dequeue();
  }

  sort() {
    let emptyStack, filledStack;
    if (!this.stackOne.length) {
      emptyStack = this.stackOne;
      filledStack = this.stackTwo;
    } else {
      emptyStack = this.stackTwo;
      filledStack = this.stackOne;
    }

    while(filledStack.length) {
      emptyStack.push(filledStack.pop());
    }

    emptyStack.sorted = true;
    filledStack.sorted = false;
  }

  print() {
    // one of the stacks is sorted
    if (this.stackOne.sorted || this.stackTwo.sorted) {
      if (this.stackOne.sorted) {
        console.log(this.stackOne[this.stackOne.length -1]);
      }
      else {
        console.log(this.stackTwo[this.stackTwo.length - 1]);
      }

      return;
    }

    // both stacks are NOT sorted
    // one is guaranteed to be empty
    this.sort();
    this.print();
  }

  readInstructions(str: string) {
    if (str.includes(' ')) {
      const value = str.split(' ')[1];
      this.enqueue(value);
    } else {
      this[str]();
    }
  }
}

const instructions = [
  'enqueue 42',
  'dequeue',
  'enqueue 14',
  'print',
  'enqueue 28',
  'print',
  'enqueue 60',
  'dequeue',
  'print'
];

const queue = new MyQueue();
instructions.forEach((string) => {
  queue.readInstructions(string);
});


/*
stackOne = []
stackTwo = []

--> enqueue 1

both stacks have length = 0, so just pick one and push into it
stackOne.push(1)

stackOne = [1]
stackTwo = []

--> enqueue 2

push into whichever stack has length > 0

stackOne = [1, 2]
stackTwo = []

--> dequeue

while (stackOne.length > 1) {
stackTwo.push(stackOne.pop())

stackOne = [1]
stackTwo = [2]
}

stackOne.pop() --> 1

stackOne = []
stackTwo = [2]

--> enqueue 3

neither stack is sorted, so
push into whichever stack has length > 0

stackOne = []
stackTwo = [2, 3]

--> enqueue 4
stackOne = []
stackTwo = [2, 3, 4]

--> enqueue 5

stackOne = []
stackTwo = [2, 3, 4, 5]

--> dequeue

stackOne.push(stackTwo.pop());
stackOne = [5]
stackTwo = [2, 3, 4]

stackOne.push(stackTwo.pop());
stackOne = [5, 4]
stackTwo = [2, 3]

stackOne.push(stackTwo.pop());
stackOne = [5, 4, 3]
stackTwo = [2]

stackTwo.pop(); --> 2
stackOne = [5, 4, 3]
stackTwo = []

--> dequeue

no need to iterate; first-pushed element is already poppable

stackOne.pop(); --> 3
stackOne = [5, 4]
stackTwo = []

--> enqueue 6

stackOne is already sorted, so push into stackTwo instead

stackOne = [5, 4]
stackTwo = [6]

--> dequeue

stackOne is sorted, so we can just pop, no iterating needed
stackOne.pop() --> 4

stackOne = [5]
stackTwo = [6]

--> enqueue

stackOne is sorted, stackTwo is not. Push into the unsorted stack.

stackOne = [5]
stackTwo = [6, 7]

--> dequeue

stackOne.pop() --> 5

stackOne = []
stackTwo = [6, 7]

--> dequeue

one stack is empty and one is unsorted, so iterate.
while (stackTwo.length > 1) {
stackOne.push(stackTwo.pop())

stackOne = [7]
stackTwo = [6]

stackOne = [7, 6]
stackTwo = []
}

now stackOne is sorted, so we know we can just pop:
stackOne.pop() --> 6

*/