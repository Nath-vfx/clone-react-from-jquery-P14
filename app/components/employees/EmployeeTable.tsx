import { type Employee } from "~/stores/employeeStore";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { EmployeeRow } from "./EmployeeRow";
import { SortableHeader } from "./SortableHeader";
import { useTableSort } from "~/hooks/useTableSort";

interface EmployeeTableProps {
  employees: Employee[];
  onEdit?: (employee: Employee) => void;
  onDelete?: (employeeId: string) => void;
}

export function EmployeeTable({ employees, onEdit, onDelete }: EmployeeTableProps) {
  const { sortedData, sortConfig, requestSort } = useTableSort(employees);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <SortableHeader
              title="Employé"
              sortKey="lastName"
              currentSortKey={sortConfig.key}
              sortDirection={sortConfig.direction}
              onSort={requestSort}
            />
            <SortableHeader
              title="Département"
              sortKey="department"
              currentSortKey={sortConfig.key}
              sortDirection={sortConfig.direction}
              onSort={requestSort}
            />
            <SortableHeader
              title="Date de naissance"
              sortKey="dateOfBirth"
              currentSortKey={sortConfig.key}
              sortDirection={sortConfig.direction}
              onSort={requestSort}
            />
            <SortableHeader
              title="Date d'embauche"
              sortKey="startDate"
              currentSortKey={sortConfig.key}
              sortDirection={sortConfig.direction}
              onSort={requestSort}
            />
            <SortableHeader
              title="Adresse"
              sortKey="city"
              currentSortKey={sortConfig.key}
              sortDirection={sortConfig.direction}
              onSort={requestSort}
            />
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedData.map((employee) => (
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