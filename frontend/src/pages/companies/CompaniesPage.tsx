import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Search, Edit, Trash2, Building2, Loader2 } from 'lucide-react';
import { companyService } from '@/services/companyService';
import type { Company } from '@/types';

export function CompaniesPage() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editItem, setEditItem] = useState<Company | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Form state
  const [form, setForm] = useState({ name: '', shortName: '', ntn: '', address: '', phone: '', email: '', website: '' });
  const [formError, setFormError] = useState('');

  const { data, isLoading, isError } = useQuery({
    queryKey: ['companies'],
    queryFn: () => companyService.getAll().then((r) => r.data),
  });

  const createMutation = useMutation({
    mutationFn: companyService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      setShowForm(false);
      resetForm();
    },
    onError: (err: any) => setFormError(err?.response?.data?.message || 'Failed to save company'),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: any }) => companyService.update(id, { ...data, isActive: true }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      setEditItem(null);
      setShowForm(false);
      resetForm();
    },
    onError: (err: any) => setFormError(err?.response?.data?.message || 'Failed to update company'),
  });

  const deleteMutation = useMutation({
    mutationFn: companyService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companies'] });
      setDeleteConfirm(null);
    },
  });

  const resetForm = () => {
    setForm({ name: '', shortName: '', ntn: '', address: '', phone: '', email: '', website: '' });
    setFormError('');
    setEditItem(null);
  };

  const openEdit = (company: Company) => {
    setEditItem(company);
    setForm({ name: company.name, shortName: company.shortName, ntn: company.ntn, address: company.address, phone: company.phone, email: company.email, website: company.website || '' });
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!form.name || !form.email) { setFormError('Name and email are required.'); return; }
    if (editItem) {
      updateMutation.mutate({ id: editItem.id, data: form });
    } else {
      createMutation.mutate(form);
    }
  };

  const companies = (data || []).filter(
    (c) => c.name.toLowerCase().includes(search.toLowerCase()) || c.shortName.toLowerCase().includes(search.toLowerCase())
  );

  const isSaving = createMutation.isPending || updateMutation.isPending;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 500, letterSpacing: '-0.17px', color: 'var(--color-ink)', marginBottom: 4 }}>
            Companies
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)' }}>Manage your registered companies</p>
        </div>
        <button className="btn-primary" onClick={() => { resetForm(); setShowForm(true); }} style={{ fontSize: 14, padding: '10px 18px' }}>
          <Plus size={15} />
          Add Company
        </button>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', maxWidth: 320 }}>
        <Search size={15} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'rgba(18,23,24,0.35)' }} />
        <input
          type="text"
          placeholder="Search companies…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: '100%', padding: '9px 12px 9px 36px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.12)', background: 'var(--color-paper)', fontSize: 14, color: 'var(--color-ink)', outline: 'none' }}
        />
      </div>

      {/* Content */}
      {isLoading ? (
        <div style={{ textAlign: 'center', padding: '60px 0' }}>
          <Loader2 size={28} style={{ color: 'rgba(18,23,24,0.25)', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
        </div>
      ) : isError ? (
        <div className="card" style={{ textAlign: 'center', padding: '48px 24px', color: '#dc2626' }}>
          Failed to load companies. Please try again.
        </div>
      ) : companies.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '60px 24px' }}>
          <Building2 size={40} style={{ color: 'rgba(18,23,24,0.12)', margin: '0 auto 14px' }} />
          <p style={{ fontSize: 15, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 4 }}>No companies yet</p>
          <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.45)', marginBottom: 20 }}>Create your first company to get started.</p>
          <button className="btn-primary" onClick={() => setShowForm(true)} style={{ fontSize: 14 }}>
            <Plus size={14} /> Add Company
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
          {companies.map((company) => (
            <div key={company.id} className="card" style={{ padding: '20px 24px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div
                  style={{
                    width: 44,
                    height: 44,
                    background: 'var(--color-apricot)',
                    borderRadius: 'var(--radius-lg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 18,
                    fontWeight: 700,
                    color: 'var(--color-ink)',
                    flexShrink: 0,
                  }}
                >
                  {company.name.charAt(0)}
                </div>
                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--color-ink)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {company.name}
                  </h3>
                  <div style={{ fontSize: 12, color: 'rgba(18,23,24,0.45)' }}>{company.shortName} · NTN: {company.ntn}</div>
                </div>
                <div style={{ display: 'flex', gap: 4, flexShrink: 0 }}>
                  <button
                    onClick={() => openEdit(company)}
                    style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'transparent', cursor: 'pointer', color: 'rgba(18,23,24,0.5)' }}
                  >
                    <Edit size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(company.id)}
                    style={{ width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.1)', background: 'transparent', cursor: 'pointer', color: '#dc2626' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
              <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[{ label: 'Email', value: company.email }, { label: 'Phone', value: company.phone }, { label: 'Address', value: company.address }].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', gap: 8, fontSize: 13 }}>
                    <span style={{ color: 'rgba(18,23,24,0.4)', minWidth: 52, flexShrink: 0 }}>{label}</span>
                    <span style={{ color: 'var(--color-ink)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 12 }}>
                <span className={company.isActive ? 'badge-success' : 'badge-neutral'}>
                  {company.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Add/Edit Form */}
      {showForm && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(18,23,24,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={(e) => { if (e.target === e.currentTarget) { setShowForm(false); resetForm(); } }}
        >
          <div
            className="card"
            style={{ width: '100%', maxWidth: 480, maxHeight: '90vh', overflow: 'auto', padding: '28px 32px' }}
          >
            <h2 style={{ fontSize: 20, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 20, letterSpacing: '-0.17px' }}>
              {editItem ? 'Edit Company' : 'Add Company'}
            </h2>
            {formError && (
              <div style={{ background: '#fee2e2', borderRadius: 'var(--radius-lg)', padding: '10px 14px', marginBottom: 16, fontSize: 13, color: '#991b1b' }}>
                {formError}
              </div>
            )}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { key: 'name', label: 'Company Name', required: true, placeholder: 'Acme Corp' },
                { key: 'shortName', label: 'Short Name', required: false, placeholder: 'ACME' },
                { key: 'ntn', label: 'NTN Number', required: false, placeholder: '1234567-8' },
                { key: 'email', label: 'Email', required: true, type: 'email', placeholder: 'info@acme.com' },
                { key: 'phone', label: 'Phone', required: false, placeholder: '+92 300 000 0000' },
                { key: 'address', label: 'Address', required: false, placeholder: 'City, Country' },
                { key: 'website', label: 'Website', required: false, placeholder: 'https://acme.com' },
              ].map(({ key, label, required, type, placeholder }) => (
                <div key={key}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 5 }}>
                    {label} {required && <span style={{ color: '#dc2626' }}>*</span>}
                  </label>
                  <input
                    type={type || 'text'}
                    value={form[key as keyof typeof form]}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    placeholder={placeholder}
                    style={{ width: '100%', padding: '9px 12px', borderRadius: 'var(--radius-lg)', border: '1px solid rgba(18,23,24,0.15)', background: 'var(--color-paper)', fontSize: 14, color: 'var(--color-ink)', outline: 'none' }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 8 }}>
                <button type="button" className="btn-ghost" onClick={() => { setShowForm(false); resetForm(); }} style={{ fontSize: 14, padding: '9px 16px' }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="btn-primary" style={{ fontSize: 14, padding: '9px 18px' }}>
                  {isSaving ? <><Loader2 size={14} className="animate-spin" /> Saving…</> : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteConfirm !== null && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(18,23,24,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
          onClick={(e) => { if (e.target === e.currentTarget) setDeleteConfirm(null); }}
        >
          <div className="card" style={{ maxWidth: 360, width: '100%', padding: '28px 28px' }}>
            <h3 style={{ fontSize: 17, fontWeight: 500, color: 'var(--color-ink)', marginBottom: 8 }}>Delete Company?</h3>
            <p style={{ fontSize: 14, color: 'rgba(18,23,24,0.55)', marginBottom: 20 }}>This action cannot be undone.</p>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button className="btn-ghost" onClick={() => setDeleteConfirm(null)} style={{ fontSize: 14, padding: '9px 16px' }}>Cancel</button>
              <button
                onClick={() => deleteMutation.mutate(deleteConfirm!)}
                disabled={deleteMutation.isPending}
                style={{ background: '#dc2626', color: 'white', borderRadius: 'var(--radius-buttons)', padding: '9px 16px', border: 'none', cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', gap: 6 }}
              >
                {deleteMutation.isPending ? <><Loader2 size={13} /> Deleting…</> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
