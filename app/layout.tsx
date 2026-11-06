import type { Metadata, Viewport } from "next";
import { Inter, Lora } from "next/font/google";
import { StoreProvider } from "@/lib/store";
import { LocaleProvider } from "@/lib/i18n/provider";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin", "latin-ext"],
  variable: "--font-lora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TASK - Myśl i działaj świadomie, razem",
  description:
    "TASK to portal komunikatów, które łączą warstwę myśli i warstwę czynu, z silnikiem analizy czynników zamiast metodą prób i błędów.",
};

export const viewport: Viewport = {
  themeColor: "#f6f3ec",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // `lang` jest aktualizowany przez LocaleProvider po nawodnieniu
    // (przegladarka ustawia document.documentElement.lang).
    <html lang="pl" className={`${inter.variable} ${lora.variable}`}>
      <body className="min-h-dvh antialiased">
        <LocaleProvider>
          <StoreProvider>
            <AppShell>{children}</AppShell>
          </StoreProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
