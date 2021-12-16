import { forFileLinesOf } from '../helpers/fileAccess';
class Node {
  links: Node[];
  name: string;

  constructor(name: string) {
    this.name = name;
    this.links = [];
  }

  largeCave(): boolean {
    return this.name.toUpperCase() == this.name;
  }
}

class Graph {
  nodes: { [key: string]: Node };

  constructor() {
    this.nodes = {};
  }

  addLink(fromName: string, toName: string): void {
    const from = this.nodes[fromName] || this.newNode(fromName);
    const to = this.nodes[toName] || this.newNode(toName);
    from.links.push(to);
    to.links.push(from);
  }

  newNode(name: string) {
    const node = new Node(name);
    this.nodes[name] = node;
    return node;
  }

  allPathsSmallCaveOnce(from: string, to: string, avoid: Node[] = []): Node[][] {
    const fromNode = this.nodes[from];
    if (from == to) {
      return [[fromNode]];
    }
    const newAvoid = [...avoid];
    if (!fromNode.largeCave()) {
      newAvoid.push(fromNode);
    }
    return fromNode.links
      .filter((node) => !avoid.includes(node))
      .map((node) => {
        return this.allPathsSmallCaveOnce(node.name, to, newAvoid).map((nodeList) => {
          nodeList.unshift(fromNode);
          return nodeList;
        });
      })
      .flat();
  }

  allPathsOneSmallCaveTwice(
    from: string,
    to: string,
    avoid: Node[] = [],
    smallCaveTwice = false
  ): Node[][] {
    const fromNode = this.nodes[from];
    if (from == to) {
      return [[fromNode]];
    }
    const newAvoid = [...avoid];
    if (!fromNode.largeCave()) {
      newAvoid.push(fromNode);
    }
    let avoidOptions: Node[][] = [];
    if (!smallCaveTwice) {
      avoidOptions = fromNode.links
        .filter((node) => avoid.includes(node))
        .filter((node) => node.name != 'start')
        .map((node) => {
          return this.allPathsOneSmallCaveTwice(node.name, to, newAvoid, true).map((nodeList) => {
            nodeList.unshift(fromNode);
            return nodeList;
          });
        })
        .flat();
    }
    return fromNode.links
      .filter((node) => !avoid.includes(node))
      .map((node) => {
        return this.allPathsOneSmallCaveTwice(node.name, to, newAvoid, smallCaveTwice).map(
          (nodeList) => {
            nodeList.unshift(fromNode);
            return nodeList;
          }
        );
      })
      .flat()
      .concat(avoidOptions);
  }
}

const connections: string[][] = forFileLinesOf<string[]>(__dirname, 'input', (line: string) => {
  return line.split('-');
});
const graph = connections.reduce<Graph>((graph, connection) => {
  graph.addLink(connection[0], connection[1]);
  return graph;
}, new Graph());

const nodeLists = graph.allPathsOneSmallCaveTwice('start', 'end');

console.log(`The are ${nodeLists.length} connection which are:`);

nodeLists.forEach((nodeList) => {
  console.log(nodeList.map((node) => node.name).join(' -> '));
});

console.log(`The are ${nodeLists.length} connection which are:`);
