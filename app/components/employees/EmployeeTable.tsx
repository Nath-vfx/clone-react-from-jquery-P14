import { type Employee } from "~/stores/employeeStore";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { EmployeeRow } from "./EmployeeRow";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (employeeId: string) => void;
}

export function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Prénom</TableHead>
            <TableHead>Département</TableHead>
            <TableHead>Date de naissance</TableHead>
            <TableHead>Date d'embauche</TableHead>
            <TableHead>Adresse</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            <EmployeeRow
              key={employee.id}
              employee={employee}
              onEdit={() => onEdit?.(employee)}
              onDelete={() => onDelete?.(employee.id)}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}