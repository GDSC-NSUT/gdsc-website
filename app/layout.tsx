import type { Metadata } from "next";
import { Fragment_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import UnifiedNavbar from "@/components/UnifiedNavbar";
import Footer from "@/components/footer";
import { cn } from "@/libs/utils";

const neueMontreal = localFont({
  variable: "--font-neue-montreal",
  display: "swap",
  src: [
    {
      path: "../public/fonts/NeueMontreal-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/NeueMontreal-Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
});

const productSans = localFont({
  variable: "--font-product-sans",
  display: "swap",
  src: [
    {
      path: "../public/fonts/ProductSans-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/ProductSans-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/ProductSans-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
});

const fragmentMono = Fragment_Mono({
  variable: "--font-fragment-mono",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Google Developer Groups | Netaji Subhas University",
  description:
    "Google Developer Groups, Netaji Subhas University of Technology - Empowering Students Through Technology and Collaboration. Join our community to learn, build, and innovate.",
  openGraph: {
    title: "Google Developer Groups | Netaji Subhas University",
    description:
      "Google Developer Groups, Netaji Subhas University of Technology - Empowering Students Through Technology and Collaboration. Join our community to learn, build, and innovate.",
    images: [
      {
        url: "/og.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          fragmentMono.variable,
          neueMontreal.variable,
          productSans.variable,
          "antialiased"
        )}
      >
        <UnifiedNavbar />
        {/* <NavbarManager /> */}
        {children}
        <Footer />
      </body>
    </html>
  );
}
