// This is the main script file

// Simple graph using adjacency list
function Graph() {
    this.adjacent = {};
    this.position = {};
}

Graph.prototype.addVertex = function(vertex) {
    if (!this.adjacent[vertex]) this.adjacent[vertex] = [];
};

Graph.prototype.addEdge = function(vertex, edge) {
    if (!this.adjacent[vertex]) this.addVertex(vertex);
    if (!this.adjacent[edge]) this.addVertex(edge);
    if (!this.adjacent[vertex].includes(edge)) this.adjacent[vertex].push(edge);
    if (!this.adjacent[edge].includes(vertex)) this.adjacent[edge].push(vertex);
};

Graph.prototype.draw = function() {
    const svg = document.getElementById("graph");
    if (!svg) {
        console.error("SVG element with id 'graph' not found.");
        return;
    }

    const keys = Object.keys(this.adjacent);
    const cx = 400;
    const cy = 300;
    const radius = 200;

    // calculate positions
    keys.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / keys.length;
        const x = cx + radius * Math.cos(angle);
        const y = cy + radius * Math.sin(angle);
        this.position[node] = { x, y };
    });

    let svgContent = "";
    const drawnEdges = new Set();

    // edges
    keys.forEach((node) => {
        this.adjacent[node].forEach((neighbor) => {
            const edgeKey = [node, neighbor].sort().join("-");
            if (!drawnEdges.has(edgeKey)) {
                drawnEdges.add(edgeKey);
                const { x: x1, y: y1 } = this.position[node];
                const { x: x2, y: y2 } = this.position[neighbor];
                svgContent += `<line class="edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
            }
        });
    });

    // nodes
    keys.forEach((node) => {
        const { x, y } = this.position[node];
        svgContent += `<circle class="node" cx="${x}" cy="${y}" r="20" />`;
        svgContent += `<text x="${x}" y="${y + 5}">${node}</text>`;
    });

    svg.innerHTML = svgContent;
};

// Example usage
const graph = new Graph();
graph.addVertex("A");
graph.addVertex("B");
graph.addVertex("C");
graph.addVertex("D");
graph.addEdge("A", "B");
graph.addEdge("A", "C");
graph.addEdge("B", "D");
graph.addEdge("A", "D");
graph.draw();