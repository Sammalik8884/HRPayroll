import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Plus,
  Filter,
  ChevronLeft,
  ChevronRight,
  Users,
  Edit,
  Eye,
} from 'lucide-react';

// Mock employee data — replace with API calls
const mockEmployees = [
  { id: 1, code: 'EMP-001', name: 'Ahmed Khan', department: 'Engineering', designation: 'Senior Developer', grade: 'Grade A', status: 'Active', joining: '2022-03-15', salary: 180000 },
  { id: 2, code: 'EMP-002', name: 'Sara Ali', department: 'HR', designation: 'HR Manager', grade: 'Grade B', status: 'Active', joining: '2021-07-01', salary: 140000 },
  { id: 3, code: 'EMP-003', name: 'Bilal Ahmed', department: 'Finance', designation: 'Accountant', grade: 'Grade C', status: 'Active', joining: '2023-01-10', salary: 100000 },
  { id: 4, code: 'EMP-004', name: 'Fatima Malik', department: 'Engineering', designation: 'Junior Developer', grade: 'Grade C', status: 'Active', joining: '2023-06-20', salary: 90000 },
  { id: 5, code: 'EMP-005', name: 'Usman Raza', department: 'Sales', designation: 'Sales Executive', grade: 'Grade D', status: 'On Leave', joining: '2022-09-05', salary: 80000 },
  { id: 6, code: 'EMP-006', name: 'Ayesha Siddiqui', department: 'Marketing', designation: 'Marketing Lead', grade: 'Grade B', status: 'Active', joining: '2020-11-15', salary: 160000 },
  { id: 7, code: 'EMP-007', name: 'Zain ul Abideen', department: 'Engineering', designation: 'DevOps Engineer', grade: 'Grade B', status: 'Active', joining: '2021-04-20', salary: 155000 },
  { id: 8, code: 'EMP-008', name: 'Maria Khan', department: 'HR', designation: 'Recruiter', grade: 'Grade C', status: 'Inactive', joining: '2022-08-01', salary: 85000 },
];

const statusBadge = (status: string) => {
  if (status === 'Active') return <span className="badge-success">{status}</span>;
  if (status === 'On Leave') return <span className="badge-warning">{status}</span>;
  return <span className="badge-neutral">{status}</span>;
};

export function EmployeesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filtered = mockEmployees.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.code.toLowerCase().includes(search.toLowerCase()) ||
      e.department.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.17px', color: 'var(--color-ink)', marginBottom: 4 }}>
            Employees
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)' }}>
            Manage your workforce — {mockEmployees.length} employees total
          </p>
        </div>
        <Link to="/employees/new" className="btn-primary" style={{ fontSize: 14, padding: '10px 18px' }}>
          <Plus size={15} />
          Add Employee
        </Link>
      </div>

      {/* Filters */}
      <div className="card" style={{ padding: '16px 20px' }}>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 240px' }}>
            <Search
              size={15}
              style={{
                position: 'absolute',
                left: 12,
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'rgba(18,23,24,0.35)',
              }}
            />
            <input
              type="text"
              placeholder="Search by name, code, department…"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(18,23,24,0.12)',
                background: 'var(--color-linen)',
                fontSize: 14,
                color: 'var(--color-ink)',
                outline: 'none',
              }}
            />
          </div>
          <button
            className="btn-ghost"
            style={{ fontSize: 14, padding: '8px 14px', flexShrink: 0 }}
          >
            <Filter size={14} />
            Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        style={{
          background: 'var(--color-paper)',
          borderRadius: 'var(--radius-cards)',
          border: '1px solid rgba(18,23,24,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Desktop table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 700 }}>
            <thead>
              <tr style={{ background: 'var(--color-linen)' }}>
                {['Employee', 'Code', 'Department', 'Designation', 'Grade', 'Status', 'Joining Date', ''].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: '11px 16px',
                      textAlign: 'left',
                      fontSize: 12,
                      fontWeight: 600,
                      color: 'rgba(18,23,24,0.5)',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                      borderBottom: '1px solid rgba(18,23,24,0.08)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px 16px' }}>
                    <Users size={36} style={{ color: 'rgba(18,23,24,0.15)', margin: '0 auto 12px' }} />
                    <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.4)' }}>No employees found</p>
                  </td>
                </tr>
              ) : (
                paginated.map((emp, idx) => (
                  <tr
                    key={emp.id}
                    style={{
                      borderBottom: idx < paginated.length - 1 ? '1px solid rgba(18,23,24,0.06)' : 'none',
                      transition: 'background 0.1s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-linen)')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div
                          style={{
                            width: 34,
                            height: 34,
                            background: 'var(--color-apricot)',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: 13,
                            fontWeight: 600,
                            color: 'var(--color-ink)',
                            flexShrink: 0,
                          }}
                        >
                          {emp.name.charAt(0)}
                        </div>
                        <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)', whiteSpace: 'nowrap' }}>
                          {emp.name}
                        </span>
                      </div>
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <span style={{ fontSize: 13, color: 'rgba(18,23,24,0.5)', fontFamily: 'monospace' }}>
                        {emp.code}
                      </span>
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 14, color: 'var(--color-ink)', whiteSpace: 'nowrap' }}>
                      {emp.department}
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 14, color: 'rgba(18,23,24,0.65)', whiteSpace: 'nowrap' }}>
                      {emp.designation}
                    </td>
                    <td style={{ padding: '13px 16px', fontSize: 14, color: 'rgba(18,23,24,0.65)' }}>
                      {emp.grade}
                    </td>
                    <td style={{ padding: '13px 16px' }}>{statusBadge(emp.status)}</td>
                    <td style={{ padding: '13px 16px', fontSize: 13, color: 'rgba(18,23,24,0.5)', whiteSpace: 'nowrap' }}>
                      {new Date(emp.joining).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td style={{ padding: '13px 16px' }}>
                      <div style={{ display: 'flex', gap: 4 }}>
                        <Link
                          to={`/employees/${emp.id}`}
                          style={{
                            width: 30,
                            height: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid rgba(18,23,24,0.1)',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: 'rgba(18,23,24,0.5)',
                            textDecoration: 'none',
                          }}
                        >
                          <Eye size={13} />
                        </Link>
                        <Link
                          to={`/employees/${emp.id}/edit`}
                          style={{
                            width: 30,
                            height: 30,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 'var(--radius-lg)',
                            border: '1px solid rgba(18,23,24,0.1)',
                            background: 'transparent',
                            cursor: 'pointer',
                            color: 'rgba(18,23,24,0.5)',
                            textDecoration: 'none',
                          }}
                        >
                          <Edit size={13} />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'between',
              padding: '12px 16px',
              borderTop: '1px solid rgba(18,23,24,0.08)',
              gap: 12,
              flexWrap: 'wrap',
            }}
          >
            <span style={{ fontSize: 13, color: 'rgba(18,23,24,0.5)', flex: 1 }}>
              Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)} of {filtered.length}
            </span>
            <div style={{ display: 'flex', gap: 6 }}>
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(18,23,24,0.12)',
                  background: 'transparent',
                  cursor: page === 1 ? 'not-allowed' : 'pointer',
                  opacity: page === 1 ? 0.4 : 1,
                }}
              >
                <ChevronLeft size={14} />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <button
                  key={p}
                  onClick={() => setPage(p)}
                  style={{
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--radius-lg)',
                    border: p === page ? 'none' : '1px solid rgba(18,23,24,0.12)',
                    background: p === page ? 'var(--color-honey)' : 'transparent',
                    cursor: 'pointer',
                    fontSize: 13,
                    fontWeight: p === page ? 600 : 400,
                    color: 'var(--color-ink)',
                  }}
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                style={{
                  width: 32,
                  height: 32,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(18,23,24,0.12)',
                  background: 'transparent',
                  cursor: page === totalPages ? 'not-allowed' : 'pointer',
                  opacity: page === totalPages ? 0.4 : 1,
                }}
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
