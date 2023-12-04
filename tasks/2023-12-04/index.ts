export function memoize<T extends (param: any) => R, R>(fn: T): T {
	if (typeof fn !== 'function') {
		throw new Error('Function to be memoized must be a function.')
	}

	const cache = new Map();

	return function (param: any) {
		const cachedResult = cache.get(param);
		if (cachedResult) {
			return cachedResult;
		}
		const result = fn(param);

		cache.set(param, result);

		return result;
	} as T;
}
