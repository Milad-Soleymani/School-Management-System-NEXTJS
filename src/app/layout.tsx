import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import Head from "next/head";


export const metadata: Metadata = {
  title: "سامانه مدیریت مدرسه",
  icons: {
    icon: '/logo.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" href="/logo.png" />
      </Head>
      <body>{children}</body>
      <Analytics />
      <SpeedInsights />

    </html>
  );
}
