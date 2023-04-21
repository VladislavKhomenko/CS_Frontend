import { LinkedList } from '../../shared/classes';
import { Nullable } from '../../shared/models';

class Queue {
  private linkedList = new LinkedList<number>();

  get head(): Nullable<number> {
    return this.linkedList.first ? this.linkedList.first?.value : null;
  }

  push(value: number): void {
    this.linkedList.addLast(value);
  }

  pop(): Nullable<number> {
    return this.linkedList.removeFirst().value;
  }
}

const queue = new Queue();

queue.push(10);
queue.push(11);
queue.push(12);

console.log(queue.head); // 10

console.log(queue.pop()); // 10

console.log(queue.head); // 11

console.log(queue.pop()); // 11
console.log(queue.pop()); // 12
console.log(queue.pop()); // Exception
