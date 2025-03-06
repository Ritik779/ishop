import { Geist, Geist_Mono } from "next/font/google";
import "@/app/globals.css";
import { ToastContainer } from 'react-toastify';
import ReduxPovider from "@/redux/redux-provider";
import store from "@/redux/store";


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
        <ToastContainer />
        <ReduxPovider>
          {children}
        </ReduxPovider>
      </body>
    </html>
  );
}
