import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { Button } from "~/components/ui/button";

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onPageChange: (page: number) => void;
	onFirstPage: () => void;
	onLastPage: () => void;
	onNextPage: () => void;
	onPreviousPage: () => void;
	hasNextPage: boolean;
	hasPreviousPage: boolean;
	visiblePages: number[];
	className?: string;
}

export function Pagination({
	currentPage,
	totalPages,
	onPageChange,
	onFirstPage,
	onLastPage,
	onNextPage,
	onPreviousPage,
	hasNextPage,
	hasPreviousPage,
	visiblePages,
	className = "",
}: PaginationProps) {
	if (totalPages <= 1) {
		return null;
	}

	return (
		<div className={`flex items-center justify-center gap-2 ${className}`}>
			{/* First page */}
			<Button
				variant="outline"
				size="sm"
				onClick={onFirstPage}
				disabled={!hasPreviousPage}
				title="First page"
			>
				<ChevronsLeft className="h-4 w-4" />
			</Button>

			{/* Previous page */}
			<Button
				variant="outline"
				size="sm"
				onClick={onPreviousPage}
				disabled={!hasPreviousPage}
				title="Previous page"
			>
				<ChevronLeft className="h-4 w-4" />
			</Button>

			{/* Page numbers */}
			<div className="flex items-center gap-1">
				{visiblePages[0] > 1 && (
					<>
						<Button variant="outline" size="sm" onClick={() => onPageChange(1)}>
							1
						</Button>
						{visiblePages[0] > 2 && (
							<span className="px-2 text-muted-foreground">...</span>
						)}
					</>
				)}

				{visiblePages.map((page) => (
					<Button
						key={page}
						variant={page === currentPage ? "default" : "outline"}
						size="sm"
						onClick={() => onPageChange(page)}
						className="min-w-[40px]"
					>
						{page}
					</Button>
				))}

				{visiblePages[visiblePages.length - 1] < totalPages && (
					<>
						{visiblePages[visiblePages.length - 1] < totalPages - 1 && (
							<span className="px-2 text-muted-foreground">...</span>
						)}
						<Button
							variant="outline"
							size="sm"
							onClick={() => onPageChange(totalPages)}
						>
							{totalPages}
						</Button>
					</>
				)}
			</div>

			{/* Next page */}
			<Button
				variant="outline"
				size="sm"
				onClick={onNextPage}
				disabled={!hasNextPage}
				title="Next page"
			>
				<ChevronRight className="h-4 w-4" />
			</Button>

			{/* Last page */}
			<Button
				variant="outline"
				size="sm"
				onClick={onLastPage}
				disabled={!hasNextPage}
				title="Last page"
			>
				<ChevronsRight className="h-4 w-4" />
			</Button>
		</div>
	);
}
