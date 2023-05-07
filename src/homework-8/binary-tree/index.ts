import { Nullable } from '../../shared/models';

class BinaryTreeNode<T> {
  value: T;
  left: Nullable<BinaryTreeNode<T>>;
  right: Nullable<BinaryTreeNode<T>>;

  constructor(value: T, { left, right }: Partial<BinaryTreeNode<T>> = {}) {
    this.value = value;
    this.left = left ?? null;
    this.right = right ?? null;
  }
}

class BinaryTree<T> {
  rootNode: BinaryTreeNode<T>;

  constructor(value: T, node?: BinaryTreeNode<T>) {
    this.rootNode = new BinaryTreeNode(value, node);
  }

  getMin(node: BinaryTreeNode<T> = this.rootNode): T | undefined {
    if (!node) return;

    if (node.left === null) return node.value;

    return this.getMin(node.left);
  }

  getMax(node: BinaryTreeNode<T> = this.rootNode): T | undefined {
    if (!node) return;

    if (node.right === null) return node.value;

    return this.getMax(node.right);
  }

  insert(value: T, node: BinaryTreeNode<T> = this.rootNode): void {
    if (value >= node.value) {
      if (node.right === null) {
        node.right = new BinaryTreeNode(value);

        return;
      }

      this.insert(value, node.right);
    }

    if (value < node.value) {
      if (node.left === null) {
        node.left = new BinaryTreeNode(value);

        return;
      }

      this.insert(value, node.left);
    }
  }

  delete(value: T, node: Nullable<BinaryTreeNode<T>> = this.rootNode): Nullable<BinaryTreeNode<T>> {
    if (node === null) return null;

    if (value > node.value) {
      node.right = this.delete(value, node.right);
    } else if (value < node.value) {
      node.left = this.delete(value, node.left);
    } else {
      if (node.left === null && node.right === null) {
        node = null;
      } else if (node.left === null || node.right === null) {
        node = node.left === null ? node.right : node.left;
      } else {
        const maxInLeft = this.getMax(node.left)!;
        node.value = maxInLeft;
        node.left = this.delete(maxInLeft, node.left);
      }
    }

    return node;
  }

  inOrder(node: Nullable<BinaryTreeNode<T>> = this.rootNode): void {
    if (node === null) return;

    this.inOrder(node.left);

    console.log(node.value);

    this.inOrder(node.right);
  }

  deepFirstSearch(cb: (value: T) => void, node: Nullable<BinaryTreeNode<T>> = this.rootNode): void {
    if (node === null) return;

    cb(node.value);

    this.deepFirstSearch(cb, node.left);
    this.deepFirstSearch(cb, node.right);
  }

  postOrder(node: Nullable<BinaryTreeNode<T>> = this.rootNode): void {
    if (node === null) return;

    this.postOrder(node.left);
    this.postOrder(node.right);

    console.log(node.value);
  }

  breadthFirstSearch(cb: (value: T) => void): void {
    const queue = [this.rootNode];

    while (queue.length) {
      const node = queue.shift()!;

      cb(node.value);

      if (node.left) {
        queue.push(node.left);
      }

      if (node.right) {
        queue.push(node.right);
      }
    }
  }
}

const binaryTree = new BinaryTree(10);

binaryTree.insert(15);
binaryTree.insert(6);
binaryTree.insert(17);
binaryTree.insert(8);
binaryTree.insert(14);
binaryTree.insert(5);
binaryTree.insert(4);

console.log(binaryTree.getMax()); // 17
console.log(binaryTree.getMin()); // 5

console.log(binaryTree.rootNode);

// BinaryTreeNode {
//   value: 10,
//   left: BinaryTreeNode {
//     value: 6,
//     left: BinaryTreeNode { value: 5, left: BinaryTreeNode { value: 4, left: null, right: null },, right: null },
//     right: BinaryTreeNode { value: 8, left: null, right: null }
//   },
//   right: BinaryTreeNode {
//     value: 15,
//     left: BinaryTreeNode { value: 14, left: null, right: null },
//     right: BinaryTreeNode { value: 17, left: null, right: null }
//   }
// }

console.log(binaryTree.delete(5));

// BinaryTreeNode {
//   value: 10,
//   left: BinaryTreeNode {
//     value: 6,
//     left: BinaryTreeNode { value: 4, left: null, right: null },
//     right: BinaryTreeNode { value: 8, left: null, right: null }
//   },
//   right: BinaryTreeNode {
//     value: 15,
//     left: BinaryTreeNode { value: 14, left: null, right: null },
//     right: BinaryTreeNode { value: 17, left: null, right: null }
//   }
// }

console.log(binaryTree.inOrder()); // 4 6 8 10 14 15 17
console.log(binaryTree.postOrder()); // 4 8 6 14 17 15 10

binaryTree.deepFirstSearch((value) => console.log(value)); // 10 6 4 8 15 14 17
binaryTree.breadthFirstSearch((value) => console.log(value)); // 10 6 15 4 8 14 17
