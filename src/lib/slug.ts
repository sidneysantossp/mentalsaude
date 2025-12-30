export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres acentuados
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim()
}

export function ensureUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
  let slug = baseSlug
  let counter = 1
  
  while (existingSlugs.includes(slug)) {
    slug = `${baseSlug}-${counter}`
    counter++
  }
  
  return slug
}
