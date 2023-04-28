import { Nullable } from '../../shared/models';

class HashMapNode<K, V> {
  next: Nullable<HashMapNode<K, V>> = null;

  constructor(public key: K, public value: V) {}
}

class HashMap<K, V> {
  #capacity: number;
  #buffer: HashMapNode<K, V>[];
  #size: number = 0;

  constructor(capacity: number) {
    this.#capacity = capacity;
    this.#buffer = new Array<HashMapNode<K, V>>(capacity);
  }

  get buffer(): HashMapNode<K, V>[] {
    return this.#buffer;
  }

  get size(): number {
    return this.#size;
  }

  get #isResize(): boolean {
    const capacity = this.#capacity * 0.7;

    return this.size > capacity && this.#buffer.filter(Boolean).length > capacity;
  }

  set(key: K, value: V) {
    const index = this.#getIndex(key);

    let currentNode = this.#buffer[index];
    const node = new HashMapNode(key, value);

    if (!currentNode) {
      this.#buffer[index] = node;
    } else {
      while (currentNode) {
        if (currentNode.key === key) {
          currentNode.value = value;

          return;
        }

        if (!currentNode.next) {
          currentNode.next = node;

          break;
        }

        currentNode = currentNode.next;
      }
    }

    this.#size++;

    if (this.#isResize) {
      this.#resize();
    }
  }

  get(key: K): V | undefined {
    const index = this.#getIndex(key);

    let currentNode = this.#buffer[index];

    if (!currentNode) return;

    if (currentNode.key === key) return currentNode.value;

    while (currentNode) {
      if (currentNode.key === key) {
        return currentNode.value;
      }

      currentNode = currentNode.next!;
    }
  }

  has(key: K): boolean {
    const index = this.#getIndex(key);

    let currentNode = this.#buffer[index];

    if (!currentNode) return false;

    while (currentNode) {
      if (currentNode.key === key) {
        return true;
      }

      currentNode = currentNode.next!;
    }

    return false;
  }

  delete(key: K): boolean | V {
    const index = this.#getIndex(key);

    let currentNode = this.#buffer[index];
    let prevNode: HashMapNode<K, V> | undefined;

    if (!currentNode) return false;

    while (currentNode) {
      if (currentNode.key === key) {
        if (prevNode) {
          prevNode.next = currentNode.next;
        } else {
          this.#buffer[index] = currentNode.next!;
        }

        this.#size--;

        return currentNode.value;
      }

      prevNode = currentNode;
      currentNode = currentNode.next!;
    }

    this.#size--;

    return false;
  }

  #getIndex(key: K, capacity?: number): number {
    const hash = this.#getHash(key);
    const currentCapacity = capacity || this.#capacity;

    return hash % currentCapacity;
  }

  #getHash(key: K): number {
    if (typeof key === 'number') return key;

    const currentKey: string = typeof key === 'object' ? JSON.stringify(key) : String(key);

    const toHash = (hash: number, char: string, index: number) => {
      hash += char.charCodeAt(0) * (index + 1);

      return hash;
    };

    return currentKey.split('').reduce(toHash, 0);
  }

  #resize(): void {
    const newCapacity = this.#capacity * 2;
    const newBuffer = new Array<HashMapNode<K, V>>(newCapacity);

    this.#buffer.forEach((node) => {
      let currentNode = node;

      while (currentNode) {
        const index = this.#getIndex(currentNode.key, newCapacity);

        if (!newBuffer[index]) {
          newBuffer[index] = currentNode;
        } else {
          let tail = newBuffer[index];

          while (tail.next) {
            tail = tail.next;
          }

          tail.next = currentNode;
        }

        currentNode = currentNode.next!;
      }
    });

    this.#capacity = newCapacity;
    this.#buffer = newBuffer;
  }
}

const map = new HashMap<string | number | object, number>(120);

const a = { a: 1, b: 2 };
const b = { a: 1, b: 2 };

map.set('foo', 1);
map.set(42, 10);
map.set(a, 100);
map.set(b, 200);

console.log(map.get(42)); // 10
console.log(map.get(a)); // 100
console.log(map.get(b)); // 200

console.log(map.delete(a)); // 100
console.log(map.has(a)); // false

console.log(map.has(b)); // true
console.log(map.delete(b)); // 200

console.log(map.get(42)); // 10
console.log(map.get('foo')); // 1

console.log(map.size); // 2
