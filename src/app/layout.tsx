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

export const viewport = {
  themeColor: "#9a754b",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Almanaque da Copa 2026 – Scrapbook & Álbum de Figurinhas",
    template: "%s | Almanaque da Copa 2026",
  },
  description: "Explore as seleções mundiais, estatísticas históricas de jogadores, lendas lendárias, curiosidades culturais e gastronomia local de forma interativa e tátil com estilo scrapbook / colagem analógica.",
  keywords: [
    "Copa do Mundo 2026",
    "Almanaque da Copa",
    "Álbum de Figurinhas",
    "Scrapbook",
    "Colagem Analógica",
    "Estatísticas da Copa",
    "Futebol",
    "Seleção Brasileira",
    "Mesa de Trabalho",
    "Jogadores de Futebol",
    "História da Copa do Mundo"
  ],
  authors: [{ name: "Jonas Maia", url: "https://github.com/JonasMaia12" }],
  creator: "Jonas Maia",
  publisher: "Jonas Maia",
  metadataBase: new URL("https://almanaque-copa.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "https://almanaque-copa.vercel.app",
    siteName: "Almanaque da Copa 2026",
    title: "Almanaque da Copa 2026 – Scrapbook & Álbum de Figurinhas",
    description: "Explore seleções, jogadores e estatísticas históricas em um álbum de recortes tátil interativo digital.",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Almanaque da Copa 2026",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Almanaque da Copa 2026 – Scrapbook & Álbum de Figurinhas",
    description: "Explore seleções, jogadores e estatísticas históricas em um álbum de recortes tátil interativo digital.",
    images: ["/icon.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
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
