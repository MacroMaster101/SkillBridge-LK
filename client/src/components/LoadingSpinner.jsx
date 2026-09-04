export default function LoadingSpinner({ size = 'md', className = '' }) {
  const sizes = { sm: 'h-4 w-4', md: 'h-8 w-8', lg: 'h-11 w-11' };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div
        className={`animate-spin rounded-full border-2 border-line-strong border-t-marigold ${sizes[size]}`}
        role="status"
        aria-label="Loading"
      />
    </div>
  );
}
