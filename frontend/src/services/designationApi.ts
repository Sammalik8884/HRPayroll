import api from '@/lib/api';

// ─── Exact shapes from backend DTOs ───────────────────────────────────────────

export interface DesignationDto {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
}

export interface CreateDesignationDto {
  name: string;
  description: string;
}

export interface UpdateDesignationDto {
  name: string;
  description: string;
  isActive: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const designationApi = {
  /** GET /api/designation */
  getAll: () =>
    api
      .get<ApiResponse<DesignationDto[]>>('/designation')
      .then((r) => r.data),

  /** GET /api/designation/:id */
  getById: (id: number) =>
    api
      .get<ApiResponse<DesignationDto>>(`/designation/${id}`)
      .then((r) => r.data),

  /** POST /api/designation */
  create: (dto: CreateDesignationDto) =>
    api
      .post<ApiResponse<DesignationDto>>('/designation', dto)
      .then((r) => r.data),

  /** PUT /api/designation/:id */
  update: (id: number, dto: UpdateDesignationDto) =>
    api
      .put<ApiResponse<DesignationDto>>(`/designation/${id}`, dto)
      .then((r) => r.data),

  /** DELETE /api/designation/:id */
  remove: (id: number) =>
    api
      .delete<ApiResponse<null>>(`/designation/${id}`)
      .then((r) => r.data),
};
