import { useStore } from "@nanostores/react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Plus } from "lucide-react";
import type { Route } from "./+types/employee-list";
import { $employees, employeeActions, type Employee } from "~/stores/employeeStore";
import { PaginatedEmployeeTable } from "~/components/employees/PaginatedEmployeeTable";
import { EmptyState } from "~/components/employees/EmptyState";
import { SearchBar } from "~/components/employees/SearchBar";
import { Button } from "~/components/ui/button";
import { useGlobalSearch } from "~/hooks/useGlobalSearch";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Employee List" },
    { name: "description", content: "List of employees" },
  ];
}

export default function EmployeeList() {
  const employees = useStore($employees);
  const employeeList: Employee[] = Object.values(employees);
  
  const {
    searchQuery,
    setSearchQuery,
    filteredEmployees,
    resultCount,
    isSearching
  } = useGlobalSearch(employeeList);

  const handleEdit = (employee: Employee) => {
    toast.info("Edit functionality coming soon", {
      description: `Editing ${employee.firstName} ${employee.lastName}`,
    });
  };

  const handleDelete = (employeeId: string) => {
    const employee = employeeActions.getEmployeeById(employeeId);
    if (employee) {
      employeeActions.deleteEmployee(employeeId);
      toast.success("Employee deleted", {
        description: `${employee.firstName} ${employee.lastName} has been deleted.`,
      });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold">Employee List</h1>
            <div className="text-sm text-muted-foreground mt-1">
              {isSearching ? (
                `${resultCount} result${resultCount > 1 ? 's' : ''} of ${employeeList.length} employee${employeeList.length > 1 ? 's' : ''}`
              ) : (
                `${employeeList.length} employee${employeeList.length !== 1 ? 's' : ''}`
              )}
            </div>
          </div>
          <Link to="/">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Employee
            </Button>
          </Link>
        </div>

        {employeeList.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by name, department, address..."
              resultCount={resultCount}
              isSearching={isSearching}
            />
            
            {isSearching && resultCount === 0 ? (
              <EmptyState 
                title="No employees found"
                description={`No results for "${searchQuery}". Try modifying your search.`}
              />
            ) : (
              <PaginatedEmployeeTable
                employees={filteredEmployees}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}