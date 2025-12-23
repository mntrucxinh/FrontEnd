// app/layout.tsx
import type { Metadata } from "next";
import Footer from "@/app/(app)/_components/Footer";
import Header from "@/app/(app)/_components/Header";
import { AuthProvider } from "@/components/context/auth-context";

export const metadata: Metadata = {
  title: "Landing Page",
  description: "Demo Landing Page layout with Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </AuthProvider>
  );
}
