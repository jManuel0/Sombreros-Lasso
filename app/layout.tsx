import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sombreros Lasso",
  description: "Sombreros artesanales colombianos con elegancia y tradición."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
