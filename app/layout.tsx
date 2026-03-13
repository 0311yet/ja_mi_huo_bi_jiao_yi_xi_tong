import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OKX Quant System",
  description: "Web prototype for OKX quant trading terminal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
