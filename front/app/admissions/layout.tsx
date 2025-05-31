import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Espace Admission",
  description: "Page d'admission de l'école",
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
