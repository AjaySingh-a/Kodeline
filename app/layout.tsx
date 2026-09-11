import type { Metadata } from "next";
import { Sora } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kodeline — Design. Develop. Deliver.",
  description:
    "Kodeline is a design and development studio building digital experiences that are clean, functional, and impactful. Based in Delhi, working worldwide.",
  icons: {
    icon: [{ url: "/kodeline-mark.svg", type: "image/svg+xml" }],
    shortcut: "/kodeline-mark.svg",
    apple: "/kodeline-mark.svg",
  },
  openGraph: {
    title: "Kodeline — Design. Develop. Deliver.",
    description:
      "A design and development studio building digital experiences that are clean, functional, and impactful.",
    url: "https://codeline.vercel.app",
    siteName: "Kodeline",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kodeline — Design. Develop. Deliver.",
    description:
      "A design and development studio building digital experiences that are clean, functional, and impactful.",
  },
  metadataBase: new URL("https://codeline.vercel.app"),
};

const themeInitScript = `(function(){try{var t=localStorage.getItem('kl-theme');document.documentElement.setAttribute('data-theme',t==='dark'?'dark':'light');}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={sora.variable}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
