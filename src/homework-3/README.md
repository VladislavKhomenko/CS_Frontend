# ДЗ к лекции База#3

## Посмотреть лекции на канале AlekOS

- [Вся правда о массивах](https://www.youtube.com/watch?v=47_LhSf-ago)

- [Про сложность алгоритмов](https://www.youtube.com/watch?v=cXCuXNwzdfY)

## Реализовать двусторонний двусвязный список

```js
const list = LinkedList();

list.add(1);
list.add(2);
list.add(3);

console.log(list.first.value); // 1
console.log(list.last.value); // 3
console.log(list.first.next.value); // 2
console.log(list.first.next.prev.value); // 1
```

## Сделать связанный список итерируемым \*

```js
const list = LinkedList();

list.add(1);
list.add(2);
list.add(3);

for (const value of list) {
  console.log(value);
}
```

## Реализовать структуру на основе ArrayBuffer

```js
const jackBlack = Structure([
  ['name', 'utf16', 10], // Число - это максимальное количество символов
  ['lastName', 'utf16', 10],
  ['age', 'u16'], // uint16
]);

jackBlack.set('name', 'Jack');
jackBlack.set('lastName', 'Black');
jackBlack.set('age', 53);

console.log(jackBlack.get('name')); // 'Jack'
```
