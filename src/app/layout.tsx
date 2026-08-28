import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: {
    default: "OpenRemap — Open-Source ECU Binary Toolkit",
    template: "%s | OpenRemap",
  },
  description:
    "OpenRemap is the open-source ECU binary intelligence layer — identify, health-check, diff, and tune ECU binaries. Free, offline, no data leaves your machine. OpenRemap Harness, the desktop app, lands with v1.0.0.",
  keywords: [
    "OpenRemap",
    "OpenRemap Harness",
    "ECU binary tool",
    "ECU binary identification",
    "ECU remap tool",
    "open source ECU tuning",
    "ECU binary diff",
    "ECU binary patch",
    "ECU recipe file",
    "WinOLS alternative",
    "ECM Titanium alternative",
    "Bosch EDC17",
    "Bosch EDC16",
    "Bosch ME7",
    "Siemens SIMOS",
    "Delphi ECU",
    "Marelli ECU",
    "Denso ECU",
    "Hitachi ECU",
    "ECU health check",
    "ECU checksum",
    "chip tuning tool",
    "ECU file scanner",
    "remap recipe",
    "ECU confidence scoring",
    "OBD tuning file",
    "free ECU tool",
    "offline ECU tool",
    "tuning workshop tool",
    "independent tuner tool",
  ],
  authors: [{ name: "OpenRemap Contributors" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://openremap.com",
    siteName: "OpenRemap",
    title: "OpenRemap — Open-Source ECU Binary Toolkit",
    description:
      "Identify, health-check, diff, and tune ECU binaries — free, offline, open source. OpenRemap Harness desktop app coming in v1.0.0.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenRemap — Open-Source ECU Binary Toolkit",
    description:
      "Identify, health-check, diff, and tune ECU binaries — free, offline, open source.",
  },
  icons: {
    icon: "/icon.svg",
  },
  alternates: {
    canonical: "https://openremap.com",
  },
  metadataBase: new URL("https://openremap.com"),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`dark ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-screen flex-col bg-bg font-sans text-neutral-200 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "OpenRemap",
              url: "https://openremap.com",
              description:
                "Open-source ECU binary intelligence layer — identify, health-check, diff, and tune ECU binaries. Free, offline, and open source.",
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "OpenRemap",
              applicationCategory: "DeveloperApplication",
              operatingSystem: "Windows, macOS, Linux",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
              url: "https://openremap.com",
              downloadUrl: "https://pypi.org/project/openremap/",
              license: "https://opensource.org/licenses/MIT",
            }),
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
