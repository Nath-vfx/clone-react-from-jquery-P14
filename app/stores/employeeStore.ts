import { atom, map } from 'nanostores';

export interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  startDate: Date;
  department: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
}

// Store for all employees
export const $employees = map<Record<string, Employee>>({});

// Store for loading state
export const $isLoading = atom(false);

// Store for error messages
export const $error = atom<string | null>(null);

// Actions
export const employeeActions = {
  // Add a new employee
  addEmployee: (employee: Omit<Employee, 'id'>) => {
    const id = crypto.randomUUID();
    const newEmployee: Employee = {
      ...employee,
      id,
    };
    
    $employees.setKey(id, newEmployee);
    $error.set(null);
  },

  // Update an existing employee
  updateEmployee: (id: string, updates: Partial<Omit<Employee, 'id'>>) => {
    const currentEmployee = $employees.get()[id];
    if (currentEmployee) {
      $employees.setKey(id, { ...currentEmployee, ...updates });
      $error.set(null);
    } else {
      $error.set('Employee not found');
    }
  },

  // Delete an employee
  deleteEmployee: (id: string) => {
    const employees = $employees.get();
    if (employees[id]) {
      const newEmployees = { ...employees };
      delete newEmployees[id];
      $employees.set(newEmployees);
      $error.set(null);
    } else {
      $error.set('Employee not found');
    }
  },

  // Get all employees as array
  getAllEmployees: (): Employee[] => {
    return Object.values($employees.get());
  },

  // Get employee by id
  getEmployeeById: (id: string): Employee | undefined => {
    return $employees.get()[id];
  },

  // Clear all employees
  clearAllEmployees: () => {
    $employees.set({});
    $error.set(null);
  },

  // Set loading state
  setLoading: (loading: boolean) => {
    $isLoading.set(loading);
  },

  // Set error
  setError: (error: string | null) => {
    $error.set(error);
  },

  // Clear error
  clearError: () => {
    $error.set(null);
  }
};

// Computed store for employees count
export const $employeesCount = atom(0);

// Update count when employees change
$employees.subscribe((employees) => {
  $employeesCount.set(Object.keys(employees).length);
});