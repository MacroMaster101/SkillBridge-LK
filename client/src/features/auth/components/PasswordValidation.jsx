import { Icon } from '../../../components/PublicUI';
import { CANDIDATE_PASSWORD_RULES, PASSWORD_MIN_LENGTH } from '../../../lib/validation';

export function PasswordValidation({ password, register = false, role = 'candidate' }) {
  const length = password.length;
  const strictCandidateRules = register && role === 'candidate';

  if (length === 0) {
    return (
      <span className="sb-field-hint">
        {strictCandidateRules
          ? 'Use 8+ characters with uppercase, lowercase, a number, and a special character.'
          : '8 characters required'}
      </span>
    );
  }

  const rules = strictCandidateRules
    ? CANDIDATE_PASSWORD_RULES.map((rule) => ({
        id: rule.id,
        label: rule.label,
        met: rule.test(password),
        detail: rule.id === 'length' ? `${length}/${PASSWORD_MIN_LENGTH}` : undefined,
      }))
    : register
      ? [{
          id: 'length',
          label: '8 characters required',
          met: length >= PASSWORD_MIN_LENGTH,
          detail: `${length}/${PASSWORD_MIN_LENGTH}`,
        }]
      : [
          { id: 'entered', label: 'Password entered', met: length > 0 },
          {
            id: 'length',
            label: '8 characters required',
            met: length >= PASSWORD_MIN_LENGTH,
            detail: `${length}/${PASSWORD_MIN_LENGTH}`,
          },
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

export function isPasswordValid(password, register = false, role = 'candidate') {
  if (!password) return false;
  if (register && role === 'candidate') {
    return CANDIDATE_PASSWORD_RULES.every((rule) => rule.test(password));
  }
  if (register) return password.length >= PASSWORD_MIN_LENGTH;
  return password.length > 0;
}
