import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Plus, Search, Edit2, Trash2, X, Award, Loader2,
  ToggleLeft, ToggleRight, AlertTriangle, RefreshCw, Eye, FileText,
} from 'lucide-react';
import { designationApi, type DesignationDto } from '@/services/designationApi';

// ─── Zod schemas ──────────────────────────────────────────────────────────────

const createSchema = z.object({
  name:        z.string().min(2, 'Name must be at least 2 characters'),
  description: z.string().default(''),
});

const updateSchema = createSchema.extend({ isActive: z.boolean() });

type CreateForm = z.infer<typeof createSchema>;
type UpdateForm = z.infer<typeof updateSchema>;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name.split(' ').map((w) => w[0]).slice(0, 2).join('').toUpperCase();
}
function hueFromName(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = name.charCodeAt(i) + ((h << 5) - h);
  return `hsl(${((Math.abs(h) % 40) + 180)}, 55%, 88%)`;
}

// ─── Shared small components ──────────────────────────────────────────────────

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p style={{ fontSize: 12, color: '#dc2626', marginTop: 4 }}>{msg}</p>;
}

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

function ApiError({ msg }: { msg: string }) {
  return (
    <div style={{ background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-lg)', padding: '11px 14px', fontSize: 13, color: '#991b1b', display: 'flex', gap: 8, alignItems: 'flex-start' }}>
      <AlertTriangle size={14} style={{ flexShrink: 0, marginTop: 1 }} />
      {msg}
    </div>
  );
}

// ─── Modal Shell ─────────────────────────────────────────────────────────────

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
      <div className="card" style={{ width: '100%', maxWidth: 480, padding: 0, overflow: 'hidden', animation: 'slideUp 0.18s ease' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 28px 18px', borderBottom: '1px solid rgba(18,23,24,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, background: 'var(--color-apricot)', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={17} style={{ color: 'var(--color-ink)' }} />
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
    defaultValues: { name: '', description: '' },
  });

  const mut = useMutation({
    mutationFn: designationApi.create,
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['designations'] }); onSuccess(); },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => setApiErr(e?.response?.data?.message || 'Failed to create designation'),
  });

  const onSubmit = (data: CreateForm) => { setApiErr(''); mut.mutate(data); };
  const busy = isSubmitting || mut.isPending;

  return (
    <ModalShell title="Add Designation" onClose={onClose} busy={busy} submitLabel="Create Designation" onSubmit={handleSubmit(onSubmit)}>
      {apiErr && <ApiError msg={apiErr} />}
      <FormField label="Designation Name" required icon={Award} error={errors.name?.message}>
        <input {...register('name')} placeholder="e.g. Senior Engineer" style={inp(!!errors.name)} />
      </FormField>
      <FormField label="Description" icon={FileText} error={errors.description?.message}>
        <textarea {...register('description')} placeholder="Brief description of this designation (optional)" rows={3} style={{ ...inp(!!errors.description), resize: 'vertical', minHeight: 80 }} />
      </FormField>
    </ModalShell>
  );
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────

function EditModal({ designation, onClose, onSuccess }: { designation: DesignationDto; onClose: () => void; onSuccess: () => void }) {
  const qc = useQueryClient();
  const [apiErr, setApiErr] = useState('');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { register, handleSubmit, formState: { errors, isSubmitting }, watch, setValue } = useForm<any>({
    resolver: zodResolver(updateSchema),
    defaultValues: {
      name: designation.name,
      description: designation.description,
      isActive: designation.isActive,
    },
  });

  const isActive = watch('isActive');

  const mut = useMutation({
    mutationFn: (dto: UpdateForm) => designationApi.update(designation.id, dto),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['designations'] }); onSuccess(); },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => setApiErr(e?.response?.data?.message || 'Failed to update designation'),
  });

  const onSubmit = (data: UpdateForm) => { setApiErr(''); mut.mutate(data); };
  const busy = isSubmitting || mut.isPending;

  return (
    <ModalShell title="Edit Designation" onClose={onClose} busy={busy} submitLabel="Save Changes" onSubmit={handleSubmit(onSubmit)}>
      {apiErr && <ApiError msg={apiErr} />}
      <FormField label="Designation Name" required icon={Award} error={errors.name?.message}>
        <input {...register('name')} placeholder="e.g. Senior Engineer" style={inp(!!errors.name)} />
      </FormField>
      <FormField label="Description" icon={FileText} error={errors.description?.message}>
        <textarea {...register('description')} placeholder="Brief description of this designation (optional)" rows={3} style={{ ...inp(!!errors.description), resize: 'vertical', minHeight: 80 }} />
      </FormField>
      {/* Active toggle */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'var(--color-linen)' }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)' }}>Active Status</div>
          <div style={{ fontSize: 12, color: 'rgba(18,23,24,0.45)', marginTop: 2 }}>Inactive designations are hidden from dropdowns</div>
        </div>
        <button type="button" onClick={() => setValue('isActive', !isActive)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: isActive ? '#059669' : 'rgba(18,23,24,0.3)', display: 'flex', alignItems: 'center', padding: 0 }}>
          {isActive ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
        </button>
      </div>
    </ModalShell>
  );
}

// ─── View Modal ───────────────────────────────────────────────────────────────

function ViewModal({ id, onClose, onEdit }: { id: number; onClose: () => void; onEdit: () => void }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['designation', id],
    queryFn: () => designationApi.getById(id).then((r) => r.data),
  });
  const d = data;

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(18,23,24,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div className="card" style={{ width: '100%', maxWidth: 420, padding: 0, overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px 16px', borderBottom: '1px solid rgba(18,23,24,0.08)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-ink)' }}>Designation Details</h2>
          <button onClick={onClose} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'transparent', cursor: 'pointer', color: 'rgba(18,23,24,0.5)' }}>
            <X size={14} />
          </button>
        </div>
        <div style={{ padding: '20px 24px' }}>
          {isLoading && <div style={{ textAlign: 'center', padding: '32px 0' }}><Loader2 size={24} style={{ color: 'rgba(18,23,24,0.25)', animation: 'spin 1s linear infinite', margin: '0 auto' }} /></div>}
          {isError && <p style={{ color: '#dc2626', fontSize: 14 }}>Failed to load designation details.</p>}
          {d && (
            <div>
              <div style={{ background: hueFromName(d.name), borderRadius: 'var(--radius-lg)', padding: '16px 18px', display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
                <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, fontWeight: 700, color: 'var(--color-ink)', flexShrink: 0 }}>
                  {initials(d.name)}
                </div>
                <div>
                  <h3 style={{ fontSize: 18, fontWeight: 600, color: 'var(--color-ink)' }}>{d.name}</h3>
                  <span className={d.isActive ? 'badge-success' : 'badge-neutral'} style={{ marginTop: 4, display: 'inline-block' }}>
                    {d.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              {[
                { icon: Award,    label: 'Designation ID', value: `#${d.id}` },
                { icon: FileText, label: 'Description',    value: d.description || '—' },
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
        {d && (
          <div style={{ padding: '14px 24px 20px', borderTop: '1px solid rgba(18,23,24,0.08)', display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
            <button onClick={onClose} className="btn-ghost" style={{ fontSize: 13, padding: '8px 16px' }}>Close</button>
            <button onClick={() => { onClose(); onEdit(); }} className="btn-primary" style={{ fontSize: 13, padding: '8px 16px' }}>
              <Edit2 size={13} /> Edit Designation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Delete Modal ─────────────────────────────────────────────────────────────

function DeleteModal({ designation, onClose, onDeleted }: { designation: DesignationDto; onClose: () => void; onDeleted: () => void }) {
  const qc = useQueryClient();
  const [err, setErr] = useState('');

  const del = useMutation({
    mutationFn: () => designationApi.remove(designation.id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['designations'] }); onDeleted(); },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (e: any) => setErr(e?.response?.data?.message || 'Failed to delete designation'),
  });

  return (
    <div onClick={(e) => e.target === e.currentTarget && onClose()} style={{ position: 'fixed', inset: 0, background: 'rgba(18,23,24,0.45)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
      <div className="card" style={{ width: '100%', maxWidth: 380, padding: '28px 28px 24px' }}>
        <div style={{ width: 44, height: 44, background: '#fee2e2', borderRadius: 'var(--radius-lg)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
          <AlertTriangle size={20} style={{ color: '#dc2626' }} />
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 8 }}>Delete "{designation.name}"?</h3>
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

// ─── Designation Row ─────────────────────────────────────────────────────────

function DesignationRow({ designation, onView, onEdit, onDelete }: { designation: DesignationDto; onView: () => void; onEdit: () => void; onDelete: () => void }) {
  const bg = hueFromName(designation.name);
  return (
    <div
      className="card"
      style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', gap: 14, transition: 'border-color 0.15s' }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(18,23,24,0.18)')}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = 'rgba(18,23,24,0.08)')}
    >
      {/* Avatar */}
      <div style={{ width: 42, height: 42, borderRadius: 'var(--radius-lg)', background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 700, color: 'var(--color-ink)', flexShrink: 0 }}>
        {initials(designation.name)}
      </div>
      {/* Info */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 2 }}>{designation.name}</div>
        {designation.description && (
          <div style={{ fontSize: 12, color: 'rgba(18,23,24,0.5)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{designation.description}</div>
        )}
      </div>
      {/* Badge */}
      <span className={designation.isActive ? 'badge-success' : 'badge-neutral'} style={{ fontSize: 11, flexShrink: 0 }}>
        {designation.isActive ? 'Active' : 'Inactive'}
      </span>
      {/* Actions */}
      <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
        {[
          { icon: Eye,    cb: onView,   danger: false, title: 'View'   },
          { icon: Edit2,  cb: onEdit,   danger: false, title: 'Edit'   },
          { icon: Trash2, cb: onDelete, danger: true,  title: 'Delete' },
        ].map(({ icon: Icon, cb, danger, title }) => (
          <button key={title} onClick={cb} title={title} style={{ width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: `1px solid ${danger ? 'rgba(220,38,38,0.2)' : 'rgba(18,23,24,0.12)'}`, background: 'transparent', cursor: 'pointer', color: danger ? '#dc2626' : 'rgba(18,23,24,0.5)' }}>
            <Icon size={13} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type ModalState =
  | { type: 'none' }
  | { type: 'create' }
  | { type: 'edit';   designation: DesignationDto }
  | { type: 'view';   id: number }
  | { type: 'delete'; designation: DesignationDto };

export function DesignationsPage() {
  const [search, setSearch]             = useState('');
  const [filterActive, setFilterActive] = useState<'all' | 'active' | 'inactive'>('all');
  const [modal, setModal]               = useState<ModalState>({ type: 'none' });
  const closeModal                      = () => setModal({ type: 'none' });

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['designations'],
    queryFn: () => designationApi.getAll().then((r) => r.data ?? []),
  });

  const designations = (data ?? [])
    .filter((d) => filterActive === 'all' ? true : filterActive === 'active' ? d.isActive : !d.isActive)
    .filter((d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.description ?? '').toLowerCase().includes(search.toLowerCase())
    );

  const total        = data?.length ?? 0;
  const activeCount  = data?.filter((d) => d.isActive).length ?? 0;
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
            <h1 style={{ fontSize: 26, fontWeight: 500, letterSpacing: '-0.22px', color: 'var(--color-ink)', marginBottom: 4 }}>Designations</h1>
            <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.5)' }}>
              {isLoading ? 'Loading…' : `${total} designations · ${activeCount} active`}
            </p>
          </div>
          <button className="btn-primary" onClick={() => setModal({ type: 'create' })} style={{ fontSize: 14, padding: '10px 20px' }}>
            <Plus size={15} /> Add Designation
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
            <input type="text" placeholder="Search by name or description…" value={search} onChange={(e) => setSearch(e.target.value)}
              style={{ width: '100%', padding: '8px 10px 8px 33px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'var(--color-linen)', fontSize: 14, color: 'var(--color-ink)', outline: 'none', fontFamily: 'inherit' }} />
          </div>
          <button onClick={() => refetch()} title="Refresh" style={{ width: 36, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'transparent', cursor: 'pointer', color: 'rgba(18,23,24,0.45)', flexShrink: 0 }}>
            <RefreshCw size={14} />
          </button>
        </div>

        {/* ── Loading skeletons ── */}
        {isLoading && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[1, 2, 3, 4].map((i) => (
              <div key={i} style={{ height: 70, background: 'var(--color-paper)', borderRadius: 'var(--radius-cards)', border: '1px solid rgba(18,23,24,0.08)', animation: 'pulse 1.5s ease-in-out infinite' }} />
            ))}
          </div>
        )}

        {/* ── Error ── */}
        {isError && !isLoading && (
          <div className="card" style={{ padding: '40px 24px', textAlign: 'center' }}>
            <AlertTriangle size={36} style={{ color: '#f87171', margin: '0 auto 12px' }} />
            <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 4 }}>Failed to load designations</p>
            <p style={{ fontSize: 13, color: 'rgba(18,23,24,0.45)', marginBottom: 20 }}>Check your connection and try again.</p>
            <button onClick={() => refetch()} className="btn-primary" style={{ fontSize: 14, padding: '9px 18px' }}><RefreshCw size={14} /> Retry</button>
          </div>
        )}

        {/* ── Empty state ── */}
        {!isLoading && !isError && designations.length === 0 && (
          <div className="card" style={{ padding: '72px 40px', textAlign: 'center' }}>
            <div style={{ width: 64, height: 64, background: 'var(--color-apricot)', borderRadius: 'var(--radius-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
              <Award size={28} style={{ color: 'var(--color-ink)' }} />
            </div>
            <h2 style={{ fontSize: 18, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 6 }}>
              {search || filterActive !== 'all' ? 'No designations match your search' : 'No designations yet'}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.45)', maxWidth: 340, margin: '0 auto 24px' }}>
              {search || filterActive !== 'all' ? 'Try adjusting your filters or search term.' : 'Create your first designation to get started.'}
            </p>
            {!search && filterActive === 'all' && (
              <button className="btn-primary" onClick={() => setModal({ type: 'create' })} style={{ fontSize: 14 }}>
                <Plus size={14} /> Add Designation
              </button>
            )}
          </div>
        )}

        {/* ── List ── */}
        {!isLoading && !isError && designations.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {designations.map((designation) => (
              <DesignationRow
                key={designation.id}
                designation={designation}
                onView={()   => setModal({ type: 'view',   id: designation.id })}
                onEdit={()   => setModal({ type: 'edit',   designation })}
                onDelete={() => setModal({ type: 'delete', designation })}
              />
            ))}
          </div>
        )}
      </div>

      {/* ── Modals ── */}
      {modal.type === 'create' && <CreateModal onClose={closeModal} onSuccess={closeModal} />}
      {modal.type === 'edit'   && <EditModal   designation={modal.designation} onClose={closeModal} onSuccess={closeModal} />}
      {modal.type === 'view'   && (
        <ViewModal
          id={modal.id}
          onClose={closeModal}
          onEdit={() => {
            const d = (data ?? []).find((x) => x.id === modal.id);
            if (d) setModal({ type: 'edit', designation: d });
          }}
        />
      )}
      {modal.type === 'delete' && <DeleteModal designation={modal.designation} onClose={closeModal} onDeleted={closeModal} />}
    </>
  );
}
