import type { Route } from "./+types/employee-list";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Employee List" },
    { name: "description", content: "List of employees" },
  ];
}

export default function EmployeeList() {
  return (
    <div>
      <h1>Employee List</h1>
    </div>
  );
}