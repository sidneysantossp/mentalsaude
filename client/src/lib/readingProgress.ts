export function calculateReadingProgress(scrollY: number, viewportHeight: number, documentHeight: number): number {
  const scrollableDistance = documentHeight - viewportHeight;

  if (scrollableDistance <= 0) {
    return 100;
  }

  const rawProgress = (scrollY / scrollableDistance) * 100;
  return Math.min(100, Math.max(0, Math.round(rawProgress)));
}

export function getActiveSectionId(
  sections: Array<{ id: string; top: number }>,
  activationOffset = 160,
): string {
  if (sections.length === 0) return "";

  const active = sections
    .filter(section => section.top <= activationOffset)
    .sort((a, b) => b.top - a.top)[0];

  return active?.id ?? sections[0].id;
}
