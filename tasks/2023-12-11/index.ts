export interface WeightedGraph {
	[key: string]: { [key: string]: number };
}

type DistanceTable = {
	[key: string]: {
		distance: number;
		previousIndex: string | null
	}
}
export function findShortestPath(graph: WeightedGraph, startNode: string, endNode: string): string[] | null {

	// define lists of unvisited and visited nodes
	const unvisitedNodes = Object.keys(graph);
	const visitedNodes: string[] = [];

	// define initial distance table
	const distanceTable: DistanceTable = {};
	for (const location of unvisitedNodes) {
		distanceTable[location] = {
			distance: Infinity,
			previousIndex: null
		}
	}
	distanceTable[startNode].distance = 0;

	while (unvisitedNodes.length > 0) {
		// find unvisited vertex with the smallest distance
		const currentVertex = findClosestVertex(unvisitedNodes, distanceTable);

		// get list of its neigborus
		const neighbors = graph[currentVertex];

		Object.entries(neighbors)
			.filter(([neighbor]) => !visitedNodes.includes(neighbor)) // filter visited
			.forEach(([neighbor, distance]) => {
				if (!distanceTable[neighbor]) {
					throw new Error('Invalid or non-existent route');
				}
				// calulate distanace between current vertex and neighbor
				const newDistance = distanceTable[currentVertex].distance + distance;
				if (newDistance < distanceTable[neighbor].distance) {
					// if calulated distance is lower than current known distance, update length table
					distanceTable[neighbor].distance = newDistance;
					// update it's previous indexes
					distanceTable[neighbor].previousIndex = currentVertex;
				}
			});

		// add current vertex to list of visited verticies
		visitedNodes.push(unvisitedNodes.shift()!);
	}

	return generateShortestsPath(endNode, distanceTable);
}

const generateShortestsPath = (endNode: string, distanceTable: DistanceTable, stack: string[] = []): string[] | null => {
	const previousNode = distanceTable[endNode].previousIndex;
	if (!previousNode) {
		return stack.length > 0 ? [endNode, ...stack] : null;
	}
	return generateShortestsPath(previousNode, distanceTable,[endNode, ...stack ]);
}

const findClosestVertex = (nodes: string[], distanceTable: DistanceTable): string => {
	let closestVertex = '';

	nodes.forEach(vertex => {
		if (!closestVertex || distanceTable[vertex].distance < distanceTable[closestVertex].distance) {
			closestVertex = vertex;
		}
	});

	return closestVertex;
}
