import { Graph } from '../graph';

export class GraphSvgRenderer extends Graph {
  renderSvg(container: HTMLElement, hasWeight = false): void {
    const positionsMap = this.#calculatePositions();
    const svg = this.#createSvg();
    const vertexList = this.vertexList;

    for (const vertex of vertexList) {
      const vertexWidth = 20;
      const { x, y } = positionsMap.get(vertex)!;
      const vertexcCircle = this.#createVertex(vertex, x, y, vertexWidth);
      const vertexLabel = this.#createVertexLabel(vertex, x, y, vertexWidth);

      svg.appendChild(vertexcCircle);
      svg.appendChild(vertexLabel);
    }

    for (const vertex of vertexList) {
      const { x: parentX, y: parentY } = positionsMap.get(vertex)!;
      const neighbors = this.getNeighbors(vertex)!;

      for (const [neighborVertex, weight] of neighbors) {
        const { x, y } = positionsMap.get(neighborVertex)!;
        const line = this.#createEdge(parentX, parentY, x, y);

        if (hasWeight) {
          const edgeLabel = this.#createEdgeLabel(parentX, parentY, x, y, weight);

          svg.appendChild(edgeLabel);
        }

        svg.appendChild(line);
      }
    }

    if (this.isDirected) {
      const defs = this.#createDefs();
      svg.insertBefore(defs, svg.firstChild);
    }

    container.appendChild(svg);
  }

  #calculatePositions(
    xOffset = 100,
    yOffset = 100,
    startPoint = { x: 300, y: 50 }
  ): Map<string, { x: number; y: number }> {
    const positionsMap = new Map();

    this.depthFirstSearch(this.rootVertex, (vertex: string) => {
      if (vertex === this.rootVertex) positionsMap.set(vertex, startPoint);

      const parentPosition = positionsMap.get(vertex);
      const neighbors = this.getNeighbors(vertex);

      if (!neighbors) return;

      [...neighbors.keys()].forEach((key: string, index: number) => {
        if (positionsMap.has(key)) return;

        const x = parentPosition.x - ((neighbors.size - 1) * xOffset) / 2 + index * xOffset;
        const y = parentPosition.y + yOffset;

        positionsMap.set(key, { x, y });
      });
    });

    return positionsMap;
  }

  #createSvg(): SVGElement {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '600');
    svg.setAttribute('height', '400');

    return svg;
  }

  #createVertex(vertex: string, x: number, y: number, vertexWidth: number): SVGCircleElement {
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');

    circle.setAttribute('id', vertex);
    circle.setAttribute('cx', x.toString());
    circle.setAttribute('cy', y.toString());
    circle.setAttribute('fill', 'white');
    circle.setAttribute('stroke', 'black');
    circle.setAttribute('r', vertexWidth.toString());

    return circle;
  }

  #createVertexLabel(vertex: string, x: number, y: number, vertexWidth: number): SVGTextElement {
    const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    const textX = x - vertexWidth;
    const textY = y - vertexWidth;

    text.setAttribute('x', textX.toString());
    text.setAttribute('y', textY.toString());
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', 'black');
    text.textContent = vertex;

    return text;
  }

  #createEdgeLabel(
    parentX: number,
    parentY: number,
    x: number,
    y: number,
    weight: number
  ): SVGTextElement {
    const edgeLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    edgeLabel.setAttribute('x', `${(parentX + x + 5) / 2}`);
    edgeLabel.setAttribute('y', `${(parentY + y + 5) / 2}`);
    edgeLabel.setAttribute('text-anchor', 'middle');
    edgeLabel.setAttribute('dominant-baseline', 'middle');
    edgeLabel.setAttribute('font-size', '12px');
    edgeLabel.textContent = `${weight}`;

    return edgeLabel;
  }

  #createEdge(parentX: number, parentY: number, x: number, y: number): SVGLineElement {
    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    line.setAttribute('x1', parentX.toString());
    line.setAttribute('y1', parentY.toString());
    line.setAttribute('x2', x.toString());
    line.setAttribute('y2', y.toString());
    line.setAttribute('stroke', 'black');
    line.setAttribute('stroke-width', '1');

    if (this.isDirected) line.setAttribute('marker-end', 'url(#arrowhead)');

    return line;
  }

  #createDefs(): SVGDefsElement {
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const marker = this.#createArrowMarker();

    defs.appendChild(marker);

    return defs;
  }

  #createArrowMarker(): SVGMarkerElement {
    const marker = document.createElementNS('http://www.w3.org/2000/svg', 'marker');

    marker.setAttribute('id', 'arrowhead');
    marker.setAttribute('markerWidth', '10');
    marker.setAttribute('markerHeight', '7');
    marker.setAttribute('refX', '0');
    marker.setAttribute('refY', '3.5');
    marker.setAttribute('orient', 'auto');
    const polygon = this.#createPolygon();

    marker.appendChild(polygon);

    return marker;
  }

  #createPolygon(): SVGPolygonElement {
    const polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');

    polygon.setAttribute('points', '0 0, 10 3.5, 0 7');
    polygon.setAttribute('fill', 'black');

    return polygon;
  }
}
