/** Keep the existing per-lesson keys so a redesign never deletes a learner's progress. */
export function readProgress(slug: string, count: number): number[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(`lesson-steps-${slug}`) || '[]');
    return Array.isArray(value) ? Array.from(new Set(value.filter((n): n is number => typeof n === 'number' && Number.isInteger(n) && n >= 0 && n < count))) : [];
  } catch { return []; }
}
export function writeProgress(slug: string, indices: number[]): boolean {
  try {
    localStorage.setItem(`lesson-steps-${slug}`, JSON.stringify(indices));
    window.dispatchEvent(new Event('lab-progress'));
    return true;
  } catch { return false; }
}
