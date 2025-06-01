import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projets",
  description: "Page des projets de l'école",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
