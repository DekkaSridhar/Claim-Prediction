import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import WaterMark from "./components/WaterMark";

export const metadata: Metadata = {
  title: "No Show Prediction",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <WaterMark />
      </body>
    </html>
  );
}
