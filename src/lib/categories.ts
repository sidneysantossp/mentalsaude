export const CATEGORY_LABELS: Record<string, string> = {
  DEPRESSION: 'Depressão',
  ANXIETY: 'Ansiedade',
  BURNOUT: 'Burnout',
  ADHD: 'TDAH',
  OCD: 'TOC',
  STRESS: 'Estresse',
  SLEEP: 'Sono',
  SELF_ESTEEM: 'Autoestima'
}

export const getCategoryLabel = (category: string) => {
  return CATEGORY_LABELS[category] || category
}
