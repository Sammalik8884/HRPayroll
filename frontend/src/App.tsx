import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProtectedRoute, PublicRoute } from '@/components/auth/RouteGuards';
import { AppLayout } from '@/components/layout/AppLayout';
import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { EmployeesPage } from '@/pages/employees/EmployeesPage';
import { CompaniesPage } from '@/pages/companies/CompaniesPage';
import { AttendancePage } from '@/pages/attendance/AttendancePage';
import { LeavesPage } from '@/pages/leaves/LeavesPage';
import { PayrollPage } from '@/pages/payroll/PayrollPage';
import { StubPage } from '@/pages/StubPage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 1000 * 60 * 5,
    },
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected app routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route path="/employees/new" element={<StubPage title="Add Employee" description="Create a new employee record" />} />
              <Route path="/employees/:id" element={<StubPage title="Employee Profile" description="View full employee details" />} />
              <Route path="/employees/:id/edit" element={<StubPage title="Edit Employee" description="Update employee information" />} />
              <Route path="/companies" element={<CompaniesPage />} />
              <Route path="/attendance" element={<AttendancePage />} />
              <Route path="/leaves" element={<LeavesPage />} />
              <Route path="/payroll" element={<PayrollPage />} />
              <Route path="/payroll/new" element={<StubPage title="Run Payroll" description="Process monthly salary for all employees" />} />
              <Route path="/departments" element={<StubPage title="Departments" description="Manage organizational departments" />} />
              <Route path="/designations" element={<StubPage title="Designations" description="Manage employee designations and job titles" />} />
              <Route path="/grades" element={<StubPage title="Grades" description="Manage salary grades and pay scales" />} />
              <Route path="/locations" element={<StubPage title="Locations" description="Manage office and branch locations" />} />
              <Route path="/shifts" element={<StubPage title="Shifts" description="Manage work shifts and schedules" />} />
              <Route path="/roles" element={<StubPage title="Roles & Permissions" description="Manage system roles and access control" />} />
              <Route path="/reports" element={<StubPage title="Reports" description="Generate HR and payroll reports" />} />
              <Route path="/settings" element={<StubPage title="Settings" description="Configure system preferences" />} />
            </Route>
          </Route>

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
