import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro SmaxY - Portfolio",
  description: "Desenvolvedor Full Stack",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
  },
  keywords: [
    "Pedro SmaxY",
    "Desenvolvedor Full Stack",
    "Portfolio",
    "Java",
    "Spring Boot",
    "Python",
    "FastAPI",
    "Next.js",
    "TypeScript",
  ],
  openGraph: {
    type: "website",
    title: "Pedro SmaxY - Portfolio",
    siteName: "Pedro SmaxY - Portfolio",
    images: ["/og-image.png"],
    description:
      "Desenvolvedor Full Stack apaixonado por tecnologia e inovação.",
  },
  authors: [{ name: "Pedro SmaxY", url: "https://github.com/PedroSmaxY" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body>{children}</body>
    </html>
  );
}
