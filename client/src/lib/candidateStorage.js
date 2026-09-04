const STORAGE_KEY = 'skillbridge_candidate';

export function getCandidate() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export function saveCandidate(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function hasCandidate() {
  return getCandidate() !== null;
}
