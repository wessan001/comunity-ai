import { Geist, Geist_Mono } from "next/font/google";
import LoginPage from "@/app/login/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
   <div>
    < LoginPage />
   </div>
  );
}
