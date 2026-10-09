import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.APP_ORIGIN || "https://albinussoren.in"),
  title: {
    default: "Albinus Soren — Developer & Creator",
    template: "%s | Albinus Soren"
  },
  description: "Albinus Soren — developer, AI enthusiast, and digital creator building useful digital experiences.",
  applicationName: "Albinus Soren Portfolio",
  openGraph: {
    title: "Albinus Soren — Developer & Creator",
    description: "Building ideas into digital reality.",
    type: "website",
    siteName: "Albinus Soren"
  },
  twitter: {
    card: "summary_large_image",
    title: "Albinus Soren — Developer & Creator",
    description: "Building ideas into digital reality."
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}