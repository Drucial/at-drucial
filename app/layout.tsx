import "./globals.css";
import "@/styles/highlight.css";

import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { ContentModalProvider } from "@/components/providers/content-modal-provider";
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
              <ContentModalProvider>
                <Header />
                {children}
                {modal}
              </ContentModalProvider>
            </SmoothScrollProvider>
          </ThemeProvider>
        </ViewportProvider>
      </body>
    </html>
  );
}
