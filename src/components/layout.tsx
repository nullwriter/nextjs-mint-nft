import { Inter } from "next/font/google";
import Head from "next/head";
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <title>Mint NFTs</title>
        <meta name="description" content={"An SPA for Minting NFTs"} />
      </Head>
      <body className={inter.className + " w-full flex flex-col sm:flex-row flex-grow overflow-hidden"}>
        {children}
      </body>
    </html>
  );
}
