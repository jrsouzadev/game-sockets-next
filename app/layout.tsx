import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SocketsProvider } from "./socket-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "client",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SocketsProvider>
        <html lang="en">
          <body className={`${inter.className}`}>{children}</body>
        </html>
      </SocketsProvider>
    </>
  );
}
