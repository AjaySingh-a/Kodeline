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
  title: "Codeline — AI tools and MVPs",
  description:
    "A two-person AI development studio. We build internal AI tools and MVPs for D2C brands and edtech companies. Internal tools in 2 weeks. MVPs in 3. Based in Delhi, working worldwide.",
  openGraph: {
    title: "Codeline — AI tools and MVPs",
    description:
      "A two-person AI development studio. We build internal AI tools and MVPs for D2C brands and edtech companies.",
    url: "https://codeline.vercel.app",
    siteName: "Codeline",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Codeline — AI tools and MVPs",
    description:
      "A two-person AI development studio. We build internal AI tools and MVPs for D2C brands and edtech companies.",
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
