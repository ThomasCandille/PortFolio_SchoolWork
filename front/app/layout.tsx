"use client";

import { HeroUIProvider } from "@heroui/react";

import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <HeroUIProvider>{children}</HeroUIProvider>
      </body>
    </html>
  );
}
