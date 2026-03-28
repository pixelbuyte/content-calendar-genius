import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Content Calendar Genius — Social Media Content for Realtors",
  description:
    "Turn one idea into a full week of real estate social media content in seconds. Captions, hooks, titles, hashtags, and a 7-day posting plan — instantly.",
  keywords: ["realtor social media", "real estate content", "content calendar", "real estate marketing"],
  openGraph: {
    title: "Content Calendar Genius",
    description: "Turn one idea into a full week of real estate content in seconds.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
