import { Matrix2D } from '../../shared/classes';

export class Graph {
  #graph: Map<string, Map<string, number>> = new Map();
  #rootVertex: string = '';
  #charCode: number = 97;
  protected _isDirected: boolean = false;

  get isDirected(): boolean {
    return this._isDirected;
  }

  get size(): number {
    return this.#graph.size;
  }

  get vertexList(): string[] {
    return [...this.#graph.keys()];
  }

  get rootVertex(): string {
    return this.#rootVertex;
  }

  addVertex(vertex: string): void {
    if (this.#graph.has(vertex)) return;

    this.#graph.set(vertex, new Map());

    if (!this.#rootVertex) this.#rootVertex = vertex;
  }

  addEdge(start: string, end: string, weight = 1): void {
    this.addVertex(start);
    this.addVertex(end);

    this.#graph.get(start)?.set(end, weight);

    if (!this.isDirected) {
      this.#graph.get(end)?.set(start, weight);
    }
  }

  hasEdge(start: string, end: string): boolean {
    return !!this.#graph.get(start)?.has(end);
  }

  getEdgeWeight(start: string, end: string): number | undefined {
    return this.#graph.get(start)?.get(end);
  }

  getNeighbors(vertex: string): Map<string, number> | undefined {
    return this.#graph.get(vertex);
  }

  hasVertex(vertex: string): boolean {
    return this.#graph.has(vertex);
  }

  getAdjacencyMatrix(): Matrix2D {
    const size = this.#graph.size;
    const matrix = new Matrix2D({ x: size, y: size });
    const vertexList = this.vertexList;

    for (let i = 0; i < vertexList.length; i++) {
      const vertex = vertexList[i];

      for (const [neighborVertex, weight] of this.#graph.get(vertex)!) {
        const y = vertexList.indexOf(neighborVertex);

        matrix.set({ x: i, y }, weight);
      }
    }

    return matrix;
  }

  setAdjacencyMatrix(matrix: Matrix2D): void {
    if (!matrix) return;

    const size = matrix.width;

    for (let i = 0; i < size; i++) {
      this.addVertex(String.fromCharCode(this.#charCode + i));
    }

    const vertexList = this.vertexList;

    for (let x = 0; x < size; x++) {
      for (let y = 0; y < size; y++) {
        const weight = matrix.get({ x, y });

        if (weight) this.addEdge(vertexList[x], vertexList[y], weight);
      }
    }
  }

  transitiveClosure(): Map<string, Map<string, number>> {
    const matrix = this.getAdjacencyMatrix();
    const size = matrix.width;

    for (let k = 0; k < size; k++) {
      for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
          const currentPosition = { x: i, y: j };
          const currentValue = matrix.get(currentPosition);
          const pathThroughK = matrix.get({ x: i, y: k }) && matrix.get({ x: k, y: j });

          matrix.set(currentPosition, currentValue || pathThroughK);
        }
      }
    }

    this.setAdjacencyMatrix(matrix);

    return this.#graph;
  }

  depthFirstSearch(vertex: string, cb: (vertex: string) => void): void {
    const visited = new Set<string>();
    this.#depthFirstSearchHelper(vertex, visited, cb);
  }

  breadthFirstSearch(vertex: string, cb: (vertex: string) => void): void {
    const queue = [vertex];
    const visited = new Set<string>();

    while (queue.length) {
      const currentVertex = queue.shift()!;

      if (visited.has(currentVertex)) continue;

      cb(currentVertex);
      visited.add(currentVertex);

      for (const [neighborVertex, _weight] of this.#graph.get(currentVertex)!) {
        queue.push(neighborVertex);
      }
    }
  }

  #depthFirstSearchHelper(vertex: string, visited: Set<string>, cb: (vertex: string) => void) {
    visited.add(vertex);
    cb(vertex);

    const neighbors = this.#graph.get(vertex)!;

    for (const [neighborVertex, _weight] of neighbors) {
      if (visited.has(neighborVertex)) continue;

      this.#depthFirstSearchHelper(neighborVertex, visited, cb);
    }
  }
}
