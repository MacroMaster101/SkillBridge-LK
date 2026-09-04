import { Link } from 'react-router-dom';
import { Icon } from './PublicUI';

/* ============================================================================
   Shared UI for the signed-in surfaces (candidate, employer, admin).

   Same design language as the public pages — the "Route Board" direction:
   ink panels, marigold signal, hard offset shadows, and mono wayfinding
   labels. Written in Tailwind so it sits alongside the rest of the app code
   rather than in a second stylesheet.
   ========================================================================= */

/* A route label. The amber rule beside it is the track it sits on. */
export function Eyebrow({ children, tone = 'dark' }) {
  return (
    <p className={`flex items-center gap-2.5 font-mono text-[0.63rem] font-semibold uppercase tracking-[0.1em] ${
      tone === 'light' ? 'text-paper/60' : 'text-ink-soft'
    }`}>
      <span className="h-0.5 w-7 flex-none bg-marigold" />
      {children}
    </p>
  );
}

export function PageHeader({ eyebrow, title, lead, actions }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-x-10 gap-y-5 border-b border-line pb-7">
      <div className="flex max-w-2xl flex-col gap-3">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="font-display text-3xl font-bold tracking-[-0.035em] text-ink sm:text-4xl">
          {title}
        </h1>
        {lead && <p className="text-ink-soft">{lead}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-3">{actions}</div>}
    </header>
  );
}

export function Card({ children, className = '', as: Tag = 'div' }) {
  return (
    <Tag className={`rounded-[10px] border border-line bg-card shadow-card ${className}`}>
      {children}
    </Tag>
  );
}

export function SectionCard({ title, action, children, className = '' }) {
  return (
    <Card className={`p-6 ${className}`}>
      {(title || action) && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          {title && (
            <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">{title}</h2>
          )}
          {action}
        </div>
      )}
      {children}
    </Card>
  );
}

/* The readout from the landing page's match board: one big mono figure,
   a quiet mono label under it. */
export function StatCard({ label, value, hint }) {
  return (
    <Card className="p-5">
      <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-ink-soft">
        {label}
      </p>
      <p className="mt-3 font-mono text-4xl font-bold leading-none tracking-[-0.05em] text-ink tabular-nums">
        {value ?? '—'}
      </p>
      {hint && <p className="mt-2 text-xs text-ink-soft">{hint}</p>}
    </Card>
  );
}

/* A dark ink panel — the board. Use it for the one thing on a page that
   should carry weight, never for everything. */
export function Panel({ rail, children, foot, className = '' }) {
  return (
    <div className={`overflow-hidden rounded-[10px] bg-ink text-paper shadow-[0_40px_70px_-40px_rgba(20,32,46,0.75)] ${className}`}>
      {rail && (
        <div className="flex items-center gap-2.5 border-b border-white/10 bg-ink-2 px-5 py-3 font-mono text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-paper/70">
          <span className="h-[7px] w-[7px] flex-none rounded-full bg-marigold shadow-[0_0_0_3px_rgba(233,162,39,0.28)]" />
          {rail}
          <span className="ml-auto flex gap-[5px]" aria-hidden="true">
            <i className="h-[5px] w-[5px] rounded-full bg-paper/20" />
            <i className="h-[5px] w-[5px] rounded-full bg-paper/20" />
            <i className="h-[5px] w-[5px] rounded-full bg-paper/20" />
          </span>
        </div>
      )}
      <div className="p-5">{children}</div>
      {foot && (
        <p className="px-5 pb-4 font-mono text-[0.55rem] uppercase tracking-[0.07em] text-paper/50">
          {foot}
        </p>
      )}
    </div>
  );
}

const TONES = {
  neutral: 'bg-petrol-light text-petrol',
  ink: 'bg-ink text-paper',
  marigold: 'bg-marigold text-ink',
  petrol: 'bg-petrol text-paper',
  madder: 'bg-madder/10 text-madder',
  quiet: 'bg-paper-2 text-ink-soft',
};

export function Badge({ children, tone = 'neutral', className = '' }) {
  return (
    <span className={`inline-flex items-center rounded-[3px] px-2 py-1 font-mono text-[0.56rem] font-semibold uppercase tracking-[0.08em] ${TONES[tone]} ${className}`}>
      {children}
    </span>
  );
}

export function SkillChip({ children }) {
  return (
    <span className="rounded-[3px] bg-petrol-light px-2 py-1 font-mono text-[0.6rem] text-petrol">
      {children}
    </span>
  );
}

/* --- Form controls ------------------------------------------------------- */

const CONTROL =
  'block w-full rounded border-[1.5px] border-line-strong bg-paper px-3.5 py-2.5 font-body text-[0.95rem] text-ink ' +
  'placeholder:text-ink-soft/75 focus:border-ink focus:bg-card focus:outline-none';

export function Field({ label, hint, error, htmlFor, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={htmlFor}
          className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-ink-soft"
        >
          {label}
        </label>
      )}
      {children}
      {hint && !error && <p className="text-xs text-ink-soft">{hint}</p>}
      {error && <p className="text-xs font-medium text-madder">{error}</p>}
    </div>
  );
}

export function TextField({ label, hint, error, id, name, className = '', ...props }) {
  const inputId = id || name;
  return (
    <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <input
        id={inputId}
        name={name}
        className={`${CONTROL} ${error ? 'border-madder' : ''} ${className}`}
        {...props}
      />
    </Field>
  );
}

export function TextareaField({ label, hint, error, id, name, rows = 4, className = '', ...props }) {
  const inputId = id || name;
  return (
    <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <textarea id={inputId} name={name} rows={rows} className={`${CONTROL} ${className}`} {...props} />
    </Field>
  );
}

export function SelectField({ label, hint, error, id, name, options = [], className = '', ...props }) {
  const inputId = id || name;
  return (
    <Field label={label} hint={hint} error={error} htmlFor={inputId}>
      <select id={inputId} name={name} className={`${CONTROL} cursor-pointer ${className}`} {...props}>
        {options.map((option) => <option key={option} value={option}>{option}</option>)}
      </select>
    </Field>
  );
}

/* A toggleable chip — the same affordance as the landing page's skill cells,
   in the light palette. */
export function CheckChip({ name, value, checked, onChange, children }) {
  return (
    <label
      className={`inline-flex cursor-pointer items-center gap-2 rounded border px-3 py-1.5 font-mono text-[0.63rem] transition-colors ${
        checked
          ? 'border-ink bg-marigold font-semibold text-ink'
          : 'border-line-strong bg-card text-ink-soft hover:border-ink-soft hover:text-ink'
      }`}
    >
      <input
        type="checkbox"
        name={name}
        value={value}
        checked={checked}
        onChange={onChange}
        className="sr-only"
      />
      <span aria-hidden="true">{checked ? '✓' : '+'}</span>
      {children ?? value}
    </label>
  );
}

/* --- States -------------------------------------------------------------- */

export function EmptyState({ icon = 'search', title, message, action }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-[10px] border border-dashed border-line-strong bg-card px-6 py-14 text-center">
      <Icon name={icon} size={34} className="text-line-strong" />
      <h2 className="font-display text-xl font-bold tracking-[-0.02em] text-ink">{title}</h2>
      {message && <p className="max-w-sm text-sm text-ink-soft">{message}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

export function ErrorNote({ children }) {
  return (
    <p className="flex items-start gap-2 rounded border-l-[3px] border-madder bg-madder/[0.07] px-4 py-3 text-sm text-ink-soft">
      <Icon name="spark" size={16} className="mt-0.5 flex-none text-madder" />
      {children}
    </p>
  );
}

export function InfoNote({ children }) {
  return (
    <p className="flex items-start gap-2 rounded border-l-[3px] border-petrol bg-petrol-light px-4 py-3 text-sm text-petrol-dark">
      <Icon name="spark" size={16} className="mt-0.5 flex-none text-petrol" />
      {children}
    </p>
  );
}

/* A quiet inline link with the landing page's mono treatment. */
export function TextLink({ to, children }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-1.5 border-b-2 border-transparent pb-0.5 font-mono text-[0.68rem] font-semibold uppercase tracking-[0.04em] text-petrol hover:border-marigold"
    >
      {children}
    </Link>
  );
}

export { Icon };
