import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { fetchEnquiry, updateEnquiry, deleteEnquiry, BACKEND_URL } from '../../services/api';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';
import { Select } from '../../components/ui/Input';

const STATUSES = ['new', 'contacted', 'proposal_sent', 'won', 'lost'];
const STATUS_LABELS = { new: 'New', contacted: 'Contacted', proposal_sent: 'Proposal Sent', won: 'Won', lost: 'Lost' };

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs font-medium text-gray-400 mb-0.5">{label}</p>
    <p className="text-sm text-gray-800">{value || '-'}</p>
  </div>
);

const LeadDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const result = await fetchEnquiry(id);
        setEnquiry(result.data);
        setStatus(result.data.status);
        setNotes(result.data.internal_notes || '');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    setSaveMsg('');
    try {
      const result = await updateEnquiry(id, { status, internal_notes: notes });
      setEnquiry(result.data);
      setSaveMsg('Saved!');
      setTimeout(() => setSaveMsg(''), 2000);
    } catch (err) {
      setSaveMsg(err.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Permanently delete this enquiry?')) return;
    setDeleting(true);
    try {
      await deleteEnquiry(id);
      navigate('/admin/leads');
    } catch (err) {
      alert(err.message);
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="h-8 w-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
    </div>
  );

  if (error) return (
    <div className="p-8 text-center">
      <p className="text-red-500 mb-4">{error}</p>
      <Link to="/admin/leads"><Button variant="secondary">Back to leads</Button></Link>
    </div>
  );

  return (
    <div className="p-8 max-w-4xl mx-auto animate-fade-in">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-6">
        <Link to="/admin" className="hover:text-gray-600">Dashboard</Link>
        <span>/</span>
        <Link to="/admin/leads" className="hover:text-gray-600">Leads</Link>
        <span>/</span>
        <span className="text-gray-700">{enquiry.first_name} {enquiry.last_name}</span>
      </div>

      <div className="flex items-start justify-between flex-wrap gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{enquiry.first_name} {enquiry.last_name}</h1>
          <p className="text-gray-500 text-sm mt-1">{enquiry.company} · submitted {new Date(enquiry.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </div>
        <Badge status={enquiry.status} className="text-sm" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Contact information</h2></CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4">
                <Field label="First name" value={enquiry.first_name} />
                <Field label="Last name" value={enquiry.last_name} />
                <Field label="Email" value={enquiry.email} />
                <Field label="Phone" value={enquiry.phone} />
                <Field label="Company" value={enquiry.company} />
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Project details</h2></CardHeader>
            <CardBody>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <Field label="Project type" value={enquiry.project_type} />
                <Field label="Budget" value={enquiry.budget} />
              </div>
              <div>
                <p className="text-xs font-medium text-gray-400 mb-1.5">Description</p>
                <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">{enquiry.project_description}</p>
              </div>
            </CardBody>
          </Card>

          {enquiry.file_path && (
            <Card>
              <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Attached file</h2></CardHeader>
              <CardBody>
                <a
                  href={BACKEND_URL + enquiry.file_path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-purple-700 hover:text-purple-800 font-medium"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  {enquiry.original_filename || 'Download file'}
                </a>
              </CardBody>
            </Card>
          )}
        </div>

        {/* Sidebar actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Lead status</h2></CardHeader>
            <CardBody>
              <Select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mb-4"
              >
                {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
              </Select>

              <div className="mb-4">
                <label className="text-xs font-medium text-gray-400 block mb-1.5">Internal notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={5}
                  placeholder="Add notes visible only to admins..."
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 outline-none resize-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100 transition-colors"
                />
              </div>

              <Button onClick={handleSave} loading={saving} className="w-full" size="sm">
                Save changes
              </Button>
              {saveMsg && <p className="text-xs text-center text-green-600 mt-2">{saveMsg}</p>}
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Button
                variant="danger"
                size="sm"
                className="w-full"
                loading={deleting}
                onClick={handleDelete}
              >
                Delete enquiry
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default LeadDetail;
