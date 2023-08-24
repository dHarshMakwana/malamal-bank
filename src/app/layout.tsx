// "use client";
// import { AuthContext, AuthContextProvider } from "@/lib/AuthContext";
import "./globals.scss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Malamal Bank",
  description: "Malamal Bank",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <>{children}</>
      </body>
    </html>
  );
}
