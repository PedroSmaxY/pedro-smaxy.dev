import type { Metadata } from "next";
import { Instrument_Serif, Archivo, JetBrains_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import "./globals.css";
import { PORTFOLIO_CONFIG } from "@/lib/config";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

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

  const baseUrl = "https://pedro-smaxy-dev.vercel.app";

  return {
    title,
    description,
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
    metadataBase: new URL(baseUrl),
    openGraph: {
      type: "website",
      title: ogTitle,
      description: ogDescription,
      siteName,
      locale,
      alternateLocale: locale === "pt-BR" ? "en" : "pt-BR",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: `${shortName} - Portfolio Open Graph Image`,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [`${baseUrl}/og-image.png`],
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
    <html
      lang={locale}
      className={`${instrumentSerif.variable} ${archivo.variable} ${jetbrainsMono.variable} dark scroll-smooth`}
    >
      <body className="bg-[#0A0B0D] text-[#EDEAE2] font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
