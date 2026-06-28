import { useState } from 'react';
import Button from '../../components/ui/Button';
import Input, { Textarea, Select } from '../../components/ui/Input';
import { submitEnquiry } from '../../services/api';

const PROJECT_TYPES = [
  'Website Development',
  'Branding',
  'Graphic Design',
  'Marketing',
  'UI/UX Design',
  'Full Package',
  'Other',
];

const BUDGETS = [
  'Under £1,000',
  '£1,000 – £3,000',
  '£3,000 – £7,500',
  '£7,500 – £15,000',
  '£15,000 – £30,000',
  '£30,000+',
];

const initialForm = {
  first_name: '', last_name: '', email: '', phone: '',
  company: '', project_type: '', budget: '', project_description: '',
};

const Contact = () => {
  const [form, setForm] = useState(initialForm);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState('');

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.first_name.trim()) e.first_name = 'Required';
    if (!form.last_name.trim()) e.last_name = 'Required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Valid email required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.company.trim()) e.company = 'Required';
    if (!form.project_type) e.project_type = 'Please select a project type';
    if (!form.budget) e.budget = 'Please select a budget range';
    if (form.project_description.trim().length < 20) e.project_description = 'Please provide at least 20 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setServerError('');

    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      if (file) fd.append('file', file);

      await submitEnquiry(fd);
      setSuccess(true);
      setForm(initialForm);
      setFile(null);
    } catch (err) {
      setServerError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 pt-20 bg-white">
        <div className="max-w-md text-center animate-fade-in">
          <div className="w-16 h-16 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-purple-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Enquiry received!</h2>
          <p className="text-gray-500 mb-8">Thank you for reaching out. We'll review your project and get back to you within 1–2 business days. Check your inbox for a confirmation email.</p>
          <Button variant="secondary" onClick={() => setSuccess(false)}>Send another enquiry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-24 bg-white">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">Start a project</h1>
          <p className="text-lg text-gray-500">Tell us what you're building and we'll put together a proposal.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="First name" placeholder="Jane" value={form.first_name} onChange={set('first_name')} error={errors.first_name} />
            <Input label="Last name" placeholder="Smith" value={form.last_name} onChange={set('last_name')} error={errors.last_name} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Email" type="email" placeholder="jane@company.com" value={form.email} onChange={set('email')} error={errors.email} />
            <Input label="Phone number" type="tel" placeholder="+44 7700 900000" value={form.phone} onChange={set('phone')} error={errors.phone} />
          </div>

          <Input label="Company" placeholder="Acme Ltd" value={form.company} onChange={set('company')} error={errors.company} />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Select label="Project type" value={form.project_type} onChange={set('project_type')} error={errors.project_type}>
              <option value="">Select a type</option>
              {PROJECT_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
            </Select>
            <Select label="Budget range" value={form.budget} onChange={set('budget')} error={errors.budget}>
              <option value="">Select a range</option>
              {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
            </Select>
          </div>

          <Textarea
            label="Project description"
            placeholder="Tell us about your project, goals, timeline, and any specific requirements..."
            rows={6}
            value={form.project_description}
            onChange={set('project_description')}
            error={errors.project_description}
          />

          {/* File upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-700">Attach a file <span className="text-gray-400 font-normal">(optional)</span></label>
            <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl py-8 px-4 cursor-pointer hover:border-purple-300 hover:bg-purple-50/30 transition-colors">
              <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span className="text-sm text-gray-500">
                {file ? file.name : 'Click to upload or drag and drop'}
              </span>
              <span className="text-xs text-gray-400">PDF, DOC, PNG, JPG up to 10MB</span>
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} />
            </label>
          </div>

          {serverError && (
            <div className="rounded-lg bg-red-50 border border-red-100 px-4 py-3 text-sm text-red-600">{serverError}</div>
          )}

          <Button type="submit" size="lg" loading={loading} className="w-full">
            Submit enquiry
          </Button>

          <p className="text-xs text-center text-gray-400">
            We typically respond within 1–2 business days. Your information is kept confidential.
          </p>
        </form>
      </div>
    </div>
  );
};

export default Contact;
