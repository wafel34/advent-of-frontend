import { version } from "ts-jest/dist/transformers/hoist-jest";

export interface WeightedGraph {
	[key: string]: { [key: string]: number };
}


export function findShortestPath(graph: WeightedGraph, startNode: string, endNode: string): string[] | null {

	//define list of unvisited nodes
	const unvisitedNodes = Object.keys(graph);
	const visitedNodes: string[] = [];

	// define length table
	const lengthTable: {
		[key: string]: {
			distance: number;
			previousIndex: string | null
		}
	} = {}
	Object.keys(graph).forEach(location => {
		lengthTable[location] = {
			distance: Infinity,
			previousIndex: null
		}
	});
	lengthTable[startNode].distance = 0;

	while (unvisitedNodes.length > 0) {
		// visit unvisited vertex with the smalles value
		let closestVertex = '';

		unvisitedNodes.forEach(vertex => {
			if (!closestVertex || lengthTable[vertex].distance < lengthTable[closestVertex].distance) {
				closestVertex = vertex
			}
		});

		// get list of neigborus
		const neighbors = graph[closestVertex];

		Object.entries(neighbors)
			.filter(([neigbour]) => !visitedNodes.includes(neigbour)) // filter visited
			.forEach(([neighbor, distance]) => {
				if (!lengthTable[neighbor]) {
					throw new Error('Invalid or non-existent route');
				}
				// calulate distanace between current vertex and neighbor
				const newDistance = lengthTable[closestVertex].distance + distance;
				if (newDistance < lengthTable[neighbor].distance) {
					// if calulated distance is lower than current known distance, update length table
					lengthTable[neighbor].distance = newDistance;
					// update it's previous indexes
					lengthTable[neighbor].previousIndex = closestVertex;
				}
			});

		// add current vertex to list of visited verticies
		visitedNodes.push(unvisitedNodes.shift()!);
	}
	const findPreviousNode = (endNode: string, stack: string[] = []): string[] | null => {
		const previousNode = lengthTable[endNode].previousIndex;
		if (!previousNode) {
			return stack.length > 0 ? [endNode, ...stack] : null;
		}
		return findPreviousNode(previousNode, [endNode, ...stack ]);
	}

	return findPreviousNode(endNode);
}
