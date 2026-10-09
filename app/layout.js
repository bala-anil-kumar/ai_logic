import Providers from "@/components/Providers";
import Navbar from "@/components/Navbar";
import { Suspense } from "react";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Suspense>
            <Navbar />
          </Suspense>
          {children}
        </Providers>
      </body>
    </html>
  );
}
