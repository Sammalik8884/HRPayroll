import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar, TopBar } from './Sidebar';

export function AppLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const sidebarWidth = isMobile ? 0 : collapsed ? 72 : 260;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-parchment)' }}>
      {/* Desktop sidebar */}
      {!isMobile && (
        <Sidebar collapsed={collapsed} onToggle={() => setCollapsed(!collapsed)} />
      )}

      {/* Mobile drawer overlay */}
      {isMobile && mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(18,23,24,0.4)',
              zIndex: 39,
            }}
          />
          <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50 }}>
            <Sidebar collapsed={false} onToggle={() => setMobileOpen(false)} />
          </div>
        </>
      )}

      {/* Main content */}
      <div
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : sidebarWidth,
          transition: 'margin-left 0.2s ease',
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {isMobile && <TopBar onMenuToggle={() => setMobileOpen(true)} />}

        <main
          style={{
            flex: 1,
            padding: isMobile ? '20px 16px' : '32px',
            maxWidth: '100%',
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
