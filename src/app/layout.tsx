import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from '@vercel/speed-insights/next';
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "سامانه مدیریت مدرسه",
  icons: {
    icon: '/logo.png'
  }
};

const faLocalization = {
  formFieldError: {
    identifier: {
      invalid_email_address: "ایمیل وارد شده معتبر نیست",
      invalid_username: "نام کاربری معتبر نیست",
      not_found: "این کاربر وجود ندارد",
    },
    password: {
      incorrect_password: "رمز عبور اشتباه است",
      too_short: "رمز عبور خیلی کوتاه است",
    },
  },
  globalError: {
    default: "خطای ناشناخته‌ای رخ داده است، دوباره تلاش کنید.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

      <html lang="en">
        <Head>
          <link rel="shortcut icon" href="/logo.png" />
        </Head>
        <body>{children}<ToastContainer position="bottom-right" theme="dark" /></body>
        <Analytics />
        <SpeedInsights />

      </html>
    </ClerkProvider>
  );
}
