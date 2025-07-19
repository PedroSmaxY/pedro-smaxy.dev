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
    metadataBase: PORTFOLIO_CONFIG.baseMetadata.metadataBase,
    keywords,
    icons: {
      icon: [...PORTFOLIO_CONFIG.baseMetadata.icons.icon],
      apple: PORTFOLIO_CONFIG.baseMetadata.icons.apple,
    },
    authors: [...PORTFOLIO_CONFIG.baseMetadata.authors],
    openGraph: {
      type: PORTFOLIO_CONFIG.baseMetadata.openGraph.type,
      title: ogTitle,
      description: ogDescription,
      siteName,
      locale,
      alternateLocale: locale === "pt-BR" ? "en" : "pt-BR",
      images: [...PORTFOLIO_CONFIG.baseMetadata.openGraph.images],
    },
    alternates: {
      languages: {
        "pt-BR": "/pt-br",
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
