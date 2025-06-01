import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Students Portfolios",
  description: "Let's showcase students portfolios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
