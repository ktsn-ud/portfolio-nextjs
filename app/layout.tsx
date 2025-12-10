import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import Sidebar from "@/components/sidebar";

const lineSeedJP = localFont({
  src: [
    {
      path: "../public/fonts/LINESeedJP_A_OTF_Th_subset.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedJP_A_OTF_Rg_subset.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedJP_A_OTF_Bd_subset.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/LINESeedJP_A_OTF_Eb_subset.woff2",
      weight: "800",
      style: "normal",
    },
  ],
});

export const metadata: Metadata = {
  title: "ktsn-ud's Portfolio",
  description: "きつねうどんのポートフォリオサイト",
  robots: {
    index: false,
    follow: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${lineSeedJP.className} antialiased`}>
        <Sidebar />
        <main className="lg:ml-75">
          <div className="lg:max-w-200 min-h-screen mx-auto p-8 flex flex-col justify-between">
            <div>{children}</div>
            <div className="text-center text-text-secondary text-sm pt-5">
              &copy; ktsn-ud 2025 All right reserved.
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
