import { LinkedList } from '../../shared/classes';
import { Nullable } from '../../shared/models';

class Dequeue {
  private linkedList = new LinkedList<number>();

  push(value: number): void {
    this.linkedList.addLast(value);
  }

  pop(): Nullable<number> {
    return this.linkedList.removeLast().value;
  }

  unshift(value: number): void {
    return this.linkedList.addFirst(value);
  }

  shift(): Nullable<number> {
    return this.linkedList.removeFirst().value;
  }
}

const dequeue = new Dequeue();

dequeue.push(10);
dequeue.unshift(11);
dequeue.push(12);

console.log(dequeue.pop()); // 12
console.log(dequeue.shift()); // 11
console.log(dequeue.pop()); // 10
console.log(dequeue.pop()); // Exception
