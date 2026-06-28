const Table = ({ children, className = '' }) => (
  <div className={`overflow-x-auto rounded-xl border border-gray-100 ${className}`}>
    <table className="w-full text-sm text-left">{children}</table>
  </div>
);

export const Thead = ({ children }) => (
  <thead className="bg-gray-50 border-b border-gray-100">
    {children}
  </thead>
);

export const Tbody = ({ children }) => (
  <tbody className="divide-y divide-gray-50">{children}</tbody>
);

export const Th = ({ children, className = '', onClick, sortable = false }) => (
  <th
    className={`px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wide whitespace-nowrap
      ${sortable ? 'cursor-pointer hover:text-gray-700 select-none' : ''}
      ${className}`}
    onClick={onClick}
  >
    {children}
  </th>
);

export const Td = ({ children, className = '' }) => (
  <td className={`px-4 py-3.5 text-gray-700 whitespace-nowrap ${className}`}>{children}</td>
);

export const Tr = ({ children, className = '', onClick }) => (
  <tr
    className={`bg-white transition-colors hover:bg-gray-50/60 ${onClick ? 'cursor-pointer' : ''} ${className}`}
    onClick={onClick}
  >
    {children}
  </tr>
);

export default Table;
