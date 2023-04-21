import { Nullable } from '../models';

export class LinkedListNode<T> {
  prev: Nullable<LinkedListNode<T>> = null;
  next: Nullable<LinkedListNode<T>> = null;

  constructor(readonly value: T) {}
}

export class LinkedList<T> implements Iterable<T> {
  first: Nullable<LinkedListNode<T>> = null;
  last: Nullable<LinkedListNode<T>> = null;

  *[Symbol.iterator](): Iterator<T> {
    let current = this.first;

    while (current) {
      yield current.value!;
      current = current.next;
    }
  }

  addFirst(value: T): void {
    const node = new LinkedListNode(value);

    if (!this.first) {
      this.first = node;
      this.last = node;

      return;
    }

    node.next = this.first;
    this.first!.prev = node;
    this.first = node;
  }

  addLast(value: T): void {
    const node = new LinkedListNode(value);

    if (!this.last) {
      this.first = node;
      this.last = node;

      return;
    }

    node.prev = this.last;
    this.last!.next = node;
    this.last = node;
  }

  removeFirst(): LinkedListNode<T> {
    if (!this.first) throw new Error('You have no items to delete');

    const first = this.first;

    if (!this.first.next) {
      this.first = null;

      return first;
    }

    this.first.next.prev = null;
    this.first = this.first.next;

    return first;
  }

  removeLast(): LinkedListNode<T> {
    if (!this.last) throw new Error('You have no items to delete');

    const last = this.last;

    if (!this.last.prev) {
      this.last = null;

      return last;
    }

    this.last.prev!.next = null;
    this.last = this.last.prev;

    return last;
  }
}
