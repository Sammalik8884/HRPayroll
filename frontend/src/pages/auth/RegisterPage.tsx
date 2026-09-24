import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff, Loader2, CheckCircle } from 'lucide-react';
import { authService } from '@/services/authService';

const schema = z
  .object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Enter a valid email'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

type FormData = z.infer<typeof schema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [apiError, setApiError] = useState('');
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setApiError('');
    try {
      const res = await authService.register(data);
      if (res.success) {
        setSuccess(true);
        setTimeout(() => navigate('/login'), 2000);
      }
    } catch (err: any) {
      setApiError(err?.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  const inputStyle = (hasError: boolean) => ({
    width: '100%',
    padding: '11px 14px',
    borderRadius: 'var(--radius-lg)' as const,
    border: hasError ? '1px solid #f87171' : '1px solid rgba(18,23,24,0.15)',
    background: 'var(--color-paper)',
    fontSize: 15,
    color: 'var(--color-ink)',
    outline: 'none',
    transition: 'border-color 0.15s',
  });

  if (success) {
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
        <div style={{ textAlign: 'center' }}>
          <CheckCircle size={48} style={{ color: '#059669', margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 24, fontWeight: 500, marginBottom: 8 }}>Registration successful!</h2>
          <p style={{ color: 'rgba(18,23,24,0.55)' }}>Redirecting to login…</p>
        </div>
      </div>
    );
  }

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
      <div style={{ width: '100%', maxWidth: 440 }}>
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
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
            Create account
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(18,23,24,0.55)' }}>Join Enterprise HRM today</p>
        </div>

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

          <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Full name */}
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6 }}>
                Full name
              </label>
              <input type="text" {...register('fullName')} placeholder="John Doe" style={inputStyle(!!errors.fullName)} />
              {errors.fullName && <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{errors.fullName.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6 }}>
                Email address
              </label>
              <input type="email" {...register('email')} placeholder="you@company.com" style={inputStyle(!!errors.email)} />
              {errors.email && <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6 }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPass ? 'text' : 'password'}
                  {...register('password')}
                  placeholder="Min. 8 characters"
                  style={{ ...inputStyle(!!errors.password), paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowPass(!showPass)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(18,23,24,0.4)', display: 'flex', alignItems: 'center' }}
                >
                  {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{errors.password.message}</p>}
            </div>

            {/* Confirm password */}
            <div>
              <label style={{ display: 'block', fontSize: 14, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6 }}>
                Confirm password
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showConfirm ? 'text' : 'password'}
                  {...register('confirmPassword')}
                  placeholder="Repeat your password"
                  style={{ ...inputStyle(!!errors.confirmPassword), paddingRight: 44 }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(18,23,24,0.4)', display: 'flex', alignItems: 'center' }}
                >
                  {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.confirmPassword && <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{errors.confirmPassword.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', marginTop: 4 }}
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Creating account…
                </>
              ) : (
                'Create account'
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 14, color: 'rgba(18,23,24,0.55)' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ color: 'var(--color-ink)', fontWeight: 500, textDecoration: 'underline' }}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
