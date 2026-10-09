import type { Metadata } from "next";
import { withBasePath } from "@/lib/base-path";
import "@fontsource-variable/inter/wght.css";
import "@fontsource-variable/eb-garamond/wght.css";
import "@fontsource-variable/eb-garamond/wght-italic.css";
import "@fontsource-variable/caveat/wght.css";
import "@fontsource/homemade-apple/latin.css";
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

export const metadata: Metadata = {
  title: {
    default: "Junjie's Travel Journal",
    template: "%s · Junjie's Travel Journal",
  },
  description: "A hand-kept journal of travels — photos, food, and small discoveries.",
  authors: [{ name: "Junjie Li" }],
  icons: {
    icon: {
      url: withBasePath("/favicon-rounded.png"),
      type: "image/png",
      sizes: "64x64",
    },
  },
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
      <body>{children}</body>
    </html>
  );
}
