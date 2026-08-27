import type { Metadata } from "next";
import { Toaster } from "sonner";
import SiteHeader from "@/components/SiteHeader";
import "./globals.css";

export const metadata: Metadata = {
  title: "Trim Team — lawn care in Metro Vancouver",
  description: "Book lawn mowing and yard care online.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex-1 max-w-3xl w-full mx-auto px-4 py-8">{children}</main>
        {/* Global toast host — call toast() from anywhere to show a notification. */}
        <Toaster richColors position="top-center" />
      </body>
    </html>
  );
}
