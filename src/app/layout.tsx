// src/app/layout.tsx
import './globals.css'
import { Inter, Roboto_Mono } from 'next/font/google'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const robotoMono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' })

export const metadata = {
  title: 'Seu SaaS Futurista',
  description: 'Painel VIP futurista para Telegram',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${inter.variable} ${robotoMono.variable}`}>
      <body className="bg-[#121212] text-white font-sans">
        {children}
      </body>
    </html>
  )
}
