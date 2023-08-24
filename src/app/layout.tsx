import { AuthContextProvider } from "@/lib/AuthContext.context";
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
        <AuthContextProvider>{children}</AuthContextProvider>
      </body>
    </html>
  );
}
