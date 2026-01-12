const defaultProductionSiteUrl = 'https://www.mentalsaude.com.br'

export function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === 'production' ? defaultProductionSiteUrl : 'http://localhost:3000')
  )
}
