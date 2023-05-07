import { GraphSvgRenderer } from '../graph-svg-renderer';

class UndirectedGraph extends GraphSvgRenderer {}

const undirectedGraph = new UndirectedGraph();

//       A
//    /  |  \
//   B   C   D
//  / \     / \
// E   F   G   H
//    / \   \
//   I   J   K

undirectedGraph.addVertex('A');

undirectedGraph.addEdge('A', 'B', 10);
undirectedGraph.addEdge('A', 'C', 5);
undirectedGraph.addEdge('A', 'D', 7);

undirectedGraph.addEdge('B', 'E', 6);
undirectedGraph.addEdge('B', 'F', 6);

undirectedGraph.addEdge('D', 'G', 7);
undirectedGraph.addEdge('D', 'H', 12);

undirectedGraph.addEdge('F', 'I', 15);
undirectedGraph.addEdge('F', 'J', 20);

undirectedGraph.addEdge('G', 'K', 14);

undirectedGraph.depthFirstSearch('A', console.log); // A, B, E, F, I, J, C, D, G, K, H
undirectedGraph.breadthFirstSearch('A', console.log); // A, B, E, F, I, J, C, D, G, K, H

const container = document.getElementById('graph-container')!;

undirectedGraph.renderSvg(container, true);

//      A	B	C	D	E	F	G	H	I	J	K
// A	0	1	1	1	0	0	0	0	0	0	0
// B	1	0	0	0	1	1	0	0	0	0	0
// C	1	0	0	0	0	0	0	0	0	0	0
// D	1	0	0	0	0	0	1	1	0	0	0
// E	0	1	0	0	0	0	0	0	0	0	0
// F	0	1	0	0	0	0	0	0	1	1	0
// G	0	0	0	1	0	0	0	0	0	0	1
// H	0	0	0	1	0	0	0	0	0	0	0
// I	0	0	0	0	0	1	0	0	0	0	0
// J	0	0	0	0	0	1	0	0	0	0	0
// K	0	0	0	0	0	0	1	0	0	0	0

const matrix = undirectedGraph.getAdjacencyMatrix();

const matrixBasedUndirectedGraph = new UndirectedGraph();

matrixBasedUndirectedGraph.setAdjacencyMatrix(matrix);

const matrixGraphContainer = document.getElementById('matrix-graph-container')!;

matrixBasedUndirectedGraph.renderSvg(matrixGraphContainer, true);
