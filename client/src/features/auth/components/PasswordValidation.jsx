import { Icon } from '../../../components/PublicUI';

const MIN_LENGTH = 8;

export function PasswordValidation({ password, register = false }) {
  const length = password.length;
  const hasMinLength = length >= MIN_LENGTH;

  if (length === 0) {
    return <span className="sb-field-hint">8 characters required</span>;
  }

  const rules = register
    ? [{ id: 'length', label: '8 characters required', met: hasMinLength, detail: `${length}/${MIN_LENGTH}` }]
    : [
        { id: 'entered', label: 'Password entered', met: length > 0 },
        { id: 'length', label: '8 characters required', met: hasMinLength, detail: `${length}/${MIN_LENGTH}` },
      ];

  return (
    <ul className="sb-password-rules" role="status" aria-live="polite">
      {rules.map((rule) => (
        <li key={rule.id} className={rule.met ? 'met' : 'unmet'}>
          <Icon name={rule.met ? 'check' : 'close'} size={14} />
          <span>
            {rule.label}
            {!rule.met && rule.detail ? ` (${rule.detail})` : ''}
          </span>
        </li>
      ))}
    </ul>
  );
}

export function isPasswordValid(password, register = false) {
  if (!password) return false;
  if (register) return password.length >= MIN_LENGTH;
  return password.length > 0;
}
