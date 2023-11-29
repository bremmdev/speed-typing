import type { Metadata } from "next";
import { Poppins, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-poppins",
  display: "swap",
});
const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-source-code-pro",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Speed Typing Game",
  description: "A speed typing game built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${sourceCodePro.variable} font-sans bg-purple-100`}
      >
        <main className="flex flex-col gap-6 sm:gap-8 mx-auto w-11/12 max-w-6xl py-12 text-center">
          {children}
        </main>
      </body>
    </html>
  );
}
