import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/components/providers/mysql-auth-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mental Health Tests - Plataforma de Avaliação Psicológica",
  description: "Acesse testes psicológicos validados para entender melhor sua saúde mental. Depressão, Ansiedade, Burnout e mais.",
  keywords: ["saúde mental", "testes psicológicos", "depressão", "ansiedade", "burnout", "avaliação psicológica"],
  authors: [{ name: "Mental Health Tests Team" }],
  openGraph: {
    title: "Mental Health Tests",
    description: "Testes psicológicos validados para entender melhor sua saúde mental",
    url: "https://mentalhealthtests.com",
    siteName: "Mental Health Tests",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mental Health Tests",
    description: "Testes psicológicos validados para entender melhor sua saúde mental",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
