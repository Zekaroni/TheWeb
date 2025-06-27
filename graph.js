// This is the main script file

// Simple graph using adjacency list
function Graph() {
    this.adj = {};
    this.pos = {};
}

Graph.prototype.addVertex = function(v) {
    if (!this.adj[v]) this.adj[v] = [];
};

Graph.prototype.addEdge = function(v, w) {
    if (!this.adj[v]) this.addVertex(v);
    if (!this.adj[w]) this.addVertex(w);
    if (!this.adj[v].includes(w)) this.adj[v].push(w);
    if (!this.adj[w].includes(v)) this.adj[w].push(v);
};

Graph.prototype.draw = function() {
    const svg = document.getElementById("graph");
    if (!svg) {
        console.error("SVG element with id 'graph' not found.");
        return;
    }

    const keys = Object.keys(this.adj);
    const cx = 400;
    const cy = 300;
    const r = 200;

    // calculate positions
    keys.forEach((node, i) => {
        const angle = (2 * Math.PI * i) / keys.length;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        this.pos[node] = { x, y };
    });

    let svgContent = "";
    const drawnEdges = new Set();

    // edges
    keys.forEach((node) => {
        this.adj[node].forEach((neighbor) => {
            const edgeKey = [node, neighbor].sort().join("-");
            if (!drawnEdges.has(edgeKey)) {
                drawnEdges.add(edgeKey);
                const { x: x1, y: y1 } = this.pos[node];
                const { x: x2, y: y2 } = this.pos[neighbor];
                svgContent += `<line class="edge" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" />`;
            }
        });
    });

    // nodes
    keys.forEach((node) => {
        const { x, y } = this.pos[node];
        svgContent += `<circle class="node" cx="${x}" cy="${y}" r="20" />`;
        svgContent += `<text x="${x}" y="${y + 5}">${node}</text>`;
    });

    svg.innerHTML = svgContent;
};

// Example usage
const g = new Graph();
g.addVertex("A");
g.addVertex("B");
g.addVertex("C");
g.addVertex("D");
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
g.draw();