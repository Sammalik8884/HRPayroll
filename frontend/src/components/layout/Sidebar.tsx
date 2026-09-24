import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Building2,
  Calendar,
  Clock,
  CreditCard,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Briefcase,
  Award,
  BarChart3,
  UserCog,
  MapPin,
  GitBranch,
  Menu,
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { authService } from '@/services/authService';

const navItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    to: '/dashboard',
  },
  {
    label: 'Employees',
    icon: Users,
    to: '/employees',
  },
  {
    label: 'Attendance',
    icon: Clock,
    to: '/attendance',
  },
  {
    label: 'Leaves',
    icon: Calendar,
    to: '/leaves',
  },
  {
    label: 'Payroll',
    icon: CreditCard,
    to: '/payroll',
  },
  {
    divider: true,
    label: 'Organization',
  },
  {
    label: 'Companies',
    icon: Building2,
    to: '/companies',
  },
  {
    label: 'Departments',
    icon: GitBranch,
    to: '/departments',
  },
  {
    label: 'Designations',
    icon: Award,
    to: '/designations',
  },
  {
    label: 'Grades',
    icon: BarChart3,
    to: '/grades',
  },
  {
    label: 'Locations',
    icon: MapPin,
    to: '/locations',
  },
  {
    label: 'Shifts',
    icon: Clock,
    to: '/shifts',
  },
  {
    divider: true,
    label: 'System',
  },
  {
    label: 'Roles',
    icon: UserCog,
    to: '/roles',
  },
  {
    label: 'Reports',
    icon: Briefcase,
    to: '/reports',
  },
  {
    label: 'Settings',
    icon: Settings,
    to: '/settings',
  },
];

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
      try {
        await authService.logout(refreshToken);
      } catch {
        // silent
      }
    }
    logout();
    navigate('/login');
  };

  return (
    <aside
      style={{
        width: collapsed ? 72 : 260,
        minHeight: '100vh',
        background: 'var(--color-paper)',
        borderRight: '1px solid rgba(18,23,24,0.08)',
        display: 'flex',
        flexDirection: 'column',
        transition: 'width 0.2s ease',
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        zIndex: 40,
        overflowX: 'hidden',
        overflowY: 'auto',
      }}
    >
      {/* Logo + toggle */}
      <div
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: collapsed ? 'center' : 'space-between',
          padding: collapsed ? '0 16px' : '0 20px',
          borderBottom: '1px solid rgba(18,23,24,0.08)',
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                background: 'var(--color-honey)',
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: 16,
                color: 'var(--color-ink)',
              }}
            >
              E
            </div>
            <span
              style={{
                fontWeight: 700,
                fontSize: 15,
                color: 'var(--color-ink)',
                letterSpacing: '-0.3px',
                whiteSpace: 'nowrap',
              }}
            >
              Enterprise HRM
            </span>
          </div>
        )}
        {collapsed && (
          <div
            style={{
              width: 32,
              height: 32,
              background: 'var(--color-honey)',
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 16,
              color: 'var(--color-ink)',
            }}
          >
            E
          </div>
        )}
        {!collapsed && (
          <button
            onClick={onToggle}
            style={{
              background: 'none',
              border: '1px solid rgba(18,23,24,0.1)',
              borderRadius: 8,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--color-ink)',
            }}
          >
            <ChevronLeft size={14} />
          </button>
        )}
        {collapsed && (
          <button
            onClick={onToggle}
            style={{
              cursor: 'pointer',
              color: 'var(--color-ink)',
              position: 'absolute',
              right: -12,
              top: 20,
              background: 'var(--color-paper)',
              border: '1px solid rgba(18,23,24,0.1)',
              borderRadius: '50%',
              width: 24,
              height: 24,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={12} />
          </button>
        )}
      </div>

      {/* Nav items */}
      <nav style={{ flex: 1, padding: '12px 0', overflowY: 'auto' }}>
        {navItems.map((item, idx) => {
          if ('divider' in item && item.divider) {
            return (
              <div
                key={idx}
                style={{
                  padding: collapsed ? '16px 0 4px' : '16px 20px 4px',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'rgba(18,23,24,0.35)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                }}
              >
                {!collapsed && item.label}
                {collapsed && <div style={{ height: 1, background: 'rgba(18,23,24,0.08)', margin: '0 12px' }} />}
              </div>
            );
          }

          const Icon = item.icon!;
          return (
            <NavLink
              key={item.to}
              to={item.to!}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: collapsed ? '9px 0' : '9px 20px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                borderRadius: 'var(--radius-xl)',
                margin: '1px 8px',
                textDecoration: 'none',
                fontSize: 14,
                fontWeight: isActive ? 500 : 400,
                color: isActive ? 'var(--color-ink)' : 'rgba(18,23,24,0.6)',
                background: isActive ? 'var(--color-linen)' : 'transparent',
                transition: 'background 0.12s, color 0.12s',
              })}
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={17}
                    style={{
                      flexShrink: 0,
                      color: isActive ? 'var(--color-ink)' : 'rgba(18,23,24,0.45)',
                    }}
                  />
                  {!collapsed && (
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.label}
                    </span>
                  )}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* User footer */}
      <div
        style={{
          borderTop: '1px solid rgba(18,23,24,0.08)',
          padding: collapsed ? '12px 8px' : '12px 16px',
          flexShrink: 0,
        }}
      >
        {!collapsed && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              marginBottom: 8,
            }}
          >
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
                fontWeight: 700,
                color: 'var(--color-ink)',
                flexShrink: 0,
              }}
            >
              {user?.fullName?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div style={{ overflow: 'hidden', flex: 1 }}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.fullName || 'User'}
              </div>
              <div
                style={{
                  fontSize: 12,
                  color: 'rgba(18,23,24,0.5)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                {user?.email}
              </div>
            </div>
          </div>
        )}
        <button
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            width: '100%',
            padding: collapsed ? '8px 0' : '8px 10px',
            justifyContent: collapsed ? 'center' : 'flex-start',
            borderRadius: 'var(--radius-lg)',
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            fontSize: 14,
            color: 'rgba(18,23,24,0.55)',
            transition: 'background 0.12s',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--color-linen)')}
          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
        >
          <LogOut size={15} style={{ flexShrink: 0 }} />
          {!collapsed && <span>Log out</span>}
        </button>
      </div>
    </aside>
  );
}

// Mobile top bar
export function TopBar({ onMenuToggle }: { onMenuToggle: () => void }) {
  const { user } = useAuthStore();
  return (
    <header
      style={{
        height: 60,
        background: 'var(--color-paper)',
        borderBottom: '1px solid rgba(18,23,24,0.08)',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: 12,
        position: 'sticky',
        top: 0,
        zIndex: 30,
      }}
    >
      <button
        onClick={onMenuToggle}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          color: 'var(--color-ink)',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Menu size={20} />
      </button>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flex: 1 }}>
        <div
          style={{
            width: 26,
            height: 26,
            background: 'var(--color-honey)',
            borderRadius: 6,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 700,
            fontSize: 13,
            color: 'var(--color-ink)',
          }}
        >
          E
        </div>
        <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-ink)' }}>Enterprise HRM</span>
      </div>
      <div
        style={{
          width: 32,
          height: 32,
          background: 'var(--color-apricot)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 13,
          fontWeight: 700,
          color: 'var(--color-ink)',
        }}
      >
        {user?.fullName?.charAt(0).toUpperCase() || 'U'}
      </div>
    </header>
  );
}
