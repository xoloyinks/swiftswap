import { Inter } from "next/font/google";
import "./globals.css";
import "./style.css"
import Head from 'next/head'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SwiftSwap - Your Trusted Delivery Service",
  description: "Delivering your second-hand treasures with care and efficiency.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <link
          rel="icon"
          href="/logo/favicon.ico"
          type="ico"
          sizes={40}
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}