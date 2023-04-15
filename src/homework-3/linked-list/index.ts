type Nullable<T> = T | null;

class LinkedListNode<T> {
  prev: Nullable<LinkedListNode<T>> = null;
  next: Nullable<LinkedListNode<T>> = null;
  value: Nullable<T> = null;

  constructor(value: T) {
    this.prev = null;
    this.next = null;
    this.value = value;
  }
}

class LinkedList<T> implements Iterable<T> {
  first: Nullable<LinkedListNode<T>> = null;
  last: Nullable<LinkedListNode<T>> = null;

  *[Symbol.iterator](): Iterator<T> {
    let current = this.first;

    while (current) {
      yield current.value!;
      current = current.next;
    }
  }

  add(value: T): void {
    const node = new LinkedListNode(value);

    if (!this.first) {
      this.first = node;
      this.last = node;
      this.first.next = this.last;
      this.last.prev = this.first;

      return;
    }

    node.prev = this.last;
    this.last!.next = node;
    this.last = node;
  }
}

const list = new LinkedList<number>();

list.add(1);
list.add(2);
list.add(3);
list.add(4);
list.add(5);
list.add(6);

console.log(list.first!.value); // 1
console.log(list.last!.value); // 6
console.log(list.first!.next!.value); // 2
console.log(list.first!.next!.prev!.value); // 1
console.log(list.last!.prev!.value); // 5
console.log(list.last!.prev!.prev!.value); // 4
console.log(list.last!.prev!.prev!.prev!.value); // 3
console.log(list.last!.prev!.prev!.prev!.prev!.value); // 2
console.log(list.last!.prev!.prev!.prev!.prev!.prev!.value); // 1

for (const value of list) {
  console.log('iteration', value);
}
