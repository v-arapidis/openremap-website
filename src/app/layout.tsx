import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "OpenRemap — Open-Source ECU Binary Toolkit",
    template: "%s | OpenRemap",
  },
  description:
    "Identify, diff, and patch ECU binaries with OpenRemap. Free, offline, open-source toolkit supporting Bosch, Siemens, Delphi, and Marelli ECUs. No data leaves your machine.",
  keywords: [
    "ECU",
    "binary",
    "tuning",
    "remap",
    "open-source",
    "Bosch",
    "Siemens",
    "Delphi",
    "Marelli",
    "identify",
    "diff",
    "patch",
    "recipe",
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
    <html lang="en" className="dark">
      <body className="flex min-h-screen flex-col bg-[#0a0a0f] text-neutral-200 antialiased">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
