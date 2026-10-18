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
  title: "AfetGuard AI | Personalized Household & Room Disaster Preparedness Assistant",
  description: "An AI-powered household resilience and room disaster preparedness assistant supporting UN Sustainable Development Goals (SDG 11.5 & SDG 13.1) with Google Gemini Multimodal Vision.",
  keywords: ["disaster preparedness", "emergency kit", "earthquake safety", "life triangle", "SDG 11", "SDG 13", "Gemini AI", "AFAD", "Sendai Framework"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark h-full antialiased">
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-[#090d16] text-slate-100 selection:bg-blue-600/30 selection:text-blue-200`}>
        {children}
      </body>
    </html>
  );
}
