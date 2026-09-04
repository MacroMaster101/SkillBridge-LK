export function withSavedOption(options, value) {
  if (!value || options.includes(value)) return options;
  return [value, ...options];
}
