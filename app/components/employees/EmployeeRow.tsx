import { format } from "date-fns";
import { type Employee } from "~/stores/employeeStore";
import { TableCell, TableRow } from "~/components/ui/table";
import { Button } from "~/components/ui/button";

interface EmployeeRowProps {
  employee: Employee;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function EmployeeRow({ employee, onEdit, onDelete }: EmployeeRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium">
        {employee.lastName}
      </TableCell>
      <TableCell>{employee.firstName}</TableCell>
      <TableCell>{employee.department}</TableCell>
      <TableCell>
        {format(employee.dateOfBirth, "dd/MM/yyyy")}
      </TableCell>
      <TableCell>
        {format(employee.startDate, "dd/MM/yyyy")}
      </TableCell>
      <TableCell>
        <div className="text-sm">
          <div>{employee.street}</div>
          <div className="text-muted-foreground">
            {employee.city}, {employee.state} {employee.zipCode}
          </div>
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