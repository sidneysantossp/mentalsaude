import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bate Papo - Chat Online',
  description: 'Entre em salas de bate papo e converse com pessoas de todo o Brasil em tempo real',
}

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}