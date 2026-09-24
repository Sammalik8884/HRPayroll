import { Calendar, CheckCircle, XCircle, Clock } from 'lucide-react';

export function LeavesPage() {
  const requests = [
    { name: 'Fatima Malik', type: 'Annual Leave', from: '2026-09-28', to: '2026-10-02', days: 5, status: 'Pending', applied: '2026-09-22' },
    { name: 'Usman Raza', type: 'Sick Leave', from: '2026-09-24', to: '2026-09-25', days: 2, status: 'Approved', applied: '2026-09-23' },
    { name: 'Ahmed Khan', type: 'Casual Leave', from: '2026-10-10', to: '2026-10-10', days: 1, status: 'Pending', applied: '2026-09-24' },
    { name: 'Sara Ali', type: 'Annual Leave', from: '2026-10-15', to: '2026-10-20', days: 6, status: 'Rejected', applied: '2026-09-20' },
  ];

  const badge = (s: string) => {
    if (s === 'Approved') return <span className="badge-success">{s}</span>;
    if (s === 'Pending') return <span className="badge-warning">{s}</span>;
    if (s === 'Rejected') return <span className="badge-error">{s}</span>;
    return <span className="badge-neutral">{s}</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.17px', marginBottom: 4 }}>Leave Management</h1>
          <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)' }}>Review and approve employee leave requests</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 12 }}>
        {[
          { label: 'Pending', value: 7, color: '#d97706', icon: Clock },
          { label: 'Approved', value: 23, color: '#059669', icon: CheckCircle },
          { label: 'Rejected', value: 4, color: '#dc2626', icon: XCircle },
          { label: 'Total Requests', value: 34, color: 'var(--color-ink)', icon: Calendar },
        ].map((s) => (
          <div key={s.label} className="card" style={{ padding: '16px 20px' }}>
            <s.icon size={16} style={{ color: s.color, marginBottom: 10 }} />
            <div style={{ fontSize: 26, fontWeight: 500, color: s.color, letterSpacing: '-0.2px' }}>{s.value}</div>
            <div style={{ fontSize: 13, color: 'rgba(18,23,24,0.55)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: 'var(--color-paper)', borderRadius: 'var(--radius-cards)', border: '1px solid rgba(18,23,24,0.08)', overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid rgba(18,23,24,0.08)' }}>
          <span style={{ fontSize: 15, fontWeight: 500 }}>Leave Requests</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 640 }}>
            <thead>
              <tr style={{ background: 'var(--color-linen)' }}>
                {['Employee', 'Leave Type', 'From', 'To', 'Days', 'Applied', 'Status', 'Action'].map((h) => (
                  <th key={h} style={{ padding: '10px 16px', textAlign: 'left', fontSize: 12, fontWeight: 600, color: 'rgba(18,23,24,0.5)', letterSpacing: '0.04em', textTransform: 'uppercase', borderBottom: '1px solid rgba(18,23,24,0.08)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {requests.map((r, i) => (
                <tr key={i} style={{ borderBottom: i < requests.length - 1 ? '1px solid rgba(18,23,24,0.06)' : 'none' }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-linen)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  <td style={{ padding: '12px 16px', fontSize: 14, fontWeight: 500 }}>{r.name}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(18,23,24,0.65)' }}>{r.type}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{r.from}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13 }}>{r.to}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, fontWeight: 500 }}>{r.days}</td>
                  <td style={{ padding: '12px 16px', fontSize: 13, color: 'rgba(18,23,24,0.45)' }}>{r.applied}</td>
                  <td style={{ padding: '12px 16px' }}>{badge(r.status)}</td>
                  <td style={{ padding: '12px 16px' }}>
                    {r.status === 'Pending' && (
                      <div style={{ display: 'flex', gap: 6 }}>
                        <button style={{ padding: '4px 10px', background: 'var(--color-honey)', border: 'none', borderRadius: 'var(--radius-lg)', cursor: 'pointer', fontSize: 12, fontWeight: 500 }}>
                          Approve
                        </button>
                        <button style={{ padding: '4px 10px', background: 'transparent', border: '1px solid rgba(18,23,24,0.15)', borderRadius: 'var(--radius-lg)', cursor: 'pointer', fontSize: 12 }}>
                          Reject
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
