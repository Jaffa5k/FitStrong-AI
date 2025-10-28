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
  title: "FitStrong AI - Personal Trainer Inteligente",
  description: "Treinos e dietas personalizadas criadas por IA. Transforme seu corpo com planos únicos baseados no seu perfil e objetivos.",
  keywords: "fitness, musculação, emagrecimento, IA, personal trainer, treino personalizado, dieta",
  authors: [{ name: "FitStrong AI" }],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#F97316",
  manifest: "/manifest.json",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-geist-sans`}
      >
        {children}
      </body>
    </html>
  );
}