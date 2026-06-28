import { useState, useEffect } from 'react';
import { fetchEnquiries } from '../../services/api';
import Card, { CardHeader, CardBody } from '../../components/ui/Card';

const Analytics = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEnquiries({ limit: 1000 })
      .then((r) => setData(r.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="h-8 w-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <p className="text-red-500 text-sm font-medium mb-1">Failed to load analytics</p>
        <p className="text-gray-400 text-xs">{error}</p>
      </div>
    </div>
  );

  const total = data.length;

  const byStatus = ['new', 'contacted', 'proposal_sent', 'won', 'lost'].map((s) => ({
    label: s.replace('_', ' '),
    count: data.filter((r) => r.status === s).length,
  }));

  const byProject = Object.entries(
    data.reduce((acc, r) => { acc[r.project_type] = (acc[r.project_type] || 0) + 1; return acc; }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const byBudget = Object.entries(
    data.reduce((acc, r) => { acc[r.budget] = (acc[r.budget] || 0) + 1; return acc; }, {}),
  ).sort((a, b) => b[1] - a[1]);

  const winRate = total > 0 ? ((data.filter((r) => r.status === 'won').length / total) * 100).toFixed(1) : 0;

  const Bar = ({ label, count, max }) => (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600 w-36 shrink-0 capitalize">{label}</span>
      <div className="flex-1 bg-gray-100 rounded-full h-2">
        <div
          className="bg-purple-600 h-2 rounded-full transition-all duration-500"
          style={{ width: max > 0 ? `${(count / max) * 100}%` : '0%' }}
        />
      </div>
      <span className="text-sm text-gray-900 font-medium w-6 text-right">{count}</span>
    </div>
  );

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
        <p className="text-gray-500 text-sm mt-1">Insights across {total} enquiries.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-gray-900">{total}</p>
          <p className="text-sm text-gray-500 mt-1">Total enquiries</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-green-600">{winRate}%</p>
          <p className="text-sm text-gray-500 mt-1">Win rate</p>
        </Card>
        <Card className="p-6 text-center">
          <p className="text-3xl font-bold text-purple-700">{data.filter((r) => r.status === 'won').length}</p>
          <p className="text-sm text-gray-500 mt-1">Projects won</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Leads by status</h2></CardHeader>
          <CardBody>
            <div className="space-y-4">
              {byStatus.map(({ label, count }) => (
                <Bar key={label} label={label} count={count} max={total} />
              ))}
            </div>
          </CardBody>
        </Card>

        <Card>
          <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Leads by project type</h2></CardHeader>
          <CardBody>
            <div className="space-y-4">
              {byProject.map(([label, count]) => (
                <Bar key={label} label={label} count={count} max={byProject[0]?.[1] || 1} />
              ))}
            </div>
          </CardBody>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><h2 className="font-semibold text-gray-900 text-sm">Leads by budget range</h2></CardHeader>
          <CardBody>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {byBudget.map(([label, count]) => (
                <Bar key={label} label={label} count={count} max={byBudget[0]?.[1] || 1} />
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
