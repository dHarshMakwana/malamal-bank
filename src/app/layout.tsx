import AuthContextProvider from "@/lib/AuthContext.context";
import "./globals.scss";
import type { Metadata } from "next";
import React, { Suspense } from "react";
import CustomToaster from "@/components/Toast/Toast";
import { Analytics } from "@vercel/analytics/react";

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
        <Suspense fallback={<div>Loading...</div>}>
          <CustomToaster />
          <AuthContextProvider>{children}</AuthContextProvider>
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}
