import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Instrument_Serif } from "next/font/google";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kodeline — Web, App & Design Studio",
  description:
    "A two-person studio building websites, mobile apps, and digital products — with AI integration built in. Based in Delhi, working worldwide.",
  openGraph: {
    title: "Kodeline — Web, App & Design Studio",
    description:
      "A two-person studio building websites, mobile apps, and digital products — with AI integration built in.",
    url: "https://codeline.vercel.app",
    siteName: "Kodeline",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodeline — Web, App & Design Studio",
    description:
      "A two-person studio building websites, mobile apps, and digital products — with AI integration built in.",
  },
  metadataBase: new URL("https://codeline.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
