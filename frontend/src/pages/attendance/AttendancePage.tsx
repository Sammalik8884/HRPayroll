import { Clock, Upload, Download } from 'lucide-react';

export function AttendancePage() {
  const today = new Date().toLocaleDateString('en-PK', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  
  const rows = [
    { name: 'Ahmed Khan', code: 'EMP-001', in: '09:02', out: '17:55', status: 'Present', late: '2 min' },
    { name: 'Sara Ali', code: 'EMP-002', in: '08:58', out: '18:05', status: 'Present', late: '—' },
    { name: 'Bilal Ahmed', code: 'EMP-003', in: '—', out: '—', status: 'Absent', late: '—' },
    { name: 'Fatima Malik', code: 'EMP-004', in: '10:30', out: '17:00', status: 'Late', late: '90 min' },
    { name: 'Usman Raza', code: 'EMP-005', in: '—', out: '—', status: 'On Leave', late: '—' },
  ];

  const statusBadge = (s: string) => {
    if (s === 'Present') return <span className="badge-success">{s}</span>;
    if (s === 'Late') return <span className="badge-warning">{s}</span>;
    if (s === 'Absent') return <span className="badge-error">{s}</span>;
    return <span className="badge-neutral">{s}</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.17px', marginBottom: 4 }}>Attendance</h1>
          <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)' }}>{today}</p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn-ghost" style={{ fontSize: 14, padding: '9px 14px' }}><Upload size={14} /> Import</button>
          <button className="btn-ghost" style={{ fontSize: 14, padding: '9px 14px' }}><Download size={14} /> Export</button>
        </div>
      </div>

      {/* Summary */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        {[
          { label: 'Present', value: 231, color: '#059669' },
          { label: 'Absent', value: 9, color: '#dc2626' },
          { label: 'Late', value: 4, color: '#d97706' },
          { label: 'On Leave', value: 4, color: '#64748b' },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: '16px 20px' }}>
            <div style={{ fontSize: 26, fontWeight: 500, color: s.color, letterSpacing: '-0.2px' }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'rgba(18,23,24,0.55)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div style={{ background: 'var(--color-paper)', borderRadius: 'var(--radius-cards)', border: '1px solid rgba(18,23,24,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(18,23,24,0.08)', display: 'flex', alignItems: 'center', gap: 12 }}>
          <Clock size={16} style={{ color: 'rgba(18,23,24,0.4)' }} />
          <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink)' }}>Today's Attendance</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
            <thead>
              <tr style={{ background: 'var(--color-linen)' }}>
                {['Employee', 'Code', 'Check In', 'Check Out', 'Late By', 'Status'].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(18,23,24,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '1px solid rgba(18,23,24,0.08)' }}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i} style={{ borderBottom: i < rows.length - 1 ? '1px solid rgba(18,23,24,0.06)' : 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-linen)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500 }}>{row.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(18,23,24,0.45)', fontFamily: 'monospace' }}>{row.code}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>{row.in}</td>
                  <td style={{ padding: '12px 16px', fontSize: 14 }}>{row.out}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(18,23,24,0.5)' }}>{row.late}</td>
                  <td style={{ padding: '12px 16px' }}>{statusBadge(row.status)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
