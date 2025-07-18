import "@/styles/globals.css";
import { type Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { TRPCReactProvider } from "@/trpc/react";
import Header from "@/components/Header";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Mohammed Haydar | A Full Stack Engineer",
  description:
    "I'm a full stack engineer based in Coventry, UK. I build web applications with React, Next.js, and Node.js.",
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" }],
    apple: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-256x256.png", sizes: "256x256", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

const raleway = localFont({
  src: "./fonts/Raleway.woff2",
  variable: "--font-raleway",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${raleway.variable}`} suppressHydrationWarning>
      <head>
        <script
          defer
          src="https://analytics.technodevlabs.com/script.js"
          data-website-id="b042b2c9-027e-4928-9199-50663eca6abc"
        ></script>
      </head>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          disableTransitionOnChange
          enableSystem
        >
          <SessionProvider>
            <Header />
          </SessionProvider>
          <TRPCReactProvider>
            <Suspense>{children}</Suspense>
          </TRPCReactProvider>
          <Toaster />
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
