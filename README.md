# HRnet - Employee Management System

A modern employee management application built with React Router, providing a comprehensive solution for managing employee data with advanced search, filtering, and pagination capabilities.

## Features

- 👥 **Employee Management**: Add, view, and delete employees
- 🔍 **Advanced Search**: Search employees by name, department, or address
- 📊 **Data Table**: Sortable columns with pagination support
- 🎨 **Modern UI**: Built with TailwindCSS and Radix UI components
- 📱 **Responsive Design**: Works seamlessly on desktop and mobile
- 💾 **Local Storage**: Persistent data storage in the browser
- 🔒 **TypeScript**: Full type safety throughout the application
- ⚡️ **Fast Development**: Hot Module Replacement (HMR) support

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Usage

### Employee Management

The application provides two main pages:

#### Home Page (`/`)
- **Add New Employee**: Complete form with personal information, address, and employment details
- **Form Validation**: Real-time validation with error messages
- **Date Picker**: User-friendly date selection for birth date and start date
- **Department Selection**: Dropdown with predefined departments
- **State Selection**: US states dropdown for address information

#### Employee List Page (`/employee-list`)
- **View All Employees**: Comprehensive table with employee information
- **Search Functionality**: Global search across name, department, and address fields
- **Sorting**: Click column headers to sort data (ascending/descending)
- **Pagination**: Navigate through large datasets with customizable page sizes
- **Delete Employees**: Remove employees with confirmation
- **Employee Count**: Real-time count of total and filtered employees

### Key Features

#### Search and Filtering
- **Global Search**: Type in the search bar to filter employees by:
  - First name and last name
  - Department
  - Address components (street, city, state, zip code)
- **Real-time Results**: Search results update as you type
- **Clear Indicators**: Shows result count and total employees

#### Data Table Features
- **Sortable Columns**: Click any column header to sort
- **Pagination Controls**: 
  - Navigate between pages
  - Choose page size (10, 25, 50, 100 entries)
  - Jump to first/last page
- **Responsive Design**: Table adapts to different screen sizes
- **Employee Information Display**:
  - Personal details (name, age, years of service)
  - Contact information
  - Department with color-coded badges
  - Complete address

#### Data Persistence
- **Local Storage**: All employee data is stored in browser's local storage
- **Automatic Saving**: Changes are saved immediately
- **Data Retention**: Data persists between browser sessions

### Navigation
- **Home to Employee List**: Click "View Employees" button on home page
- **Employee List to Home**: Click "Add Employee" button on employee list page
- **Responsive Navigation**: Works seamlessly on all device sizes

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```

## Technology Stack

### Frontend
- **React 19**: Latest React version with modern features
- **React Router 7**: File-based routing and server-side rendering
- **TypeScript**: Full type safety and better developer experience
- **TailwindCSS 4**: Utility-first CSS framework for styling
- **Radix UI**: Accessible, unstyled UI components
- **Lucide React**: Beautiful, customizable icons

### State Management
- **Nanostores**: Lightweight state management solution
- **React Hook Form**: Forms with validation
- **Zod**: Runtime type validation

### UI Components
- **Sonner**: Toast notifications
- **React Day Picker**: Date selection component
- **Class Variance Authority**: Dynamic class name generation

### Development Tools
- **Vite**: Fast build tool and development server
- **Hot Module Replacement**: Instant updates during development
- **TypeScript Compiler**: Type checking and code generation

### Data Storage
- **Browser Local Storage**: Client-side data persistence
- **JSON Serialization**: Efficient data storage format

## Styling

This application uses [Tailwind CSS](https://tailwindcss.com/) for styling with a custom design system built on top of Radix UI components. The styling includes:

- **Responsive Design**: Mobile-first approach with responsive breakpoints
- **Dark Mode Support**: Built-in theme switching capabilities
- **Accessible Components**: ARIA-compliant UI elements
- **Custom Color Palette**: Consistent color scheme throughout the app
- **Component Variants**: Flexible styling with class-variance-authority

---

**HRnet** - A modern employee management system built with React Router, demonstrating best practices for building scalable React applications with TypeScript, advanced state management, and beautiful UI components.
