import "./globals.css";

import type { Metadata } from "next";

import { Header } from "@/components/layout/header";
import { BlogModalProvider } from "@/components/providers/blog-modal-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { ViewportProvider } from "@/components/providers/viewport-provider";

export const metadata: Metadata = {
  title: "d'Alicuari | The Alchemist",
  description:
    "Expertly blurring the lines between artistry and engineering. UI/UX Designer, Full-Stack Developer, and Minimalist Savant.",
};

const MAX_WIDTH = 1920;

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body
        className="mx-auto overflow-x-hidden border antialiased"
        style={{ maxWidth: MAX_WIDTH }}
      >
        <ViewportProvider>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="system"
          >
            <BlogModalProvider>
              <Header />
              {children}
              {modal}
            </BlogModalProvider>
          </ThemeProvider>
        </ViewportProvider>
      </body>
    </html>
  );
}
