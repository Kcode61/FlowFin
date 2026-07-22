import type { Metadata } from "next";

import "./globals.css";
import { Sidebar } from "./components/sidebar";

export const metadata: Metadata = {
  title: "FlowFin - Organize sua vida financeira",
  description: "FlowFin e um site focado em controle financeiro para usuários",
};
export const poppins = {
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
};
export const inter = {
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-br"
      className={`h-full antialiased ${poppins.variable} font-inter`}
    >
      <body className="h-screen flex" cz-shortcut-listen="true">
        <Sidebar />
        <main className="flex-1 "> {children}</main>
      </body>
    </html>
  );
}
