import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import { PORTFOLIO_CONFIG } from "@/lib/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "portfolio.metadata" });

  // Extract personal and links information from the config
  const { shortName } = PORTFOLIO_CONFIG.personal;
  const { githubUrl } = PORTFOLIO_CONFIG.links;

  // Fetch messages for the current locale
  const title = t("title");
  const description = t("description");
  const keywords = t.raw("keywords") as string[];
  const ogTitle = t("openGraph.title");
  const ogDescription = t("openGraph.description");
  const siteName = t("openGraph.siteName");

  return {
    title,
    description,
    metadataBase: new URL(process.env.METADATA_BASE || "http://localhost:3000"),
    keywords,
    icons: {
      icon: [
        { url: "/favicon.ico" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: "/apple-touch-icon.png",
    },
    authors: [
      {
        name: shortName,
        url: githubUrl,
      },
    ],
    openGraph: {
      type: "website",
      title: ogTitle,
      description: ogDescription,
      siteName,
      locale,
      alternateLocale: locale === "pt-BR" ? "en" : "pt-BR",
      images: [
        {
          url: "/og-image.png",
          width: 1200,
          height: 630,
          alt: `${shortName} - Portfolio Open Graph Image`,
          type: "image/png",
        },
      ],
    },
    alternates: {
      languages: {
        "pt-BR": "/pt-BR",
        en: "/en",
      },
    },
  };
}

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
