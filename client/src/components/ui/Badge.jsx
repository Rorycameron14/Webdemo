const variants = {
  new:           'bg-blue-50 text-blue-700 ring-blue-600/20',
  contacted:     'bg-yellow-50 text-yellow-700 ring-yellow-600/20',
  proposal_sent: 'bg-purple-50 text-purple-700 ring-purple-600/20',
  won:           'bg-green-50 text-green-700 ring-green-600/20',
  lost:          'bg-red-50 text-red-700 ring-red-600/20',
  default:       'bg-gray-50 text-gray-600 ring-gray-500/20',
};

const labels = {
  new:           'New',
  contacted:     'Contacted',
  proposal_sent: 'Proposal Sent',
  won:           'Won',
  lost:          'Lost',
};

const Badge = ({ status, className = '' }) => {
  const style = variants[status] || variants.default;
  const label = labels[status] || status;

  return (
    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${style} ${className}`}>
      {label}
    </span>
  );
};

export default Badge;
