type PaginationData<T> = {
	currentPageItems: T[];
	totalPages: number;
	totalItems: number;
	currentPage: number;
}

export function usePagination<T>(items: T[], itemsPerPage: number, pageNumber: number): PaginationData<T> {
	const paginationData: Map<number, T[]> = new Map();

	items.forEach((item, i) => {
		const pageIndex = Math.floor(i/itemsPerPage) + 1;
		paginationData.has(pageIndex) ? paginationData.get(pageIndex)!.push(item) : paginationData.set(pageIndex, [item])
	});

	return {
		currentPageItems: paginationData.get(pageNumber) ?? [],
		currentPage: pageNumber,
		totalItems: items.length,
		totalPages: paginationData.size
	}
}
