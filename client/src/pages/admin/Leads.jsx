import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEnquiries } from '../../hooks/useEnquiries';
import { deleteEnquiry } from '../../services/api';
import Table, { Thead, Tbody, Th, Td, Tr } from '../../components/ui/Table';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import { Select } from '../../components/ui/Input';

const STATUSES = ['', 'new', 'contacted', 'proposal_sent', 'won', 'lost'];
const STATUS_LABELS = { '': 'All statuses', new: 'New', contacted: 'Contacted', proposal_sent: 'Proposal Sent', won: 'Won', lost: 'Lost' };

const Leads = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sort, setSort] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState(null);

  const { data, pagination, loading, refresh } = useEnquiries(
    useCallback(() => ({ search, status, sort, order, page, limit: 15 }), [search, status, sort, order, page])(),
  );

  const handleSort = (col) => {
    if (sort === col) setOrder((o) => o === 'asc' ? 'desc' : 'asc');
    else { setSort(col); setOrder('asc'); }
    setPage(1);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (!window.confirm('Delete this enquiry? This cannot be undone.')) return;
    setDeleting(id);
    try {
      await deleteEnquiry(id);
      refresh();
    } finally {
      setDeleting(null);
    }
  };

  const SortIcon = ({ col }) => {
    if (sort !== col) return <span className="text-gray-300 ml-1">↕</span>;
    return <span className="text-purple-600 ml-1">{order === 'asc' ? '↑' : '↓'}</span>;
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <div className="mb-8 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-500 text-sm mt-1">
            {pagination ? `${pagination.total} total enquiries` : 'Loading...'}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="w-64">
          <Input
            placeholder="Search name, email, company..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          />
        </div>
        <div className="w-44">
          <Select value={status} onChange={(e) => { setStatus(e.target.value); setPage(1); }}>
            {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABELS[s]}</option>)}
          </Select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-24">
          <span className="h-8 w-8 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
        </div>
      ) : (
        <>
          <Table>
            <Thead>
              <tr>
                <Th sortable onClick={() => handleSort('first_name')}>Name <SortIcon col="first_name" /></Th>
                <Th sortable onClick={() => handleSort('company')}>Company <SortIcon col="company" /></Th>
                <Th>Email</Th>
                <Th sortable onClick={() => handleSort('budget')}>Budget <SortIcon col="budget" /></Th>
                <Th>Project Type</Th>
                <Th sortable onClick={() => handleSort('status')}>Status <SortIcon col="status" /></Th>
                <Th sortable onClick={() => handleSort('created_at')}>Date <SortIcon col="created_at" /></Th>
                <Th />
              </tr>
            </Thead>
            <Tbody>
              {data.length === 0 ? (
                <Tr>
                  <Td className="text-center text-gray-400 py-12" colSpan={8}>No leads found.</Td>
                </Tr>
              ) : data.map((row) => (
                <Tr key={row.id} onClick={() => navigate(`/admin/leads/${row.id}`)}>
                  <Td>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-semibold shrink-0">
                        {row.first_name[0]}{row.last_name[0]}
                      </div>
                      <span className="font-medium text-gray-900">{row.first_name} {row.last_name}</span>
                    </div>
                  </Td>
                  <Td>{row.company}</Td>
                  <Td className="text-gray-500">{row.email}</Td>
                  <Td>{row.budget}</Td>
                  <Td>{row.project_type}</Td>
                  <Td><Badge status={row.status} /></Td>
                  <Td className="text-gray-400 text-xs">{new Date(row.created_at).toLocaleDateString()}</Td>
                  <Td>
                    <button
                      onClick={(e) => handleDelete(row.id, e)}
                      disabled={deleting === row.id}
                      className="text-gray-300 hover:text-red-500 transition-colors text-xs"
                    >
                      {deleting === row.id ? '...' : 'Delete'}
                    </button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-4">
              <p className="text-sm text-gray-500">
                Page {pagination.page} of {pagination.totalPages}
              </p>
              <div className="flex gap-2">
                <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
                <Button variant="secondary" size="sm" disabled={page >= pagination.totalPages} onClick={() => setPage((p) => p + 1)}>Next</Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Leads;
