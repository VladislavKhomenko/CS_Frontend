# ДЗ к лекции База#4

## Почитать Лафоре

* Про стек

* Про очередь

## Реализовать очередь на основе связанного списка

   ```js
   const queue = Queue();
   
   queue.push(10);
   queue.push(11);
   queue.push(12);
   
   console.log(queue.head);  // 10
   
   console.log(queue.pop()); // 10
   
   console.log(queue.head);  // 11
   
   console.log(queue.pop()); // 11
   console.log(queue.pop()); // 12
   console.log(queue.pop()); // Exception
   ```

## Реализовать двустороннюю очередь

   ```js
   const dequeue = Queue();
   
   dequeue.push(10);
   dequeue.unshift(11);
   dequeue.push(12);
   
   console.log(dequeue.pop());   // 12
   console.log(dequeue.shift()); // 11
   console.log(dequeue.pop());   // 10
   console.log(dequeue.pop());   // Exception
   ```

## Реализовать стек на основе типизированного массива заданной длины

   ```js
   const stack = Stack(Int32Array, 10);
   
   stack.push(10);
   stack.push(11);
   stack.push(12);
   
   console.log(stack.head);  // 12
   
   console.log(stack.pop()); // 12
   
   console.log(stack.head);  // 11
   
   console.log(stack.pop()); // 11
   console.log(stack.pop()); // 10
   console.log(stack.pop()); // Exception
   ```
