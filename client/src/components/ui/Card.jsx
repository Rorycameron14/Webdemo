const Card = ({ children, className = '', hover = false, ...props }) => (
  <div
    className={`
      bg-white rounded-2xl border border-gray-100 shadow-sm
      ${hover ? 'transition-shadow duration-200 hover:shadow-md' : ''}
      ${className}
    `}
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = '' }) => (
  <div className={`px-6 pt-6 pb-4 ${className}`}>{children}</div>
);

export const CardBody = ({ children, className = '' }) => (
  <div className={`px-6 pb-6 ${className}`}>{children}</div>
);

export default Card;
