import api from '@/lib/api';

// ─── Exact shapes from backend DTOs ───────────────────────────────────────────

export interface GradeDto {
  id: number;
  name: string;
  description: string;
  code: string;
  isActive: boolean;
  createdOn: string;
  createdBy: string;
}

export interface CreateGradeDto {
  name: string;
  description: string;
  code: string;
  isActive: boolean;
}

export interface UpdateGradeDto {
  name: string;
  description: string;
  code: string;
  isActive: boolean;
}

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T | null;
  errors: string[];
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const gradeApi = {
  /** GET /api/grade */
  getAll: () =>
    api
      .get<ApiResponse<GradeDto[]>>('/grade')
      .then((r) => r.data),

  /** GET /api/grade/:id */
  getById: (id: number) =>
    api
      .get<ApiResponse<GradeDto>>(`/grade/${id}`)
      .then((r) => r.data),

  /** POST /api/grade */
  create: (dto: CreateGradeDto) =>
    api
      .post<ApiResponse<GradeDto>>('/grade', dto)
      .then((r) => r.data),

  /** PUT /api/grade/:id */
  update: (id: number, dto: UpdateGradeDto) =>
    api
      .put<ApiResponse<GradeDto>>(`/grade/${id}`, dto)
      .then((r) => r.data),

  /** DELETE /api/grade/:id */
  remove: (id: number) =>
    api
      .delete<ApiResponse<null>>(`/grade/${id}`)
      .then((r) => r.data),
};
