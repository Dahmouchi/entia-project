import type { Metadata } from "next";
import "./globals.css";

import { Poppins } from "next/font/google";
import { ThemeProvider } from "next-themes";

import ScrollToTop from "@/components/ScrollToTop";
import NextAuthProvider from "../../providers/NextAuthProvider";
import { AOSInit } from "@/components/aos";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--poppins-font",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal"],
});
export const metadata: Metadata = {
  icons: {
    icon: "/logo.png",
  },
  title: "Scoolia",
  description: "Welcome to Scoolia website",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.className} relative`}>
        <ThemeProvider
          attribute="class"
          enableSystem={true}
          defaultTheme="light"
        >
          <NextAuthProvider>
            <div className="overflow-x-hidden">{children}</div>
          </NextAuthProvider>
          <ScrollToTop />
        </ThemeProvider>
        <AOSInit />
      </body>
    </html>
  );
}
