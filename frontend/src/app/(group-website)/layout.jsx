import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import Header from "@/components/website/Header";
import Footer from "@/components/website/Footer";
import { ToastContainer } from 'react-toastify';
import ReduxPovider from "@/redux/redux-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Website",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
          <Header />
          {children}
          <Footer />
          <ToastContainer />
      </body>
    </html>
  );
}
