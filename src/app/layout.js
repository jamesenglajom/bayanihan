import { Poppins, Fraunces } from "next/font/google";
import { ThemeProvider } from "@/app/components/ThemeProvider";
import "./globals.css";

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  // Poppins is not a variable font, so you must specify weights
  weight: ['400', '500', '600', '700'], 
  variable: '--font-poppins',
});

export const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  // Fraunces is variable, so you can define a range for weight
  weight: 'variable', 
  // Custom axes: SOFT (0-100), WONK (0-1), and opsz (9-144)
  axes: ['SOFT', 'WONK', 'opsz'], 
  variable: '--font-fraunces',
});

export const metadata = {
  title: "Bayanihan Exchange In Sweden",
  description: "Bayanihan Exchange In Sweden",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vkg0ejp.css" />
      </head>
      <body
        className={`${poppins.variable} ${fraunces.variable} antialiased bg-slate-50 dark:bg-[#0B1120] transition-colors duration-200`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
