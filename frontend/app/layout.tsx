import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OnCallHQ",
  description: "AI call intake and dispatch assistant MVP",
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
