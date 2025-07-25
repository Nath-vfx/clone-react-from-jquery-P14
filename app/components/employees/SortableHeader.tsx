import { ArrowUp, ArrowDown, ArrowUpDown } from "lucide-react";
import { TableHead } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { type SortDirection } from "~/hooks/useTableSort";

interface SortableHeaderProps {
  title: string;
  sortKey: string;
  currentSortKey: string;
  sortDirection: SortDirection;
  onSort: (key: string) => void;
  className?: string;
}

export function SortableHeader({
  title,
  sortKey,
  currentSortKey,
  sortDirection,
  onSort,
  className
}: SortableHeaderProps) {
  const isActive = currentSortKey === sortKey;

  const getSortIcon = () => {
    if (!isActive) {
      return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
    }
    
    if (sortDirection === 'asc') {
      return <ArrowUp className="h-4 w-4 text-foreground" />;
    }
    
    if (sortDirection === 'desc') {
      return <ArrowDown className="h-4 w-4 text-foreground" />;
    }
    
    return <ArrowUpDown className="h-4 w-4 text-muted-foreground" />;
  };

  const getSortLabel = () => {
    if (!isActive || !sortDirection) return "Sort";
    return sortDirection === 'asc' ? "Sort ascending" : "Sort descending";
  };

  return (
    <TableHead className={className}>
      <Button
        variant="ghost"
        onClick={() => onSort(sortKey)}
        className="h-auto p-0 font-semibold hover:bg-transparent hover:text-foreground flex items-center gap-2"
        title={getSortLabel()}
      >
        {title}
        {getSortIcon()}
      </Button>
    </TableHead>
  );
}