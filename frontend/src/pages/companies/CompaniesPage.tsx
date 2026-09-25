import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Plus, Search, Edit2, Trash2, X, Building2, Loader2,
  Mail, Phone, MapPin, Image, ToggleLeft, ToggleRight,
  AlertTriangle, RefreshCw, Eye,
} from 'lucide-react';
import { companyApi, type CompanyDto } from '@/services/companyApi';

// ─── Zod schemas ──────────────────────────────────────────────────────────────

const baseSchema = z.object({
  name:     z.string().min(2, 'Name must be at least 2 characters'),
  address:  z.string().min(1, 'Address is required'),
  phone:    z.string().min(7, 'Enter a valid phone number'),
  email:    z.string().email('Enter a valid email address'),
  logoPath: z.string().default(''),
});

const createSchema = baseSchema;
const updateSchema = baseSchema.extend({ isActive: z.boolean() });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type CreateForm = { name: string; address: string; phone: string; email: string; logoPath: string };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type UpdateForm = CreateForm & { isActive: boolean };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}
function hueFromName(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return `hsl(${((Math.abs(h) % 30) + 30)}, 60%, 88%)`;
}

// ─── Shared small components ──────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{msg}</p>;
}

// Extract a plain string from RHF's FieldError union
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function errMsg(e: any): string | undefined {
  if (!e) return undefined;
  if (typeof e === 'string') return e;
  if (typeof e?.message === 'string') return e.message;
  return undefined;
}

function FormField({
  label, required, icon: Icon, error, children,
}: {
  label: string; required?: boolean; icon?: React.ElementType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any; children: React.ReactNode;
}) {
  return (
    <div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6 }}>
        {Icon && <Icon size={13} style={{ color: 'rgba(18,23,24,0.4)' }} />}
        {label}{required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      {children}
      <FieldError msg={errMsg(error)} />
    </div>
  );
}

const inp = (hasError = false): React.CSSProperties => ({
  width: '100%', padding: '10px 13px', borderRadius: 'var(--radius-lg)',
  border: hasError ? '1px solid #f87171' : '1px solid rgba(18,23,24,0.14)',
  background: 'var(--color-paper)', fontSize: 14, color: 'var(--color-ink)',
  outline: 'none', transition: 'border-color 0.15s', fontFamily: 'inherit',
});

// Shared modal chrome (header + footer wrapper)
function ModalShell({
  title, onClose, busy, submitLabel, onSubmit, children,
}: {
  title: string; onClose: () => void; busy: boolean; submitLabel: string;
  onSubmit: (e: React.FormEvent) => void; children: React.ReactNode;
}) {
  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ position: 'fixed', inset: 0, background: 'rgba(18,23,24,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16, overflowY: 'auto' }}
    >
      <div className="card" style={{ width: '100%', maxWidth: 520, padding: 0, overflow: 'hidden', animation: 'slideUp 0.18s ease' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 28px 18px', borderBottom: '1px solid rgba(18,23,24,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'var(--color-apricot)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Building2 size={17} style={{ color: 'var(--color-ink)' }} />
            </div>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-ink)', letterSpacing: '-0.1px' }}>{title}</h2>
          </div>
          <button onClick={onClose} style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'transparent', cursor: 'pointer', color: 'rgba(18,23,24,0.5)' }}>
            <X size={15} />
          </button>
        </div>
        {/* Body */}
        <form onSubmit={onSubmit}>
          <div style={{ padding: '22px 28px', display: 'flex', flexDirection: 'column', gap: 16, maxHeight: '65vh', overflowY: 'auto' }}>
            {children}
          </div>
          {/* Footer */}
          <div style={{ padding: '16px 28px 22px', borderTop: '1px solid rgba(18,23,24,0.08)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button type="button" onClick={onClose} disabled={busy} className="btn-ghost" style={{ fontSize: 14, padding: '9px 18px' }}>Cancel</button>
            <button type="submit" disabled={busy} className="btn-primary" style={{ fontSize: 14, padding: '9px 20px' }}>
              {busy ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />Saving…</> : submitLabel}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Create Modal ─────────────────────────────────────────────────────────────

function CreateModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: () => void }) {
  const qc = useQueryClient();
  const [apiErr, setApiErr] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<any>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: '', address: '', phone: '', email: '', logoPath: '' },
  });

  const mut = useMutation({
    mutationFn: companyApi.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['companies'] }); onSuccess(); },
    onError: (e: any) => setApiErr(e?.response?.data?.message || 'Failed to create company'),
  });

  const onSubmit = (data: CreateForm) => { setApiErr(''); mut.mutate(data); };
  const busy = isSubmitting || mut.isPending;

  return (
    <ModalShell title="Add Company" onClose={onClose} busy={busy} submitLabel="Create Company" onSubmit={handleSubmit(onSubmit)}>
      {apiErr && <ApiError msg={apiErr} />}
      <FormField label="Company Name" required icon={Building2} error={errors.name?.message}>
        <input {...register('name')} placeholder="e.g. Acme Corporation" style={inp(!!errors.name)} />
      </FormField>
      <FormField label="Email Address" required icon={Mail} error={errors.email?.message}>
        <input type="email" {...register('email')} placeholder="info@acmecorp.com" style={inp(!!errors.email)} />
      </FormField>
      <FormField label="Phone Number" required icon={Phone} error={errors.phone?.message}>
        <input {...register('phone')} placeholder="+92 300 000 0000" style={inp(!!errors.phone)} />
      </FormField>
      <FormField label="Address" required icon={MapPin} error={errors.address?.message}>
        <textarea {...register('address')} placeholder="Street, City, Country" rows={2} style={{ ...inp(!!errors.address), resize: 'vertical', minHeight: 64 }} />
      </FormField>
      <FormField label="Logo URL" icon={Image} error={errors.logoPath?.message}>
        <input {...register('logoPath')} placeholder="https://example.com/logo.png (optional)" style={inp(false)} />
      </FormField>
    </ModalShell>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditModal({ company, onClose, onSuccess }: { company: CompanyDto; onClose: () => void; onSuccess: () => void }) {
  const qc = useQueryClient();
  const [apiErr, setApiErr] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<any>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: company.name, address: company.address, phone: company.phone,
      email: company.email, logoPath: company.logoPath, isActive: company.isActive,
    },
  });

  const isActive = watch('isActive');

  const mut = useMutation({
    mutationFn: (dto: UpdateForm) => companyApi.update(company.id, dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['companies'] }); onSuccess(); },
    onError: (e: any) => setApiErr(e?.response?.data?.message || 'Failed to update company'),
  });

  const onSubmit = (data: UpdateForm) => { setApiErr(''); mut.mutate(data); };
  const busy = isSubmitting || mut.isPending;

  return (
    <ModalShell title="Edit Company" onClose={onClose} busy={busy} submitLabel="Save Changes" onSubmit={handleSubmit(onSubmit)}>
      {apiErr && <ApiError msg={apiErr} />}
      <FormField label="Company Name" required icon={Building2} error={errors.name?.message}>
        <input {...register('name')} placeholder="e.g. Acme Corporation" style={inp(!!errors.name)} />
      </FormField>
      <FormField label="Email Address" required icon={Mail} error={errors.email?.message}>
        <input type="email" {...register('email')} placeholder="info@acmecorp.com" style={inp(!!errors.email)} />
      </FormField>
      <FormField label="Phone Number" required icon={Phone} error={errors.phone?.message}>
        <input {...register('phone')} placeholder="+92 300 000 0000" style={inp(!!errors.phone)} />
      </FormField>
      <FormField label="Address" required icon={MapPin} error={errors.address?.message}>
        <textarea {...register('address')} placeholder="Street, City, Country" rows={2} style={{ ...inp(!!errors.address), resize: 'vertical', minHeight: 64 }} />
      </FormField>
      <FormField label="Logo URL" icon={Image} error={errors.logoPath?.message}>
        <input {...register('logoPath')} placeholder="https://example.com/logo.png (optional)" style={inp(false)} />
      </FormField>
      {/* Active toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'var(--color-linen)' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)' }}>Active Status</div>
          <div style={{ fontSize: 12, color: 'rgba(18,23,24,0.45)', marginTop: 2 }}>Inactive companies are hidden from dropdowns</div>
        </div>
        <button type="button" onClick={() => setValue('isActive', !isActive)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isActive ? '#059669' : 'rgba(18,23,24,0.3)', display: 'flex', alignItems: 'center', padding: 0 }}>
          {isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
        </button>
      </div>
    </ModalShell>
  );
}

// ─── API Error banner ─────────────────────────────────────────────────────────

function ApiError({ msg }: { msg: string }) {
  return (
    <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-lg)', padding: '11px 14px', fontSize: 13, color: '#991b1b', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
      {msg}
    </div>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────

function ViewModal({ id, onClose, onEdit }: { id: number; onClose: () => void; onEdit: () => void }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['company', id],
    queryFn: () => companyApi.getById(id).then((r) => r.data),
  });
  const company = data;

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(18,23,24,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div className="card" style={{ width: '100%', maxWidth: 460, padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '1px solid rgba(18,23,24,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-ink)' }}>Company Details</h2>
          <button onClick={onClose} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'transparent', cursor: 'pointer', color: 'rgba(18,23,24,0.5)' }}>
            <X size={14} />
          </button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          {isLoading && <div style={{ textAlign: 'center', padding: '32px 0' }}><Loader2 size={24} style={{ color: 'rgba(18,23,24,0.25)', animation: 'spin 1s linear infinite', margin: '0 auto' }} /></div>}
          {isError && <p style={{ color: '#dc2626', fontSize: 14 }}>Failed to load company details.</p>}
          {company && (
            <div>
              <div style={{ background: hueFromName(company.name), borderRadius: 'var(--radius-lg)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, fontWeight: 700, color: 'var(--color-ink)', flexShrink: 0 }}>
                  {initials(company.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' }}>{company.name}</h3>
                  <span className={company.isActive ? 'badge-success' : 'badge-neutral'} style={{ marginTop: 4, display: 'inline-block' }}>
                    {company.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              {[
                { icon: Building2, label: 'Company ID', value: `#${company.id}` },
                { icon: Mail,      label: 'Email',      value: company.email   || '—' },
                { icon: Phone,     label: 'Phone',      value: company.phone   || '—' },
                { icon: MapPin,    label: 'Address',    value: company.address || '—' },
                { icon: Image,     label: 'Logo URL',   value: company.logoPath || '—' },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} style={{ display: 'flex', gap: 12, padding: '11px 0', borderBottom: '1px solid rgba(18,23,24,0.06)' }}>
                  <Icon size={14} style={{ color: 'rgba(18,23,24,0.35)', flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(18,23,24,0.4)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 3 }}>{label}</div>
                    <div style={{ fontSize: 14, color: 'var(--color-ink)', wordBreak: 'break-word' }}>{value}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        {company && (
          <div style={{ padding: '14px 24px 20px', borderTop: '1px solid rgba(18,23,24,0.08)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn-ghost" style={{ fontSize: 13, padding: '8px 16px' }}>Close</button>
            <button onClick={() => { onClose(); onEdit(); }} className="btn-primary" style={{ fontSize: 13, padding: '8px 16px' }}>
              <Edit2 size={13} /> Edit Company
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({ company, onClose, onDeleted }: { company: CompanyDto; onClose: () => void; onDeleted: () => void }) {
  const qc = useQueryClient();
  const [err, setErr] = useState('');

  const del = useMutation({
    mutationFn: () => companyApi.remove(company.id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['companies'] }); onDeleted(); },
    onError: (e: any) => setErr(e?.response?.data?.message || 'Failed to delete company'),
  });

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(18,23,24,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div className="card" style={{ width: '100%', maxWidth: 380, padding: '28px 28px 24px' }}>
        <div style={{ width: 44, height: 44, background: '#fee2e2', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <AlertTriangle size={20} style={{ color: '#dc2626' }} />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 8 }}>Delete "{company.name}"?</h3>
        <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)', lineHeight: 1.5, marginBottom: 6 }}>
          This action is <strong>permanent</strong> and cannot be undone.
        </p>
        {err && <div style={{ background: '#fee2e2', borderRadius: 'var(--radius-lg)', padding: '10px 14px', fontSize: 13, color: '#991b1b', marginTop: 10 }}>{err}</div>}
        <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 20 }}>
          <button onClick={onClose} disabled={del.isPending} className="btn-ghost" style={{ fontSize: 14, padding: '9px 18px' }}>Cancel</button>
          <button onClick={() => del.mutate()} disabled={del.isPending} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '9px 18px', background: '#dc2626', color: '#fff', border: 'none', borderRadius: 'var(--radius-buttons)', cursor: del.isPending ? 'not-allowed' : 'pointer', fontSize: 14, fontWeight: 500, opacity: del.isPending ? 0.7 : 1 }}>
            {del.isPending ? <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} />Deleting…</> : <><Trash2 size={14} />Delete</>}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Company Card ─────────────────────────────────────────────────────────────

function CompanyCard({ company, onView, onEdit, onDelete }: { company: CompanyDto; onView: () => void; onEdit: () => void; onDelete: () => void }) {
  const bg = hueFromName(company.name);
  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'border-color 0.15s' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(18,23,24,0.18)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(18,23,24,0.08)')}>
      {/* Header band */}
      <div style={{ background: bg, padding: '18px 20px 14px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, color: 'var(--color-ink)', flexShrink: 0 }}>
            {company.logoPath
              ? <img src={company.logoPath} alt={company.name} style={{ width: 30, height: 30, objectFit: 'contain' }} onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }} />
              : initials(company.name)}
          </div>
          <div>
            <h3 style={{ fontSize: 14, fontWeight: 600, color: 'var(--color-ink)', lineHeight: 1.25, marginBottom: 3 }}>{company.name}</h3>
            <span className={company.isActive ? 'badge-success' : 'badge-neutral'} style={{ fontSize: 11 }}>
              {company.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
          {[
            { icon: Eye,    cb: onView,   danger: false, title: 'View' },
            { icon: Edit2,  cb: onEdit,   danger: false, title: 'Edit' },
            { icon: Trash2, cb: onDelete, danger: true,  title: 'Delete' },
          ].map(({ icon: Icon, cb, danger, title }) => (
            <button key={title} onClick={cb} title={title} style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: `1px solid ${danger ? 'rgba(220,38,38,0.2)' : 'rgba(18,23,24,0.15)'}`, background: 'rgba(255,255,255,0.7)', cursor: 'pointer', color: danger ? '#dc2626' : 'rgba(18,23,24,0.55)' }}>
              <Icon size={12} />
            </button>
          ))}
        </div>
      </div>
      {/* Body */}
      <div style={{ padding: '14px 20px 18px', display: 'flex', flexDirection: 'column', gap: 9, flex: 1 }}>
        {company.email && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Mail size={12} style={{ color: 'rgba(18,23,24,0.35)', flexShrink: 0 }} />
            <a href={`mailto:${company.email}`} style={{ fontSize: 13, color: 'var(--color-ink)', textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.email}</a>
          </div>
        )}
        {company.phone && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Phone size={12} style={{ color: 'rgba(18,23,24,0.35)', flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: 'var(--color-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{company.phone}</span>
          </div>
        )}
        {company.address && (
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
            <MapPin size={12} style={{ color: 'rgba(18,23,24,0.35)', flexShrink: 0, marginTop: 1 }} />
            <span style={{ fontSize: 13, color: 'rgba(18,23,24,0.65)', lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{company.address}</span>
          </div>
        )}
        {!company.email && !company.phone && !company.address && (
          <p style={{ fontSize: 13, color: 'rgba(18,23,24,0.3)', fontStyle: 'italic' }}>No contact details</p>
        )}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type ModalState =
  | { type: 'none' }
  | { type: 'create' }
  | { type: 'edit';   company: CompanyDto }
  | { type: 'view';   id: number }
  | { type: 'delete'; company: CompanyDto };

export function CompaniesPage() {
  const [search, setSearch]           = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [modal, setModal]             = useState<ModalState>({ type: 'none' });
  const closeModal                    = () => setModal({ type: 'none' });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['companies'],
    queryFn: () => companyApi.getAll().then((r) => r.data ?? []),
  });

  const companies = (data ?? [])
    .filter((c) => filterActive === 'all' ? true : filterActive === 'active' ? c.isActive : !c.isActive)
    .filter((c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.email  ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (c.phone  ?? '').includes(search)
    );

  const total        = data?.length ?? 0;
  const activeCount  = data?.filter((c) => c.isActive).length ?? 0;
  const inactiveCount = total - activeCount;

  return (
    <>
      <style>{`
        @keyframes spin    { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { opacity:0;transform:translateY(12px);} to {opacity:1;transform:translateY(0);} }
        @keyframes pulse   { 0%,100%{opacity:.6} 50%{opacity:.3} }
      `}</style>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

        {/* ── Page header ── */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.22px', color: 'var(--color-ink)', marginBottom: 4 }}>Companies</h1>
            <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.5)' }}>
              {isLoading ? 'Loading…' : `${total} companies · ${activeCount} active`}
            </p>
          </div>
          <button className="btn-primary" onClick={() => setModal({ type: 'create' })} style={{ fontSize: 14, padding: '10px 20px' }}>
            <Plus size={15} /> Add Company
          </button>
        </div>

        {/* ── Stat filter tabs ── */}
        {!isLoading && !isError && total > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 12 }}>
            {([
              { label: 'Total',    value: total,         key: 'all'      as const },
              { label: 'Active',   value: activeCount,   key: 'active'   as const },
              { label: 'Inactive', value: inactiveCount, key: 'inactive' as const },
            ] as const).map((s) => (
              <button key={s.key} onClick={() => setFilterActive(s.key)} style={{ background: filterActive === s.key ? 'var(--color-honey)' : 'var(--color-paper)', border: `1px solid ${filterActive === s.key ? 'transparent' : 'rgba(18,23,24,0.08)'}`, borderRadius: 'var(--radius-cards)', padding: '13px 16px', textAlign: 'left', cursor: 'pointer', transition: 'all 0.15s' }}>
                <div style={{ fontSize: 22, fontWeight: 500, color: 'var(--color-ink)', letterSpacing: '-0.15px' }}>{s.value}</div>
                <div style={{ fontSize: 12, color: 'rgba(18,23,24,0.5)', marginTop: 2 }}>{s.label}</div>
              </button>
            ))}
          </div>
        )}

        {/* ── Search bar ── */}
        <div className="card" style={{ padding: '13px 16px', display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <div style={{ position: 'relative', flex: '1 1 200px', minWidth: 0 }}>
            <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: 'rgba(18,23,24,0.35)' }} />
            <input type="text" placeholder="Search by name, email or phone…" value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 10px 8px 33px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'var(--color-linen)', fontSize: 14, color: 'var(--color-ink)', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <button onClick={() => refetch()} title="Refresh" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'transparent', cursor: 'pointer', color: 'rgba(18,23,24,0.45)', flexShrink: 0 }}>
            <RefreshCw size={14} />
          </button>
        </div>

        {/* ── Loading skeletons ── */}
        {isLoading && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: 180, background: 'var(--color-paper)', borderRadius: 'var(--radius-cards)', border: '1px solid rgba(18,23,24,0.08)', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {isError && !isLoading && (
          <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
            <AlertTriangle size={36} style={{ color: '#f87171', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 4 }}>Failed to load companies</p>
            <p style={{ fontSize: 13, color: 'rgba(18,23,24,0.45)', marginBottom: 20 }}>Check your connection and try again.</p>
            <button onClick={() => refetch()} className="btn-primary" style={{ fontSize: 14, padding: '9px 18px' }}><RefreshCw size={14} /> Retry</button>
          </div>
        )}

        {/* ── Empty state ── */}
        {!isLoading && !isError && companies.length === 0 && (
          <div className="card" style={{ padding: '72px 40px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, background: 'var(--color-apricot)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <Building2 size={28} style={{ color: 'var(--color-ink)' }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6 }}>
              {search || filterActive !== 'all' ? 'No companies match your search' : 'No companies yet'}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.45)', maxWidth: 340, margin: '0 auto 24px' }}>
              {search || filterActive !== 'all' ? 'Try adjusting your filters or search term.' : 'Create your first company to get started.'}
            </p>
            {!search && filterActive === 'all' && (
              <button className="btn-primary" onClick={() => setModal({ type: 'create' })} style={{ fontSize: 14 }}>
                <Plus size={14} /> Add Company
              </button>
            )}
          </div>
        )}

        {/* ── Card grid ── */}
        {!isLoading && !isError && companies.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 16 }}>
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
                onView={()   => setModal({ type: 'view',   id: company.id })}
                onEdit={()   => setModal({ type: 'edit',   company })}
                onDelete={()  => setModal({ type: 'delete', company })}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {modal.type === 'create' && <CreateModal onClose={closeModal} onSuccess={closeModal} />}
      {modal.type === 'edit'   && <EditModal   company={modal.company} onClose={closeModal} onSuccess={closeModal} />}
      {modal.type === 'view'   && (
        <ViewModal
          id={modal.id}
          onClose={closeModal}
          onEdit={() => {
            const c = (data ?? []).find((x) => x.id === modal.id);
            if (c) setModal({ type: 'edit', company: c });
          }}
        />
      )}
      {modal.type === 'delete' && <DeleteModal company={modal.company} onClose={closeModal} onDeleted={closeModal} />}
    </>
  );
}
