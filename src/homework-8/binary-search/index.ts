function bisecLeft<T>(array: T[], comparator: (value: T) => number): number {
  let startIdx = 0;
  let endIdx = array.length;

  if (startIdx <= endIdx) {
    const mid = Math.floor((startIdx + endIdx) / 2);
    const compValue = comparator(array[mid]);

    if (compValue === 0) {
      return mid;
    } else if (compValue < 0) {
      startIdx = mid + 1;
    } else {
      endIdx = mid - 1;
    }
  }

  return -1;
}

console.log(bisecLeft([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)); // 6

function bisecRight<T>(array: T[], comparator: (value: T) => number): number {
  let startIdx = 0;
  let endIdx = array.length;
  let index = -1;

  while (startIdx <= endIdx) {
    const mid = Math.floor((startIdx + endIdx) / 2);
    const compValue = comparator(array[mid]);

    if (compValue > 0) {
      endIdx = mid - 1;
    } else if (compValue <= 0) {
      index = mid;
      startIdx = mid + 1;
    }
  }

  return index;
}

console.log(bisecRight([1, 2, 3, 4, 5, 6, 7, 7, 7, 7, 8, 9], (el) => el - 7)); // 9
