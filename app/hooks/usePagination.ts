import { useEffect, useMemo, useState } from "react";

export interface PaginationOptions {
	initialPageSize?: number;
	minPageSize?: number;
	maxPageSize?: number;
}

export function usePagination<T>(data: T[], options: PaginationOptions = {}) {
	const { initialPageSize = 10, minPageSize = 5, maxPageSize = 50 } = options;

	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(initialPageSize);

	// Reset to first page when data changes (e.g., after search/filter)
	useEffect(() => {
		setCurrentPage(1);
	}, []);

	// Reset to first page when page size changes
	useEffect(() => {
		setCurrentPage(1);
	}, []);

	const totalItems = data.length;
	const totalPages = Math.ceil(totalItems / pageSize);

	// Ensure current page is valid
	const validCurrentPage = Math.min(currentPage, Math.max(1, totalPages));

	// Calculate pagination data
	const startIndex = (validCurrentPage - 1) * pageSize;
	const endIndex = Math.min(startIndex + pageSize, totalItems);

	const paginatedData = useMemo(() => {
		return data.slice(startIndex, endIndex);
	}, [data, startIndex, endIndex]);

	// Navigation functions
	const goToPage = (page: number) => {
		const targetPage = Math.max(1, Math.min(page, totalPages));
		setCurrentPage(targetPage);
	};

	const goToFirstPage = () => goToPage(1);
	const goToLastPage = () => goToPage(totalPages);
	const goToNextPage = () => goToPage(validCurrentPage + 1);
	const goToPreviousPage = () => goToPage(validCurrentPage - 1);

	const changePageSize = (newSize: number) => {
		const clampedSize = Math.max(minPageSize, Math.min(newSize, maxPageSize));
		setPageSize(clampedSize);
	};

	// Generate page numbers for pagination controls
	const getVisiblePages = (maxVisible: number = 5): number[] => {
		if (totalPages <= maxVisible) {
			return Array.from({ length: totalPages }, (_, i) => i + 1);
		}

		const half = Math.floor(maxVisible / 2);
		let start = Math.max(validCurrentPage - half, 1);
		const end = Math.min(start + maxVisible - 1, totalPages);

		if (end - start + 1 < maxVisible) {
			start = Math.max(end - maxVisible + 1, 1);
		}

		return Array.from({ length: end - start + 1 }, (_, i) => start + i);
	};

	return {
		// Data
		paginatedData,
		totalItems,
		totalPages,

		// Current state
		currentPage: validCurrentPage,
		pageSize,
		startIndex: startIndex + 1, // 1-indexed for display
		endIndex,

		// Navigation
		goToPage,
		goToFirstPage,
		goToLastPage,
		goToNextPage,
		goToPreviousPage,
		changePageSize,

		// Utilities
		hasNextPage: validCurrentPage < totalPages,
		hasPreviousPage: validCurrentPage > 1,
		getVisiblePages,

		// Page size constraints
		minPageSize,
		maxPageSize,
	};
}
