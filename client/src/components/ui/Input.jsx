import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <input
      ref={ref}
      className={`
        w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900
        placeholder:text-gray-400 outline-none
        transition-colors duration-150
        focus:border-purple-500 focus:ring-2 focus:ring-purple-100
        disabled:bg-gray-50 disabled:cursor-not-allowed
        ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}
        ${className}
      `}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
));

Input.displayName = 'Input';
export default Input;

export const Textarea = forwardRef(({ label, error, className = '', ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <textarea
      ref={ref}
      rows={4}
      className={`
        w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900
        placeholder:text-gray-400 outline-none resize-none
        transition-colors duration-150
        focus:border-purple-500 focus:ring-2 focus:ring-purple-100
        ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-100' : ''}
        ${className}
      `}
      {...props}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
));

Textarea.displayName = 'Textarea';

export const Select = forwardRef(({ label, error, children, className = '', ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    {label && (
      <label className="text-sm font-medium text-gray-700">{label}</label>
    )}
    <select
      ref={ref}
      className={`
        w-full rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-sm text-gray-900
        outline-none transition-colors duration-150
        focus:border-purple-500 focus:ring-2 focus:ring-purple-100
        ${error ? 'border-red-400' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </select>
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
));

Select.displayName = 'Select';
