import type { Metadata } from "next";
import { Permanent_Marker, Caveat, Kalam } from "next/font/google";
import "./globals.css";

const permanentMarker = Permanent_Marker({
  weight: "400",
  variable: "--font-marker",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-handwritten",
  subsets: ["latin"],
  display: "swap",
});

const kalam = Kalam({
  weight: ["300", "400", "700"],
  variable: "--font-stats",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Almanaque da Copa do Mundo 2026 – Scrapbook & Colagem",
  description: "Explore seleções, jogadores e estatísticas históricas em um álbum de recortes tátil interativo digital.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${permanentMarker.variable} ${caveat.variable} ${kalam.variable} antialiased overflow-x-hidden`}
    >
      <body className="min-h-screen flex flex-col font-handwritten">
        {children}
      </body>
    </html>
  );
}
