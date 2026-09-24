import { useAuthStore } from '@/store/authStore';
import {
  Users,
  Clock,
  Calendar,
  CreditCard,
  TrendingUp,
  Building2,
  ArrowUpRight,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  icon: React.ElementType;
  trend?: string;
  trendUp?: boolean;
  to?: string;
}

function StatCard({ label, value, sub, icon: Icon, trend, trendUp, to }: StatCardProps) {
  const inner = (
    <div
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        cursor: to ? 'pointer' : 'default',
        transition: 'border-color 0.15s',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={(e) => {
        if (to) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(18,23,24,0.2)';
      }}
      onMouseLeave={(e) => {
        if (to) (e.currentTarget as HTMLElement).style.borderColor = 'rgba(18,23,24,0.08)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div
          style={{
            width: 40,
            height: 40,
            background: 'var(--color-linen)',
            borderRadius: 'var(--radius-lg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <Icon size={18} style={{ color: 'var(--color-ink)' }} />
        </div>
        {to && <ArrowUpRight size={15} style={{ color: 'rgba(18,23,24,0.3)' }} />}
      </div>
      <div>
        <div
          style={{
            fontSize: 29,
            fontWeight: 500,
            letterSpacing: '-0.29px',
            color: 'var(--color-ink)',
            lineHeight: 1,
            marginBottom: 4,
          }}
        >
          {value}
        </div>
        <div style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)', fontWeight: 400 }}>{label}</div>
        {sub && (
          <div style={{ fontSize: 12, color: 'rgba(18,23,24,0.4)', marginTop: 2 }}>{sub}</div>
        )}
      </div>
      {trend && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            fontSize: 12,
            color: trendUp ? '#059669' : '#dc2626',
            fontWeight: 500,
          }}
        >
          <TrendingUp size={12} />
          {trend}
        </div>
      )}
    </div>
  );

  return to ? <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>{inner}</Link> : inner;
}

const quickActions = [
  { label: 'Add Employee', to: '/employees/new', icon: Users },
  { label: 'Run Payroll', to: '/payroll/new', icon: CreditCard },
  { label: 'Mark Attendance', to: '/attendance', icon: Clock },
  { label: 'Approve Leaves', to: '/leaves', icon: Calendar },
];

const recentActivity = [
  { text: 'Payroll run completed for August 2026', time: '2 hours ago', type: 'success' },
  { text: '3 leave requests pending approval', time: '4 hours ago', type: 'warning' },
  { text: 'New employee Ahmed Khan added', time: 'Yesterday', type: 'info' },
  { text: 'Attendance report generated', time: '2 days ago', type: 'info' },
  { text: 'Salary increment approved for Grade A', time: '3 days ago', type: 'success' },
];

export function DashboardPage() {
  const { user } = useAuthStore();

  const stats = [
    { label: 'Total Employees', value: 248, sub: '12 added this month', icon: Users, trend: '+5.2% vs last month', trendUp: true, to: '/employees' },
    { label: 'Present Today', value: 231, sub: '17 absent', icon: Clock, to: '/attendance' },
    { label: 'Pending Leaves', value: 7, sub: 'Awaiting approval', icon: Calendar, to: '/leaves' },
    { label: 'Departments', value: 14, sub: 'Active departments', icon: Building2, to: '/departments' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      {/* Header */}
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 29,
                fontWeight: 500,
                letterSpacing: '-0.29px',
                color: 'var(--color-ink)',
                marginBottom: 4,
              }}
            >
              Good morning, {user?.fullName?.split(' ')[0] || 'there'} 👋
            </h1>
            <p style={{ fontSize: 15, color: 'rgba(18,23,24,0.55)' }}>
              Here's what's happening at your organization today.
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <Link to="/payroll/new" className="btn-primary" style={{ fontSize: 14, padding: '10px 18px' }}>
              <CreditCard size={15} />
              Run Payroll
            </Link>
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 16,
        }}
      >
        {stats.map((s) => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Two-column section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 16,
        }}
      >
        {/* Quick actions */}
        <div className="card">
          <h2
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--color-ink)',
              marginBottom: 16,
              letterSpacing: '-0.05px',
            }}
          >
            Quick Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {quickActions.map(({ label, to, icon: Icon }) => (
              <Link
                key={label}
                to={to}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid rgba(18,23,24,0.08)',
                  textDecoration: 'none',
                  color: 'var(--color-ink)',
                  fontSize: 14,
                  fontWeight: 400,
                  transition: 'background 0.12s, border-color 0.12s',
                  background: 'var(--color-paper)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'var(--color-linen)';
                  e.currentTarget.style.borderColor = 'rgba(18,23,24,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--color-paper)';
                  e.currentTarget.style.borderColor = 'rgba(18,23,24,0.08)';
                }}
              >
                <div
                  style={{
                    width: 34,
                    height: 34,
                    background: 'var(--color-linen)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={15} style={{ color: 'var(--color-ink)' }} />
                </div>
                {label}
                <ArrowUpRight size={13} style={{ marginLeft: 'auto', color: 'rgba(18,23,24,0.3)' }} />
              </Link>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="card">
          <h2
            style={{
              fontSize: 16,
              fontWeight: 500,
              color: 'var(--color-ink)',
              marginBottom: 16,
              letterSpacing: '-0.05px',
            }}
          >
            Recent Activity
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            {recentActivity.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 10,
                  padding: '10px 0',
                  borderBottom: idx < recentActivity.length - 1 ? '1px solid rgba(18,23,24,0.06)' : 'none',
                }}
              >
                <div style={{ marginTop: 1, flexShrink: 0 }}>
                  {item.type === 'success' && <CheckCircle size={15} style={{ color: '#059669' }} />}
                  {item.type === 'warning' && <AlertCircle size={15} style={{ color: '#d97706' }} />}
                  {item.type === 'info' && (
                    <div
                      style={{
                        width: 15,
                        height: 15,
                        borderRadius: '50%',
                        background: 'rgba(18,23,24,0.12)',
                      }}
                    />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 13, color: 'var(--color-ink)', lineHeight: 1.4 }}>{item.text}</p>
                  <p style={{ fontSize: 12, color: 'rgba(18,23,24,0.4)', marginTop: 2 }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Payroll summary */}
      <div className="card" style={{ background: 'var(--color-graphite)' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 20,
          }}
        >
          <div>
            <div className="pill-tag" style={{ marginBottom: 12 }}>
              September 2026
            </div>
            <h2
              style={{
                fontSize: 24,
                fontWeight: 500,
                color: 'var(--color-paper)',
                letterSpacing: '-0.17px',
                marginBottom: 6,
              }}
            >
              Payroll Overview
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)' }}>
              Last payroll run: 01 Sep 2026
            </p>
          </div>

          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Gross Salary', value: 'PKR 8.4M' },
              { label: 'Deductions', value: 'PKR 1.2M' },
              { label: 'Net Payout', value: 'PKR 7.2M' },
            ].map((item) => (
              <div key={item.label} style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-paper)', letterSpacing: '-0.17px' }}>
                  {item.value}
                </div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginTop: 2 }}>{item.label}</div>
              </div>
            ))}
          </div>

          <Link to="/payroll" className="btn-primary" style={{ fontSize: 14, padding: '10px 18px' }}>
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
