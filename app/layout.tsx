import "./globals.css";

import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { BlogModalProvider } from "@/components/providers/blog-modal-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ViewportProvider } from "@/components/providers/viewport-provider";

export const metadata: Metadata = {
  title: "d'Alicuari | The Alchemist",
  description:
    "Expertly blurring the lines between artistry and engineering. UI/UX Designer, Full-Stack Developer, and Minimalist Savant.",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className="antialiased">
        <ViewportProvider>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
          >
            <SmoothScrollProvider>
              <BlogModalProvider>
                <Header />
                {children}
                {modal}
              </BlogModalProvider>
            </SmoothScrollProvider>
          </ThemeProvider>
        </ViewportProvider>
      </body>
    </html>
  );
}
