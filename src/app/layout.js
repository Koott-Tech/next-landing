import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./App.css";
import "./index.css";
import LoadingProvider from "../components/LoadingProvider";
import ConditionalNavbar from "../components/ConditionalNavbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "CureMinds",
  description: "Mental health therapy platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <LoadingProvider>
          <ConditionalNavbar />
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
