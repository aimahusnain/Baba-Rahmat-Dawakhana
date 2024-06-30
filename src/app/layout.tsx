import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/src/components/Navbar/Navbar";
import Footer from "@/src/components/Footer";
import SessionProvider from "../components/SessionProvider";
import Sale from "@/src/components/sale";
import UpiUp from "../components/UpiUp";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Beauty Bugz",
  description: "Love Beauty for Ever!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `
          window.$crisp=[];
          window.CRISP_WEBSITE_ID="5dfdc38c-7de0-4359-9dc7-9e9119e5b921";
        (function(){
          var d = document;
         var  s=d.createElement("script");
          s.src="https://client.crisp.chat/l.js";
          s.async=1;
          d.getElementsByTagName("head")[0].appendChild(s);})();
            `,
          }}
        ></script>
      </head>
      <body
        // 
        className={`${inter.className} bg-desired-white`}
      >
        <Sale />
        <Header />

        <SessionProvider>{children}</SessionProvider>
        <UpiUp />
        <Footer />
      </body>
    </html>
  );
}
