import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { type Employee } from "~/stores/employeeStore";
import { TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";

interface EmployeeRowProps {
  employee: Employee;
  onEdit?: () => void;
  onDelete?: () => void;
}

const getDepartmentColor = (department: string) => {
  const colors: Record<string, string> = {
    "Sales": "bg-green-100 text-green-800 border-green-200",
    "Marketing": "bg-blue-100 text-blue-800 border-blue-200", 
    "Engineering": "bg-purple-100 text-purple-800 border-purple-200",
    "Human Resources": "bg-orange-100 text-orange-800 border-orange-200",
    "Legal": "bg-gray-100 text-gray-800 border-gray-200"
  };
  return colors[department] || "bg-gray-100 text-gray-800 border-gray-200";
};

const ensureDate = (date: Date | string): Date => {
  return date instanceof Date ? date : new Date(date);
};

const calculateAge = (birthDate: Date | string): number => {
  const birth = ensureDate(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }
  return age;
};

const calculateYearsOfService = (startDate: Date | string): string => {
  const start = ensureDate(startDate);
  const today = new Date();
  const years = today.getFullYear() - start.getFullYear();
  const months = today.getMonth() - start.getMonth();
  
  let totalMonths = years * 12 + months;
  if (today.getDate() < start.getDate()) {
    totalMonths--;
  }
  
  const serviceYears = Math.floor(totalMonths / 12);
  const serviceMonths = totalMonths % 12;
  
  if (serviceYears === 0) {
    return `${serviceMonths} mois`;
  } else if (serviceMonths === 0) {
    return `${serviceYears} an${serviceYears > 1 ? 's' : ''}`;
  } else {
    return `${serviceYears} an${serviceYears > 1 ? 's' : ''} ${serviceMonths} mois`;
  }
};

export function EmployeeRow({ employee, onEdit, onDelete }: EmployeeRowProps) {
  const age = calculateAge(employee.dateOfBirth);
  const yearsOfService = calculateYearsOfService(employee.startDate);
  
  return (
    <TableRow className="hover:bg-muted/50">
      <TableCell>
        <div>
          <div className="font-medium">{employee.firstName} {employee.lastName}</div>
          <div className="text-sm text-muted-foreground">ID: {employee.id.slice(0, 8)}</div>
        </div>
      </TableCell>
      <TableCell>
        <Badge className={getDepartmentColor(employee.department)}>
          {employee.department}
        </Badge>
      </TableCell>
      <TableCell>
        <div>
          <div>{format(ensureDate(employee.dateOfBirth), "dd/MM/yyyy", { locale: fr })}</div>
          <div className="text-sm text-muted-foreground">{age} ans</div>
        </div>
      </TableCell>
      <TableCell>
        <div>
          <div>{format(ensureDate(employee.startDate), "dd/MM/yyyy", { locale: fr })}</div>
          <div className="text-sm text-muted-foreground">{yearsOfService}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="text-sm max-w-[200px]">
          <div className="font-medium">{employee.street}</div>
          <div className="text-muted-foreground">
            {employee.city}, {employee.state}
          </div>
          <div className="text-muted-foreground">{employee.zipCode}</div>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={onEdit}>
            Modifier
          </Button>
          <Button variant="destructive" size="sm" onClick={onDelete}>
            Supprimer
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
}