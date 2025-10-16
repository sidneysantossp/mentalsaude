/**
 * Utilitários para geração e manipulação de slugs canônicos
 */

/**
 * Converte texto para formato slug (URL amigável)
 * Remove caracteres especiais, acentos e espaços
 */
export function generateSlug(text: string): string {
  return text
    .toString()
    .normalize('NFD') // Normaliza para decompor caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove diacríticos
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/[^\w\-]+/g, '') // Remove caracteres não alfanuméricos exceto hífens
    .replace(/\-\-+/g, '-') // Substitui múltiplos hífens por um único
    .replace(/^-+/, '') // Remove hífens do início
    .replace(/-+$/, '') // Remove hífens do fim
}

/**
 * Converte categoria do banco para formato URL
 */
export function getCategorySlug(category: string): string {
  const categoryMap: Record<string, string> = {
    'COMPULSAO_ALIMENTAR': 'compulsao-alimentar',
    'DEPRESSAO': 'depressao',
    'DEPRESSAO_MAIOR': 'depressao-maior',
    'FOBIA_SOCIAL': 'fobia-social',
    'INSONIA': 'insonia',
    'BURNOUT': 'burnout',
    'ESTRESSE': 'estresse',
    'SINDROME_IMPOSTOR': 'sindrome-impostor',
    'TDAH': 'tdah',
    'TOC': 'toc',
    'TRANSTORNO_AFETIVO_BIPOLAR': 'transtorno-bipolar',
    'TRANSTORNO_ANSIEDADE': 'transtorno-ansiedade'
  }
  
  return categoryMap[category] || generateSlug(category)
}

/**
 * Gera URL canônica completa para um teste
 * Formato: /testes/categoria/slug-do-teste
 */
export function generateCanonicalUrl(category: string, title: string): string {
  const categorySlug = getCategorySlug(category)
  const testSlug = generateSlug(title)
  return `/testes/${categorySlug}/${testSlug}`
}

/**
 * Gera slug único para um teste, evitando duplicatas
 */
export function generateUniqueSlug(title: string, existingSlugs: string[] = []): string {
  let slug = generateSlug(title)
  let counter = 1
  
  // Se o slug já existe, adiciona um sufixo numérico
  while (existingSlugs.includes(slug)) {
    slug = `${generateSlug(title)}-${counter}`
    counter++
  }
  
  return slug
}

/**
 * Extrai informações da URL canônica
 */
export function parseCanonicalUrl(url: string): {
  category: string
  slug: string
} | null {
  const match = url.match(/^\/testes\/([^\/]+)\/([^\/]+)$/)
  
  if (!match) {
    return null
  }
  
  return {
    category: match[1],
    slug: match[2]
  }
}

/**
 * Valida se um slug está em formato correto
 */
export function isValidSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)
}

/**
 * Lista de categorias válidas para URLs
 */
export const VALID_CATEGORIES = [
  'compulsao-alimentar',
  'depressao',
  'depressao-maior',
  'fobia-social',
  'insonia',
  'burnout',
  'estresse',
  'sindrome-impostor',
  'tdah',
  'toc',
  'transtorno-bipolar',
  'transtorno-ansiedade'
] as const

/**
 * Verifica se uma categoria é válida
 */
export function isValidCategory(category: string): boolean {
  return VALID_CATEGORIES.includes(category as any)
}