const variants = {
  primary: 'bg-purple-700 text-white hover:bg-purple-800 focus-visible:ring-purple-500',
  secondary: 'bg-white text-gray-900 border border-gray-200 hover:bg-gray-50 focus-visible:ring-gray-300',
  ghost: 'text-gray-600 hover:bg-gray-100 focus-visible:ring-gray-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  loading = false,
  disabled = false,
  ...props
}) => (
  <button
    className={`
      inline-flex items-center justify-center gap-2 rounded-lg font-medium
      transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${variants[variant]} ${sizes[size]} ${className}
    `}
    disabled={disabled || loading}
    {...props}
  >
    {loading && (
      <span className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
    )}
    {children}
  </button>
);

export default Button;
