import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pedro SmaxY - Portfolio",
  description: "Desenvolvedor Full Stack",
  metadataBase: new URL(process.env.METADATA_BASE || "http://localhost:3000"),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
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

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const messages = await getMessages();

  const { locale } = await params;

  return (
    <html lang={locale} className="scroll-smooth">
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
