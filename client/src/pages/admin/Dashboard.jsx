import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchEnquiries } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Badge from '../../components/ui/Badge';

const greeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 18) return 'Good afternoon';
  return 'Good evening';
};

const fmt = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });

const pipeline = [
  { key: 'new',           label: 'New',           color: 'bg-blue-500' },
  { key: 'contacted',     label: 'Contacted',     color: 'bg-amber-400' },
  { key: 'proposal_sent', label: 'Proposal Sent', color: 'bg-purple-500' },
  { key: 'won',           label: 'Won',           color: 'bg-emerald-500' },
  { key: 'lost',          label: 'Lost',          color: 'bg-red-400' },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats]   = useState({ total: 0, new: 0, contacted: 0, proposal_sent: 0, won: 0, lost: 0 });
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const [recentRes, allRes] = await Promise.all([
          fetchEnquiries({ limit: 6, sort: 'created_at', order: 'desc' }),
          fetchEnquiries({ limit: 1000 }),
        ]);
        setRecent(recentRes.data);
        const rows = allRes.data;
        setStats({
          total:         allRes.pagination.total,
          new:           rows.filter((r) => r.status === 'new').length,
          contacted:     rows.filter((r) => r.status === 'contacted').length,
          proposal_sent: rows.filter((r) => r.status === 'proposal_sent').length,
          won:           rows.filter((r) => r.status === 'won').length,
          lost:          rows.filter((r) => r.status === 'lost').length,
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <span className="h-7 w-7 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
    </div>
  );

  const winRate = stats.total > 0 ? Math.round((stats.won / stats.total) * 100) : 0;

  return (
    <div className="min-h-screen bg-gray-50/50">

      {/* Top bar */}
      <div className="bg-white border-b border-gray-100 px-8 py-5 flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-gray-900">
            {greeting()}, {user?.email?.split('@')[0]} 👋
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">{fmt.format(new Date())}</p>
        </div>
        <Link
          to="/admin/leads"
          className="flex items-center gap-2 text-sm font-medium text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors px-4 py-2 rounded-lg"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          View all leads
        </Link>
      </div>

      <div className="px-8 py-8 max-w-6xl mx-auto space-y-8">

        {/* KPI row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total enquiries', value: stats.total, sub: 'all time' },
            { label: 'New this week',   value: stats.new,   sub: 'awaiting response' },
            { label: 'Projects won',    value: stats.won,   sub: 'closed deals' },
            { label: 'Win rate',        value: `${winRate}%`, sub: 'of all enquiries' },
          ].map(({ label, value, sub }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5">
              <p className="text-xs text-gray-400 mb-3">{label}</p>
              <p className="text-3xl font-bold text-gray-900 leading-none mb-1">{value}</p>
              <p className="text-xs text-gray-400">{sub}</p>
            </div>
          ))}
        </div>

        {/* Pipeline */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-sm font-semibold text-gray-900">Pipeline</h2>
              <p className="text-xs text-gray-400 mt-0.5">{stats.total} total enquiries across all stages</p>
            </div>
          </div>

          {/* Bar */}
          {stats.total > 0 ? (
            <>
              <div className="flex rounded-full overflow-hidden h-2.5 mb-5 gap-px">
                {pipeline.map(({ key, color }) =>
                  stats[key] > 0 ? (
                    <div
                      key={key}
                      className={`${color} transition-all duration-500`}
                      style={{ width: `${(stats[key] / stats.total) * 100}%` }}
                    />
                  ) : null
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                {pipeline.map(({ key, label, color }) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${color} shrink-0`} />
                    <div>
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-semibold text-gray-900">{stats[key]}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="py-8 text-center">
              <p className="text-sm text-gray-400">No leads yet. Submit your first enquiry via the contact form.</p>
            </div>
          )}
        </div>

        {/* Recent enquiries */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Recent enquiries</h2>
            <Link to="/admin/leads" className="text-xs text-purple-700 hover:underline font-medium">See all</Link>
          </div>

          {recent.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-100 py-16 text-center">
              <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
              </div>
              <p className="text-sm text-gray-400">No enquiries yet.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50">
              {recent.map((r) => (
                <Link
                  key={r.id}
                  to={`/admin/leads/${r.id}`}
                  className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/60 transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xs font-bold shrink-0 group-hover:bg-purple-100 transition-colors">
                      {r.first_name[0]}{r.last_name[0]}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{r.first_name} {r.last_name}</p>
                      <p className="text-xs text-gray-400 truncate">{r.company} · {r.project_type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 ml-4">
                    <span className="text-xs text-gray-400 hidden sm:block">
                      {new Date(r.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                    </span>
                    <Badge status={r.status} />
                    <svg className="w-3.5 h-3.5 text-gray-300 group-hover:text-purple-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
