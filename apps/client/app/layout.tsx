import Navbar from "@/components/layout/navbar";
import "./globals.css";
import { Inter as FontSans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "context/authContext";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <AuthProvider>
          <Toaster position="bottom-right" />
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main>{children}</main>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
