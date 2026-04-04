import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "OpenRemap — Open-Source ECU Binary Toolkit",
    template: "%s | OpenRemap",
  },
  description:
    "Identify, diff, and patch ECU binaries with OpenRemap. Free, offline, open-source toolkit supporting Bosch, Siemens, Delphi, and Marelli ECUs. No data leaves your machine.",
  keywords: [
    "ECU binary tool",
    "ECU binary identification",
    "ECU remap tool",
    "open source ECU tuning",
    "ECU binary diff",
    "ECU binary patch",
    "ECU recipe file",
    "WinOLS alternative",
    "ECM Titanium alternative",
    "Bosch ECU tool",
    "Bosch EDC16",
    "Bosch EDC17",
    "Bosch ME7",
    "Bosch MED17",
    "Siemens ECU",
    "Delphi ECU",
    "Marelli ECU",
    "ECU binary identify",
    "ECU flash file tool",
    "ECU calibration diff",
    "chip tuning tool",
    "ECU file scanner",
    "openremap",
    "remap recipe",
    "ECU confidence scoring",
    "ECU family detection",
    "OBD tuning file",
    "ECU binary analysis",
    "free ECU tool",
    "offline ECU tool",
    "ECU tuning FAQ",
    "ECU binary comparison",
    "ECU tool roadmap",
    "remap file format",
    "ECU binary recipe",
    "safe ECU tuning",
    "ECU map recognition",
    "tuning workshop tool",
    "ECU file identification",
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
      "Identify, diff, and patch ECU binaries. Free. Offline. No data leaves your machine.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OpenRemap — Open-Source ECU Binary Toolkit",
    description:
      "Identify, diff, and patch ECU binaries. Free. Offline. No data leaves your machine.",
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
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="flex min-h-screen flex-col bg-[#0a0a0f] font-sans text-neutral-200 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "OpenRemap",
              url: "https://openremap.com",
              description:
                "Open-source ECU binary toolkit for identification, diffing, and patching.",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://openremap.com/docs?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
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
