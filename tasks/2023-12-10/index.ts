const NORTH_POLE = 'North Pole';

export function findCyclesBetweenLocations(graph: Record<string, string[]>): string[][] {
	const locationCycles: string[][] = [];
	const visitedLocations: Set<string> = new Set<string>();

	const findLocations = (startingLocation: string, destinations: string[], cyclePath: string[]) => {
		destinations.forEach(location => {
			const nextDestinations = graph[location];
			if (!nextDestinations) {
				throw new Error('Invalid graph: missing nodes');
			}

			const newCyclePath = [...cyclePath, location];

			if (location === startingLocation) {
				locationCycles.push(newCyclePath);
				return;
			}

			if (visitedLocations.has(location)) {
				return;
			}
			visitedLocations.add(location);

			findLocations(startingLocation, nextDestinations, newCyclePath);
		});
	}

	Object.entries(graph)
		.forEach(([location, destinations]) => {
			findLocations(location, destinations, [location])
		});

	return locationCycles;
}
