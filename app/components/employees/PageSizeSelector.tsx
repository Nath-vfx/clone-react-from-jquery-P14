import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

interface PageSizeSelectorProps {
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  minSize?: number;
  maxSize?: number;
  totalItems: number;
  className?: string;
}

export function PageSizeSelector({
  pageSize,
  onPageSizeChange,
  minSize = 5,
  maxSize = 50,
  totalItems,
  className = ""
}: PageSizeSelectorProps) {
  // Generate page size options
  const generatePageSizeOptions = () => {
    const options = [];
    
    // Standard options: 5, 10, 20, 25, 50
    const standardSizes = [5, 10, 20, 25, 50];
    
    for (const size of standardSizes) {
      if (size >= minSize && size <= maxSize) {
        options.push(size);
      }
    }
    
    // Add current page size if it's not in standard options
    if (!options.includes(pageSize) && pageSize >= minSize && pageSize <= maxSize) {
      options.push(pageSize);
      options.sort((a, b) => a - b);
    }
    
    return options;
  };

  const pageSizeOptions = generatePageSizeOptions();

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      <span className="text-muted-foreground">Show</span>
      <Select
        value={pageSize.toString()}
        onValueChange={(value) => onPageSizeChange(parseInt(value, 10))}
      >
        <SelectTrigger className="w-auto min-w-[70px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {pageSizeOptions.map((size) => (
            <SelectItem key={size} value={size.toString()}>
              {size}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-muted-foreground">
        items per page
      </span>
    </div>
  );
}