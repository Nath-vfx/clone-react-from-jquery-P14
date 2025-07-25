import { Search, X } from "lucide-react";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
  isSearching?: boolean;
}

export function SearchBar({ 
  value, 
  onChange, 
  placeholder = "Rechercher un employé...",
  resultCount,
  isSearching = false
}: SearchBarProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className="relative w-full max-w-sm">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-10 pr-10"
        />
        {value && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 h-auto -translate-y-1/2 p-1 hover:bg-transparent"
            title="Effacer la recherche"
          >
            <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
          </Button>
        )}
      </div>
      
      {isSearching && (
        <div className="mt-2 text-sm text-muted-foreground">
          {resultCount === 0 ? (
            "Aucun résultat trouvé"
          ) : (
            `${resultCount} résultat${resultCount > 1 ? 's' : ''} trouvé${resultCount > 1 ? 's' : ''}`
          )}
        </div>
      )}
    </div>
  );
}