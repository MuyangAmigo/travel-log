import type { Metadata } from "next";
import { EB_Garamond, Caveat, Homemade_Apple, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-eb-garamond",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-caveat",
  display: "swap",
});

const homemadeApple = Homemade_Apple({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-homemade-apple",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Junjie's Travel Journal",
    template: "%s · Junjie's Travel Journal",
  },
  description: "A hand-kept journal of travels — photos, food, and small discoveries.",
  authors: [{ name: "Junjie Li" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-webfont@1.7.0/style.css"
        />
      </head>
      <body className={`${inter.variable} ${ebGaramond.variable} ${caveat.variable} ${homemadeApple.variable}`}>
        {children}
      </body>
    </html>
  );
}
