import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Aivann Martinez — I find problems, build solutions, and ship them",
  description:
    "Portfolio of Aivann Martinez: computer scientist and builder. I identify everyday problems, build and optimize solutions, and put them in front of the people who use them.",
  metadataBase: new URL("https://aivann-dev.vercel.app"),
  openGraph: {
    title: "Aivann Martinez",
    description:
      "I find everyday problems, build and optimize solutions, and present them to users and stakeholders.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
