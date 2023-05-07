import { GraphSvgRenderer } from '../graph-svg-renderer';

class DirectedGraph extends GraphSvgRenderer {
  protected _isDirected = true;
}

const directedGraph = new DirectedGraph();

//          A
//    /  /  |   \  \
//   B   C   D   E   F
//  / \     / \     / \
// G   H   I   J   K   L
//    / \   \
//   M   N   O

directedGraph.addVertex('A');

directedGraph.addEdge('A', 'B');
directedGraph.addEdge('A', 'C');
directedGraph.addEdge('A', 'D');
directedGraph.addEdge('A', 'E');
directedGraph.addEdge('A', 'F');

directedGraph.addEdge('B', 'G');
directedGraph.addEdge('B', 'H');

directedGraph.addEdge('D', 'I');
directedGraph.addEdge('D', 'J');

directedGraph.addEdge('F', 'K');
directedGraph.addEdge('F', 'L');

directedGraph.addEdge('H', 'M');
directedGraph.addEdge('H', 'N');

directedGraph.addEdge('I', 'O');

directedGraph.depthFirstSearch('A', console.log); // A, B, G, H, M, N, C, D, I, O, J, E, F, K, L

directedGraph.breadthFirstSearch('A', console.log); // A, B, C, D, E, F, G, H, I, J, K, L, M, N, O

const container = document.getElementById('graph-container')!;

directedGraph.renderSvg(container);

const matrix = directedGraph.getAdjacencyMatrix();

console.log(matrix);

//  	A	B	C	D	E	F	G	H	I	J	K	L	M	N	O
// A	0	1	1	1	1	1	0	0	0	0	0	0	0	0	0
// B	0	0	0	0	0	0	1	1	0	0	0	0	0	0	0
// C	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
// D	0	0	0	0	0	0	0	0	1	1	0	0	0	0	0
// E	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
// F	0	0	0	0	0	0	0	0	0	0	1	1	0	0	0
// G	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
// H	0	0	0	0	0	0	0	0	0	0	0	0	1	1	0
// I	0	0	0	0	0	0	0	0	0	0	0	0	0	0	1
// J	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
// K	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
// L	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
// M	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
// N	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0
// O	0	0	0	0	0	0	0	0	0	0	0	0	0	0	0

const matrixBasedDirectedGraph = new DirectedGraph();

matrixBasedDirectedGraph.setAdjacencyMatrix(matrix);

const matrixGraphContainer = document.getElementById('matrix-graph-container')!;

matrixBasedDirectedGraph.renderSvg(matrixGraphContainer);

console.log(matrixBasedDirectedGraph.transitiveClosure());

// Map(15) {
//     'a' => Map(14) { 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o' },
//     'b' => Map(4) { 'g', 'h', 'm', 'n' },
//     'c' => Map(0) { },
//     'd' => Map(3) { 'i', 'j', 'o' },
//     'e' => Map(0) { },
//     'f' => Map(2) { 'k', 'l' },
//     'g' => Map(0) { },
//     'h' => Map(2) { 'm', 'n' },
//     'i' => Map(1) { 'o' },
//     'j' => Map(0) { },
//     'k' => Map(0) { },
//     'l' => Map(0) { },
//     'm' => Map(0) { },
//     'n' => Map(0) { },
//     'o' => Map(0) { },
//   }
