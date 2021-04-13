function mergeSortDesc(arr) {
  if (arr.length <= 1) return arr;

  const result = [];
  const mid = Math.floor(arr.length / 2);
  console.log('arr', arr, 'mid index', mid);

  const left = mergeSortDesc(arr.slice(0, mid));
  const right = mergeSortDesc(arr.slice(mid, arr.length));

  // compare and merge the partitions
  while (left.length && right.length) {
    if (left[0] > right[0]) {
      result.push(left.shift());
    } else {
      result.push(right.shift());
    }
  }
  // empty whichever partition still contains elements
  // if (left.length) {
  //   result.concat(left);
  // } else result.concat(right);

  return result;
}

// console.log(mergeSortDesc([4, 2, 5, 1, 6])); // [6, 5, 4, 2, 1]
const east = [0, -1];
const west = [0, 1];
const north = [1, 0];
const south = [-1, 0];
const startingPosition = [0, 0];

function doesCircleExist(commands) {
  const startingDirection = north;
  const output = [];

  for (let j = 0; j < commands.length; j++) {
    const sequence = commands[j];
    if (!sequence.includes('G')) {
      output.push('YES');
    } else {
      const position = startingPosition;
      let direction = startingDirection;

      console.log('sequence', sequence);
      let comm;
      for (let i = 0; i < sequence.length; i++) {
        console.log('position:', position, 'direction:', direction);
        comm = sequence[i];
        if (comm === 'G') {
          position[0] += direction[0];
          position[1] += direction[1];
          console.log('Moved to position:', position);
        } else if (comm === 'L') {
          switch (direction) {
          case north:
              direction = west;
              break;
            case east:
              direction = north;
              break;
            case south:
              direction = east;
            break;
            case west:
              direction = south;
              break;
          }
          console.log('Changed direction to:', direction);
        } else if (comm === 'R') {
          switch (direction) {
          case north:
              direction = east;
            break;
            case east:
              direction = south;
              break;
            case south:
            direction = west;
              break;
            case west:
              direction = north;
              break;
          }
          console.log('Changed direction to:', direction);
        }
      }

      console.log(
        'Sequence:',
        sequence,
        'position',
        startingPosition,
        position,
        'direction',
        startingDirection,
        direction,
      );

      if (position === startingPosition && direction === startingDirection) {
        console.log('Outputting YES for sequence', sequence);
        output.push('YES');
      } else {
        // if (position !== startingPosition && direction !== startingDirection) {
        console.log('Outputting NO for sequence', sequence);
        output.push('NO');
        // }
      }
    }
  }

  return output;
}
