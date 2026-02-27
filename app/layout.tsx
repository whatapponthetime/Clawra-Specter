import type { Metadata } from "next"
import { Cinzel, Manrope } from "next/font/google"
import "./globals.css"
import { Toaster } from "sonner"

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
})

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: "Clawra Specter - AI Security Engine",
  description: "Advanced AI-powered security assessment and penetration testing engine. Scan your web applications for vulnerabilities with Clawra Specter Protocol.",
  keywords: ["pentest", "security", "AI", "vulnerability scanner", "cybersecurity", "red team", "clawra specter", "spectral intelligence"],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${cinzel.variable} ${manrope.variable} antialiased font-sans`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  )
}
