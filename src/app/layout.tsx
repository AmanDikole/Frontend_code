import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/context/AuthContext"; // 👈 1. Import this

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Portal",
  description: "Find your dream job today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        
        {/* 👈 2. Wrap EVERYTHING inside AuthProvider */}
        <AuthProvider>
          <Toaster position="top-right" />
          {children}
        </AuthProvider>

      </body>
    </html>
  );
}