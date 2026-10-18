import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AfetGuard AI | Kişiselleştirilmiş Hane ve Oda Afet Hazırlık Asistanı",
  description: "Birleşmiş Milletler Sürdürülebilir Kalkınma Amaçları (SDG 11.5 & SDG 13.1) destekli, çok modlu yapay zekâ ile güçlendirilmiş hane ve oda afet dirençlilik platformu.",
  keywords: ["afet hazırlığı", "deprem çantası", "oda güvenliği", "hayat üçgeni", "SDG 11", "SDG 13", "Gemini AI", "AFAD"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#090d16] text-slate-100 selection:bg-blue-600/30 selection:text-blue-200`}>
        {children}
      </body>
    </html>
  );
}
