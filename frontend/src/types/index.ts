// Auth types
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginResponse {
  fullName: string;
  userId: number;
  accessToken: string;
  refreshToken: string;
  email: string;
  expiresAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Company types
export interface Company {
  id: number;
  name: string;
  shortName: string;
  ntn: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  isActive: boolean;
  createdAt: string;
}

export interface CreateCompanyDto {
  name: string;
  shortName: string;
  ntn: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
}

export interface UpdateCompanyDto {
  name: string;
  shortName: string;
  ntn: string;
  address: string;
  phone: string;
  email: string;
  website?: string;
  logo?: string;
  isActive: boolean;
}

// Employee types
export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  fatherName: string;
  fullName?: string;
  dateOfBirth: string;
  gender: number;
  cnic: string;
  cnicExpiry?: string;
  personalEmail?: string;
  personalPhone?: string;
  permanentAddress?: string;
  currentAddress?: string;
  bloodGroup?: string;
  joiningDate: string;
  confirmationDate?: string;
  resignationDate?: string;
  terminationDate?: string;
  departmentId: number;
  department?: { name: string };
  designationId: number;
  designation?: { title: string };
  gradeId: number;
  grade?: { name: string };
  shiftId?: number;
  shift?: { name: string };
  sectionId?: number;
  section?: { name: string };
  employeeStatusId: number;
  employeeStatus?: { name: string };
  reportingManagerId?: number;
  basicSalary: number;
  bankName?: string;
  bankAccountNumber?: string;
  iban?: string;
  taxNumber?: string;
  photoPath?: string;
  isActive: boolean;
}

// Dashboard stats
export interface DashboardStats {
  totalEmployees: number;
  activeEmployees: number;
  departments: number;
  pendingLeaves: number;
  payrollRuns: number;
  presentToday: number;
}

// Leave types
export interface LeaveType {
  id: number;
  name: string;
  code: string;
  isPaid: boolean;
  maxDays: number;
}

// Attendance
export interface Attendance {
  id: number;
  employeeId: number;
  employee?: { firstName: string; lastName: string; employeeCode: string };
  date: string;
  checkIn?: string;
  checkOut?: string;
  status: number;
  overtimeHours: number;
  lateMinutes: number;
  remarks?: string;
}

// Department
export interface Department {
  id: number;
  name: string;
  code: string;
  companyId: number;
  company?: { name: string };
  parentDepartmentId?: number;
  headOfDepartmentId?: number;
  isActive: boolean;
}

// Designation
export interface Designation {
  id: number;
  title: string;
  code: string;
  isActive: boolean;
}

// Grade
export interface Grade {
  id: number;
  name: string;
  code: string;
  basicMin: number;
  basicMax: number;
  isActive: boolean;
}

// Payroll
export interface PayrollRun {
  id: number;
  month: number;
  year: number;
  status: number;
  totalGross: number;
  totalDeductions: number;
  totalNet: number;
  createdAt: string;
}

// User auth state
export interface AuthUser {
  userId: number;
  fullName: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}
