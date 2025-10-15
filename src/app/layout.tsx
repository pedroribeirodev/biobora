import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "BioBora - Crie sua página bio em minutos",
    template: "%s | BioBora",
  },
  description: "Com o BioBora, você personaliza, compartilha e converte. Crie sua página de links profissional com layouts personalizáveis, botões para WhatsApp, captura de leads e muito mais.",
  keywords: ["link na bio", "bio", "links", "página de links", "link in bio", "bio link", "redes sociais", "instagram bio", "linktree alternativa"],
  authors: [{ name: "BioBora" }],
  creator: "BioBora",
  publisher: "BioBora",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "BioBora - Crie sua página bio em minutos",
    description: "Personalize, compartilhe e converta com sua página de links profissional",
    url: "/",
    siteName: "BioBora",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BioBora - Crie sua página bio em minutos",
    description: "Personalize, compartilhe e converta com sua página de links profissional",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
