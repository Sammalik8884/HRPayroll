import { Play, CheckCircle, AlertCircle } from 'lucide-react';

export function PayrollPage() {
  const runs = [
    { month: 'September 2026', employees: 248, gross: 8400000, deductions: 1200000, net: 7200000, status: 'Draft' },
    { month: 'August 2026', employees: 245, gross: 8250000, deductions: 1175000, net: 7075000, status: 'Finalized' },
    { month: 'July 2026', employees: 244, gross: 8200000, deductions: 1150000, net: 7050000, status: 'Finalized' },
    { month: 'June 2026', employees: 240, gross: 8000000, deductions: 1100000, net: 6900000, status: 'Finalized' },
  ];

  const fmt = (n: number) => `PKR ${(n / 1000000).toFixed(1)}M`;

  const badge = (s: string) => {
    if (s === 'Finalized') return <span className="badge-success">{s}</span>;
    if (s === 'Draft') return <span className="badge-warning">{s}</span>;
    return <span className="badge-neutral">{s}</span>;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.17px', marginBottom: 4 }}>Payroll</h1>
          <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)' }}>Manage monthly payroll runs and salary slips</p>
        </div>
        <button className="btn-primary" style={{ fontSize: 14, padding: '10px 18px' }}>
          <Play size={14} /> Run Payroll
        </button>
      </div>

      {/* Payroll runs */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {runs.map((run, i) => (
          <div key={i} className="card" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 42, height: 42, background: run.status === 'Finalized' ? '#d1fae5' : 'var(--color-apricot)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {run.status === 'Finalized'
                    ? <CheckCircle size={18} style={{ color: '#059669' }} />
                    : <AlertCircle size={18} style={{ color: '#d97706' }} />}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink)' }}>{run.month}</div>
                  <div style={{ fontSize: 13, color: 'rgba(18,23,24,0.45)', marginTop: 2 }}>{run.employees} employees</div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap' }}>
                {[
                  { label: 'Gross', value: fmt(run.gross) },
                  { label: 'Deductions', value: fmt(run.deductions) },
                  { label: 'Net', value: fmt(run.net) },
                ].map(({ label, value }) => (
                  <div key={label} style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: 16, fontWeight: 500, color: 'var(--color-ink)', letterSpacing: '-0.05px' }}>{value}</div>
                    <div style={{ fontSize: 12, color: 'rgba(18,23,24,0.4)' }}>{label}</div>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {badge(run.status)}
                <button className="btn-ghost" style={{ fontSize: 13, padding: '7px 14px' }}>
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
