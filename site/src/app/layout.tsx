import type { Metadata } from "next";
import { EB_Garamond, Caveat, Homemade_Apple, Inter } from "next/font/google";
import "./fonts/lxgw-wenkai/style.css";
import "./globals.css";

const themeInitializationScript = `
  (() => {
    const storageKey = "travel-log-theme";
    let savedTheme = null;

    try {
      const value = window.localStorage.getItem(storageKey);
      if (value === "light" || value === "dark") savedTheme = value;
    } catch (error) {
      console.warn("Unable to read the saved theme preference.", error);
    }

    const theme = savedTheme ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.dataset.themeSource = savedTheme ? "user" : "system";
    root.style.colorScheme = theme;
  })();
`;

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
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="color-scheme" content="light dark" />
        <script dangerouslySetInnerHTML={{ __html: themeInitializationScript }} />
      </head>
      <body className={`${inter.variable} ${ebGaramond.variable} ${caveat.variable} ${homemadeApple.variable}`}>
        {children}
      </body>
    </html>
  );
}
