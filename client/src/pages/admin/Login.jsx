import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';

const Login = () => {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/admin" replace />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/admin');
    } catch {
      setError('Invalid email or password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <Link
        to="/"
        className="fixed top-4 left-4 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
      >
        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to site
      </Link>

      <div className="w-full max-w-sm animate-fade-in">
        <div className="text-center mb-8">
          <p className="text-2xl font-bold text-white">
            Rory <span className="text-purple-400">Dev</span>
          </p>
          <p className="text-gray-400 text-sm mt-1">Admin dashboard</p>
        </div>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
          <h1 className="text-lg font-semibold text-white mb-6">Sign in</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors"
                placeholder="admin@rorydev.com"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3.5 py-2.5 text-sm text-white placeholder:text-gray-500 outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-colors"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div className="rounded-lg bg-red-900/40 border border-red-800 px-4 py-3 text-sm text-red-300">{error}</div>
            )}

            <Button type="submit" loading={loading} className="w-full mt-2">Sign in</Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
