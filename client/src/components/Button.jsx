const VARIANTS = {
  // The landing page's primary: ink block, marigold shadow offset behind it.
  primary:
    'bg-ink text-paper border-ink shadow-signal hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-signal-lg active:translate-x-px active:translate-y-px',
  secondary:
    'bg-transparent text-ink border-ink shadow-quiet hover:bg-card hover:-translate-x-0.5 hover:-translate-y-0.5',
  signal:
    'bg-marigold text-ink border-ink shadow-ink hover:-translate-x-0.5 hover:-translate-y-0.5',
  danger:
    'bg-madder text-paper border-madder shadow-ink hover:-translate-x-0.5 hover:-translate-y-0.5',
  ghost:
    'border-transparent bg-transparent text-petrol hover:bg-petrol-light',
};

const SIZES = {
  sm: 'px-3 py-2 text-[0.62rem]',
  md: 'px-5 py-3 text-[0.72rem]',
  lg: 'px-6 py-3.5 text-[0.78rem]',
};

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 rounded border-2 font-mono font-semibold uppercase tracking-[0.02em] transition-all duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-ink disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
