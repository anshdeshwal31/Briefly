import type { Metadata } from "next";
import { Source_Sans_3 as FontSans} from "next/font/google";
import "./globals.css";
import Header from "@/components/common/header";
import { Footer } from "@/components/common/footer";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "sonner";
import Script from "next/script";
import { ORIGIN_URL } from "@/utils/constants";


const fontSans = FontSans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"]
});


export const metadata: Metadata = {
  title: "Briefly - AI-Powered PDF Summarization",
  description: "Save hours of reading time. Transform lengthy PDFs into clear , accurate summaries in seconds with our advanced AI technologies.",
  metadataBase:new URL(ORIGIN_URL),
  alternates:{
    canonical:ORIGIN_URL
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/B.png" />
        <Script 
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </head>
        <body 
          className={`font-sans ${fontSans.variable} antialiased`}
          suppressHydrationWarning={true}
        >
          <div className="relative min-h-screen flex flex-col">
            <Header/>
            <main className="flex-1">
              {children}
            </main>
            <Footer/>
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              className:"bg-red-500 rounded-full py-4"      
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
