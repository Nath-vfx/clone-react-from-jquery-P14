import { Users } from "lucide-react";

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ 
  title = "Aucun employé trouvé", 
  description = "Commencez par ajouter des employés à votre base de données." 
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      <Users className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
      <p className="text-muted-foreground text-lg mb-2">
        {title}
      </p>
      <p className="text-sm text-muted-foreground">
        {description}
      </p>
    </div>
  );
}