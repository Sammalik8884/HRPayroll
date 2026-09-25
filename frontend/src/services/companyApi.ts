import api from '@/lib/api';

// ─── Exact shapes from the backend DTOs ───────────────────────────────────────

export interface CompanyDto {
  id: number;
  name: string;
  address: string;
  phone: string;
  email: string;
  logoPath: string;
  isActive: boolean;
}

export interface CreateCompanyDto {
  name: string;
  address: string;
  phone: string;
  email: string;
  logoPath: string;
}

export interface UpdateCompanyDto {
  name: string;
  address: string;
  phone: string;
  email: string;
  logoPath: string;
  isActive: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const companyApi = {
  /** GET /api/companies */
  getAll: () =>
    api
      .get<ApiResponse<CompanyDto[]>>('/companies')
      .then((r) => r.data),

  /** GET /api/companies/:id */
  getById: (id: number) =>
    api
      .get<ApiResponse<CompanyDto>>(`/companies/${id}`)
      .then((r) => r.data),

  /** POST /api/companies */
  create: (dto: CreateCompanyDto) =>
    api
      .post<ApiResponse<CompanyDto>>('/companies', dto)
      .then((r) => r.data),

  /** PUT /api/companies/:id */
  update: (id: number, dto: UpdateCompanyDto) =>
    api
      .put<ApiResponse<CompanyDto>>(`/companies/${id}`, dto)
      .then((r) => r.data),

  /** DELETE /api/companies/:id */
  remove: (id: number) =>
    api
      .delete<ApiResponse<null>>(`/companies/${id}`)
      .then((r) => r.data),
};
