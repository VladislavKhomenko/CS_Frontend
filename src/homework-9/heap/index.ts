class Heap<T> {
  #buffer: T[] = [];

  constructor(array?: T[]) {
    if (array) this.#buffer = this.#buildHeap(array);
  }

  get size(): number {
    return this.#buffer.length - 1;
  }

  get buffer(): T[] {
    return this.#buffer;
  }

  sort(comparator?: (a: T, b: T) => boolean): T[] {
    for (let i = this.size; i >= 0; i--) {
      this.#swap(0, i);
      this.#siftDown(0, i - 1, comparator);
    }

    return this.buffer;
  }

  insert(value: T): void {
    this.#buffer.push(value);
    this.#siftUp();
  }

  remove(): T | undefined {
    if (!this.size) return undefined;

    this.#swap(0, this.size);
    const valueToRemove = this.#buffer.pop();
    this.#siftDown();

    return valueToRemove;
  }

  #buildHeap(buffer: T[], comparator?: (a: T, b: T) => boolean): T[] {
    this.#buffer = buffer;

    const parentIndex = this.#getParentIdx(this.size);

    for (let currentIdx = parentIndex; currentIdx >= 0; currentIdx--) {
      this.#siftDown(currentIdx, this.size, comparator);
    }

    return this.#buffer;
  }

  #siftUp(): void {
    let currentIdx = this.size;

    while (this.#hasParent(currentIdx) && this.#buffer[currentIdx] < this.#getParent(currentIdx)) {
      const parentIdx = this.#getParentIdx(currentIdx);
      this.#swap(parentIdx, currentIdx);
      currentIdx = parentIdx;
    }
  }

  #siftDown(currentIdx = 0, endIdx?: number, comparator = (a: T, b: T) => a < b): void {
    while (this.#hasLeftChild(currentIdx, endIdx)) {
      let smallestIdx = this.#getLeftChildIdx(currentIdx);

      if (
        this.#hasRightChild(currentIdx, endIdx) &&
        comparator(this.#getRightChild(currentIdx), this.#getLeftChild(currentIdx))
      ) {
        smallestIdx = this.#getRightChildIdx(currentIdx);
      }

      if (comparator(this.#buffer[currentIdx], this.#buffer[smallestIdx])) {
        return;
      } else {
        this.#swap(currentIdx, smallestIdx);
        currentIdx = smallestIdx;
      }
    }
  }

  #hasParent(idx: number): boolean {
    return !!this.#buffer[this.#getParentIdx(idx)];
  }

  #getParent(idx: number): T {
    return this.#buffer[this.#getParentIdx(idx)];
  }

  #hasLeftChild(idx: number, size = this.size): boolean {
    return this.#getLeftChildIdx(idx) <= size;
  }

  #hasRightChild(idx: number, size = this.size): boolean {
    return this.#getRightChildIdx(idx) <= size;
  }

  #getRightChild(idx: number): T {
    return this.#buffer[this.#getRightChildIdx(idx)];
  }

  #getLeftChild(idx: number): T {
    return this.#buffer[this.#getLeftChildIdx(idx)];
  }

  #getRightChildIdx(idx: number): number {
    return 2 * idx + 2;
  }

  #getLeftChildIdx(idx: number): number {
    return 2 * idx + 1;
  }

  #getParentIdx(idx: number): number {
    return Math.floor((idx - 1) / 2);
  }

  #swap(parentIdx: number, idx: number): void {
    [this.#buffer[parentIdx], this.#buffer[idx]] = [this.#buffer[idx], this.#buffer[parentIdx]];
  }
}

const heap = new Heap<number>();

heap.insert(32);
heap.insert(36);
heap.insert(-5);
heap.insert(12);
heap.insert(88);
heap.insert(2);
heap.insert(4);

console.log(heap.buffer); // [-5, 12, 2, 36, 88, 32, 4]

//         -5
//       /     \
//      12      2
//     /  \    /  \
//    36  88  32   4

heap.remove();

console.log(heap.buffer); // [2, 12, 4, 36, 88, 32]

//          2
//       /     \
//      12      4
//     /  \    /
//    36  88  32

console.log(heap.sort((a: number, b: number) => a < b)); // [88, 36, 32, 12, 4, 2];
console.log(heap.sort((a: number, b: number) => a > b)); // [2, 4, 12, 32, 36, 88];
