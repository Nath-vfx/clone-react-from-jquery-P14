import { useStore } from "@nanostores/react";
import { Link } from "react-router";
import { toast } from "sonner";
import { ArrowLeft, Plus } from "lucide-react";
import type { Route } from "./+types/employee-list";
import { $employees, employeeActions, type Employee } from "~/stores/employeeStore";
import { EmployeeTable } from "~/components/employees/EmployeeTable";
import { EmptyState } from "~/components/employees/EmptyState";
import { Button } from "~/components/ui/button";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Employee List" },
    { name: "description", content: "List of employees" },
  ];
}

export default function EmployeeList() {
  const employees = useStore($employees);
  const employeeList: Employee[] = Object.values(employees);

  const handleEdit = (employee: Employee) => {
    toast.info("Fonctionnalité de modification à venir", {
      description: `Modification de ${employee.firstName} ${employee.lastName}`,
    });
  };

  const handleDelete = (employeeId: string) => {
    const employee = employeeActions.getEmployeeById(employeeId);
    if (employee) {
      employeeActions.deleteEmployee(employeeId);
      toast.success("Employé supprimé", {
        description: `${employee.firstName} ${employee.lastName} a été supprimé.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Liste des Employés</h1>
            <div className="text-sm text-muted-foreground mt-1">
              {employeeList.length} employé{employeeList.length !== 1 ? 's' : ''}
            </div>
          </div>
          <Link to="/">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Ajouter un employé
            </Button>
          </Link>
        </div>

        {employeeList.length === 0 ? (
          <EmptyState />
        ) : (
          <EmployeeTable
            employees={employeeList}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}