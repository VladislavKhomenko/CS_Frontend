import { LinkedList } from '../../shared/classes';

const list = new LinkedList<number>();

list.addFirst(1);
list.addFirst(2);
list.addFirst(3);
list.addFirst(4);
list.addFirst(5);
list.addFirst(6);

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
