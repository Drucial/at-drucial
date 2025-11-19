import "./globals.css";

import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { ThemeProvider } from "@/components/providers/theme-provider";

export const metadata: Metadata = {
  title: "d'Alicuari | The Alchemist",
  description:
    "Expertly blurring the lines between artistry and engineering. UI/UX Designer, Full-Stack Developer, and Minimalist Savant.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="overflow-x-hidden antialiased">
        <ThemeProvider
          disableTransitionOnChange
          enableSystem
          attribute="class"
          defaultTheme="system"
        >
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
