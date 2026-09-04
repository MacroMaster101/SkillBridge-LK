export default function SkillTag({ skill, matched }) {
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${
        matched
          ? 'bg-green-100 text-green-800'
          : 'bg-gray-100 text-gray-600'
      }`}
    >
      {matched ? '✓ ' : '○ '}
      {skill}
    </span>
  );
}
