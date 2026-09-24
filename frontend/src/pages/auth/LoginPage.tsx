import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { authService } from '@/services/authService';
import { useAuthStore } from '@/store/authStore';

const schema = z.object({
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof schema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [showPass, setShowPass] = useState(false);
  const [apiError, setApiError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setApiError('');
    try {
      const res = await authService.login(data);
      if (res.success) {
        setUser({
          userId: res.data.userId,
          fullName: res.data.fullName,
          email: res.data.email,
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
        });
        navigate('/dashboard');
      }
    } catch (err: any) {
      setApiError(err?.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-parchment)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px 16px',
      }}
    >
      <div style={{ width: '100%', maxWidth: 420 }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div
            style={{
              width: 48,
              height: 48,
              background: 'var(--color-honey)',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 700,
              fontSize: 22,
              color: 'var(--color-ink)',
              margin: '0 auto 16px',
            }}
          >
            E
          </div>
          <h1
            style={{
              fontSize: 29,
              fontWeight: 500,
              letterSpacing: '-0.29px',
              color: 'var(--color-ink)',
              marginBottom: 6,
            }}
          >
            Enterprise HRM
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(18,23,24,0.55)', fontWeight: 400 }}>
            Sign in to your account
          </p>
        </div>

        {/* Card */}
        <div className="card" style={{ padding: '36px 32px' }}>
          {apiError && (
            <div
              style={{
                background: '#fee2e2',
                border: '1px solid #fca5a5',
                borderRadius: 'var(--radius-lg)',
                padding: '12px 16px',
                marginBottom: 20,
                fontSize: 14,
                color: '#991b1b',
              }}
            >
              {apiError}
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {/* Email */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  marginBottom: 6,
                }}
              >
                Email address
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="you@company.com"
                style={{
                  width: '100%',
                  padding: '11px 14px',
                  borderRadius: 'var(--radius-lg)',
                  border: errors.email ? '1px solid #f87171' : '1px solid rgba(18,23,24,0.15)',
                  background: 'var(--color-paper)',
                  fontSize: 15,
                  color: 'var(--color-ink)',
                  outline: 'none',
                  transition: 'border-color 0.15s',
                }}
                onFocus={(e) => {
                  if (!errors.email) e.target.style.borderColor = 'rgba(18,23,24,0.4)';
                }}
                onBlur={(e) => {
                  if (!errors.email) e.target.style.borderColor = 'rgba(18,23,24,0.15)';
                }}
              />
              {errors.email && (
                <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--color-ink)',
                  marginBottom: 6,
                }}
              >
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: '11px 44px 11px 14px',
                    borderRadius: 'var(--radius-lg)',
                    border: errors.password ? '1px solid #f87171' : '1px solid rgba(18,23,24,0.15)',
                    background: 'var(--color-paper)',
                    fontSize: 15,
                    color: 'var(--color-ink)',
                    outline: 'none',
                    transition: 'border-color 0.15s',
                  }}
                  onFocus={(e) => {
                    if (!errors.password) e.target.style.borderColor = 'rgba(18,23,24,0.4)';
                  }}
                  onBlur={(e) => {
                    if (!errors.password) e.target.style.borderColor = 'rgba(18,23,24,0.15)';
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'rgba(18,23,24,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && (
                <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{errors.password.message}</p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Signing in…
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>

        {/* Register link */}
        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'rgba(18,23,24,0.55)' }}>
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ color: 'var(--color-ink)', fontWeight: 500, textDecoration: 'underline' }}
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
