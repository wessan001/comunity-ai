import { Inter, Roboto_Mono } from "next/font/google"
import LoginPage from "@/components/LoginPage"

const geistSans = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Roboto_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function Home() {
  return (
    <div className={`${geistSans.variable} ${geistMono.variable}`}>
      <LoginPage />
    </div>
  )
}
