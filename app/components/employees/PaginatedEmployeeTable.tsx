import { usePagination } from "~/hooks/usePagination";
import type { Employee } from "~/stores/employeeStore";
import { EmployeeTable } from "./EmployeeTable";
import { PageSizeSelector } from "./PageSizeSelector";
import { Pagination } from "./Pagination";

interface PaginatedEmployeeTableProps {
	employees: Employee[];
	onEdit?: (employee: Employee) => void;
	onDelete?: (employeeId: string) => void;
}

export function PaginatedEmployeeTable({
	employees,
	onEdit,
	onDelete,
}: PaginatedEmployeeTableProps) {
	const {
		paginatedData,
		totalItems,
		totalPages,
		currentPage,
		pageSize,
		startIndex,
		endIndex,
		goToPage,
		goToFirstPage,
		goToLastPage,
		goToNextPage,
		goToPreviousPage,
		changePageSize,
		hasNextPage,
		hasPreviousPage,
		getVisiblePages,
		minPageSize,
		maxPageSize,
	} = usePagination(employees, {
		initialPageSize: 10,
		minPageSize: 5,
		maxPageSize: 50,
	});

	const visiblePages = getVisiblePages(5);

	return (
		<div className="space-y-4">
			{/* Table */}
			<EmployeeTable
				employees={paginatedData}
				onEdit={onEdit}
				onDelete={onDelete}
			/>

			{/* Pagination controls */}
			{totalItems > 0 && (
				<div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
					{/* Results info and page size selector */}
					<div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-muted-foreground">
						<div>
							Showing {startIndex} to {endIndex} of {totalItems} result
							{totalItems > 1 ? "s" : ""}
						</div>
						<PageSizeSelector
							pageSize={pageSize}
							onPageSizeChange={changePageSize}
							minSize={minPageSize}
							maxSize={maxPageSize}
							totalItems={totalItems}
						/>
					</div>

					{/* Pagination */}
					<Pagination
						currentPage={currentPage}
						totalPages={totalPages}
						onPageChange={goToPage}
						onFirstPage={goToFirstPage}
						onLastPage={goToLastPage}
						onNextPage={goToNextPage}
						onPreviousPage={goToPreviousPage}
						hasNextPage={hasNextPage}
						hasPreviousPage={hasPreviousPage}
						visiblePages={visiblePages}
					/>
				</div>
			)}
		</div>
	);
}
