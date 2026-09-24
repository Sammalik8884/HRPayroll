import { Construction } from 'lucide-react';

interface StubPageProps {
  title: string;
  description?: string;
}

export function StubPage({ title, description }: StubPageProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h1 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.17px', marginBottom: 4 }}>{title}</h1>
        {description && <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)' }}>{description}</p>}
      </div>
      <div
        className="card"
        style={{
          padding: '80px 40px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            background: 'var(--color-apricot)',
            borderRadius: 'var(--radius-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Construction size={24} style={{ color: 'var(--color-ink)' }} />
        </div>
        <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-ink)' }}>Coming Soon</h2>
        <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.45)', maxWidth: 340 }}>
          This module is under development and will be available in the next release.
        </p>
      </div>
    </div>
  );
}
