import { useMemo, useState } from "react";

export type SortDirection = "asc" | "desc" | null;

export interface SortConfig {
	key: string;
	direction: SortDirection;
}

export function useTableSort<T>(data: T[], defaultSortKey?: string) {
	const [sortConfig, setSortConfig] = useState<SortConfig>({
		key: defaultSortKey || "",
		direction: null,
	});

	const requestSort = (key: string) => {
		let direction: SortDirection = "asc";

		if (sortConfig.key === key) {
			if (sortConfig.direction === "asc") {
				direction = "desc";
			} else if (sortConfig.direction === "desc") {
				direction = null; // Reset to no sort
			} else {
				direction = "asc";
			}
		}

		setSortConfig({ key, direction });
	};

	const sortedData = useMemo(() => {
		if (!sortConfig.direction || !sortConfig.key) {
			return data;
		}

		return [...data].sort((a, b) => {
			const aValue = getNestedValue(a, sortConfig.key);
			const bValue = getNestedValue(b, sortConfig.key);

			// Handle null/undefined values
			if (aValue == null && bValue == null) return 0;
			if (aValue == null) return sortConfig.direction === "asc" ? -1 : 1;
			if (bValue == null) return sortConfig.direction === "asc" ? 1 : -1;

			// Handle Date objects
			if (aValue instanceof Date && bValue instanceof Date) {
				const result = aValue.getTime() - bValue.getTime();
				return sortConfig.direction === "asc" ? result : -result;
			}

			// Handle string dates (from localStorage)
			if (typeof aValue === "string" && typeof bValue === "string") {
				const aDate = new Date(aValue);
				const bDate = new Date(bValue);
				if (!Number.isNaN(aDate.getTime()) && !Number.isNaN(bDate.getTime())) {
					const result = aDate.getTime() - bDate.getTime();
					return sortConfig.direction === "asc" ? result : -result;
				}
			}

			// Handle numbers
			if (typeof aValue === "number" && typeof bValue === "number") {
				const result = aValue - bValue;
				return sortConfig.direction === "asc" ? result : -result;
			}

			// Handle strings (case insensitive)
			const aString = String(aValue).toLowerCase();
			const bString = String(bValue).toLowerCase();

			if (aString < bString) {
				return sortConfig.direction === "asc" ? -1 : 1;
			}
			if (aString > bString) {
				return sortConfig.direction === "asc" ? 1 : -1;
			}
			return 0;
		});
	}, [data, sortConfig]);

	return { sortedData, sortConfig, requestSort };
}

// Helper function to get nested object values using dot notation
function getNestedValue(obj: unknown, path: string): unknown {
	return path.split(".").reduce((current: unknown, key) => {
		if (current && typeof current === "object" && key in current) {
			return (current as Record<string, unknown>)[key];
		}
		return undefined;
	}, obj);
}
