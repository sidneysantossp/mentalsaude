import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function MainTestsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 bg-background">
        {children}
      </main>
      <Footer />
    </div>
  )
}
