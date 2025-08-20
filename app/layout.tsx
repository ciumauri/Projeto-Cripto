import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "FaucetChain - Next-Gen Faucet Blockchain",
  description: "The first blockchain ecosystem designed for Web3 faucets with AI governance, DeFi integration, and social rewards",
  keywords: "blockchain, faucet, Web3, DeFi, AI, crypto, NFT, DAO",
  authors: [{ name: "FaucetChain Team" }],
  openGraph: {
    title: "FaucetChain - Next-Gen Faucet Blockchain",
    description: "Revolutionary Web3 faucet ecosystem with AI governance",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark">
      <body className={`${inter.className} antialiased`}>
        {children}
        <Toaster 
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1E293B',
              color: '#F1F5F9',
              border: '1px solid #00D4FF',
              borderRadius: '12px',
            },
          }}
        />
      </body>
    </html>
  );
}