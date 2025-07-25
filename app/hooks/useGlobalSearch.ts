import { useState, useMemo } from 'react';
import { type Employee } from '~/stores/employeeStore';
import { format } from 'date-fns';

export function useGlobalSearch(employees: Employee[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredEmployees = useMemo(() => {
    if (!searchQuery.trim()) {
      return employees;
    }

    const query = searchQuery.toLowerCase().trim();
    
    return employees.filter((employee) => {
      // Helper function to safely convert dates to strings
      const formatDate = (date: Date | string) => {
        try {
          const dateObj = date instanceof Date ? date : new Date(date);
          return format(dateObj, 'dd/MM/yyyy');
        } catch {
          return '';
        }
      };

      // Create searchable text from all employee fields
      const searchableFields = [
        employee.firstName,
        employee.lastName,
        employee.id,
        employee.department,
        formatDate(employee.dateOfBirth),
        formatDate(employee.startDate),
        employee.street,
        employee.city,
        employee.state,
        employee.zipCode,
        // Combined full name
        `${employee.firstName} ${employee.lastName}`,
        // Combined address
        `${employee.street} ${employee.city} ${employee.state} ${employee.zipCode}`,
      ];

      // Check if any field contains the search query
      return searchableFields.some((field) => 
        field && field.toString().toLowerCase().includes(query)
      );
    });
  }, [employees, searchQuery]);

  return {
    searchQuery,
    setSearchQuery,
    filteredEmployees,
    resultCount: filteredEmployees.length,
    hasResults: filteredEmployees.length > 0,
    isSearching: searchQuery.trim().length > 0
  };
}