import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ContextSwitch — Professional Persona Platform",
  description: "LinkedIn-style professional context switching. See only the content that matters for your current focus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
