import { useMemo, useState } from 'react';
import { CheckChip, Field } from './AppUI';

export default function SkillPicker({
  label,
  hint,
  error,
  selected = [],
  onChange,
  suggestions = [],
}) {
  const [manualSkill, setManualSkill] = useState('');
  const [filter, setFilter] = useState('');

  const isSelected = (skill) => selected.some((item) => item.toLowerCase() === skill.toLowerCase());

  const availableSuggestions = useMemo(() => {
    const q = filter.trim().toLowerCase();
    return suggestions
      .filter((skill) => !isSelected(skill))
      .filter((skill) => !q || skill.toLowerCase().includes(q));
  }, [filter, selected, suggestions]);

  const addSkill = (name) => {
    const trimmed = name.trim();
    if (!trimmed) return;
    if (isSelected(trimmed)) return;
    onChange([...selected, trimmed]);
    setManualSkill('');
  };

  const removeSkill = (name) => {
    onChange(selected.filter((item) => item !== name));
  };

  const toggleSkill = (skill) => {
    if (isSelected(skill)) {
      removeSkill(selected.find((item) => item.toLowerCase() === skill.toLowerCase()));
    } else {
      onChange([...selected, skill]);
    }
  };

  const handleManualAdd = () => {
    const trimmed = manualSkill.trim();
    if (!trimmed) return;

    const match = suggestions.find((skill) => skill.toLowerCase() === trimmed.toLowerCase());
    addSkill(match || trimmed);
  };

  return (
    <Field label={label} hint={hint} error={error}>
      {selected.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {selected.map((skill) => (
            <button
              key={skill}
              type="button"
              onClick={() => removeSkill(skill)}
              className="inline-flex items-center gap-1.5 rounded border border-ink bg-marigold px-3 py-1.5 font-mono text-[0.63rem] font-semibold text-ink"
            >
              {skill}
              <span aria-hidden="true">×</span>
              <span className="sr-only">Remove {skill}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-ink-soft">
          Add your own skill
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            value={manualSkill}
            onChange={(event) => setManualSkill(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault();
                handleManualAdd();
              }
            }}
            placeholder="e.g. Python, UI Design, Video Editing"
            className={`block min-w-0 flex-1 rounded border-[1.5px] border-line-strong bg-paper px-3.5 py-2.5 font-body text-[0.95rem] text-ink placeholder:text-ink-soft/75 focus:border-ink focus:bg-card focus:outline-none ${error ? 'border-madder' : ''}`}
          />
          <button
            type="button"
            onClick={handleManualAdd}
            disabled={!manualSkill.trim()}
            className="shrink-0 rounded border-[1.5px] border-ink bg-card px-4 py-2.5 font-mono text-[0.63rem] font-semibold uppercase tracking-[0.06em] text-ink transition-colors hover:bg-paper-2 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </div>

      {suggestions.length > 0 && (
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <p className="font-mono text-[0.56rem] font-semibold uppercase tracking-[0.11em] text-ink-soft">
              Or select from the list
            </p>
            {suggestions.length > 12 && (
              <input
                type="search"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Filter skills"
                className="w-full max-w-xs rounded border border-line-strong bg-paper px-3 py-1.5 text-sm text-ink focus:border-ink focus:outline-none sm:w-48"
                aria-label="Filter skill list"
              />
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {availableSuggestions.map((skill) => (
              <CheckChip
                key={skill}
                name="skills"
                value={skill}
                checked={isSelected(skill)}
                onChange={() => toggleSkill(skill)}
              />
            ))}
          </div>

          {filter && availableSuggestions.length === 0 && (
            <p className="text-sm text-ink-soft">
              No list matches for &ldquo;{filter}&rdquo;. Use Add above to save it as a custom skill.
            </p>
          )}
        </div>
      )}

      <p className={`mt-4 font-mono text-[0.58rem] uppercase tracking-[0.08em] ${error ? 'text-madder' : 'text-ink-soft'}`}>
        {selected.length} selected
      </p>
    </Field>
  );
}
