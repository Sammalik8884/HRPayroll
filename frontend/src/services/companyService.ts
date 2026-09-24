import api from '@/lib/api';
import type { Company, CreateCompanyDto, UpdateCompanyDto, ApiResponse } from '@/types';

export const companyService = {
  getAll: () =>
    api.get<ApiResponse<Company[]>>('/company').then((r) => r.data),

  getById: (id: number) =>
    api.get<ApiResponse<Company>>(`/company/${id}`).then((r) => r.data),

  create: (data: CreateCompanyDto) =>
    api.post<ApiResponse<Company>>('/company', data).then((r) => r.data),

  update: (id: number, data: UpdateCompanyDto) =>
    api.put<ApiResponse<Company>>(`/company/${id}`, data).then((r) => r.data),

  delete: (id: number) =>
    api.delete<ApiResponse<null>>(`/company/${id}`).then((r) => r.data),
};
