"use client"

import Link from "next/link"
import Image from "next/image"
import { motion, Variants } from "framer-motion"
import { ArrowRight, Shield, Lock, FileWarning, Terminal, Github, ScanSearch, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

import { Background } from "@/components/ui/background"
import { SiteHeader } from "@/components/site-header"

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
}

export default function LandingPage() {
  return (
    <div className="min-h-screen relative overflow-hidden font-sans text-foreground selection:bg-white/20 selection:text-white bg-background">
      <Background />


      <SiteHeader />

      {/* Main Content */}
      <main className="container mx-auto px-6 pt-32 pb-20 relative z-10">

        {/* Hero Section */}
        <motion.section
          variants={container}
          initial="hidden"
          animate="show"
          className="py-20 text-center space-y-8 max-w-5xl mx-auto flex flex-col items-center"
        >
          <motion.div variants={item} className="flex justify-center mb-6 relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur opacity-50 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-2 border-primary/20 shadow-2xl shadow-primary/10">
              <Image
                src="/logo.png"
                alt="Clawra Specter Emblem"
                fill
                className="object-cover scale-110"
                priority
              />
            </div>
          </motion.div>

          <motion.div variants={item} className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel text-primary/80 text-sm font-medium border border-primary/20 backdrop-blur-md shadow-lg shadow-primary/5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Spectral Protection Protocol Active
            </div>
          </motion.div>


          <motion.h1 variants={item} className="flex flex-col items-center gap-2 mt-8">
            <span className="text-4xl md:text-5xl font-light tracking-[0.2em] text-primary/70 uppercase font-sans">
              Next-Gen AI
            </span>
            <span className="text-6xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-primary to-secondary font-heading drop-shadow-[0_0_30px_hsl(var(--primary)/0.2)]">
              Spectral Intelligence
            </span>
          </motion.h1>

          <motion.p variants={item} className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed font-sans font-light">
            Clawra Specter is an AI-driven web security engine designed to automatically scan and detect vulnerabilities with spectral precision.
          </motion.p>

          <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/pentest">
              <Button size="lg" className="w-full sm:w-auto text-lg px-10 h-14 rounded-xl bg-primary hover:bg-primary/80 text-primary-foreground border border-transparent shadow-[0_0_20px_hsl(var(--primary)/0.4)]">
                Start Spectral Scan
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="https://github.com/whatapponthetime/Clawra-Specter.git" target="_blank">
              <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 h-14 rounded-xl border-primary/20 text-white hover:bg-primary/10 hover:text-white backdrop-blur-md">
                View Documentation
              </Button>
            </Link>
          </motion.div>
        </motion.section>

        {/* Features Grid */}
        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="py-20 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <Card className="group hover:-translate-y-2 duration-300 glass-liquid border-transparent hover:border-white/30">
            <CardHeader>

              <CardTitle className="text-white">Smart Reconnaissance</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-white/50 group-hover:text-white/80 transition-colors">
                Automatically identifies technology stacks, frameworks, and potential entry points using meta-analysis and header inspection.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:-translate-y-2 duration-300 glass-liquid border-transparent hover:border-white/30">
            <CardHeader>

              <CardTitle className="text-white">Vulnerability Audit</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-white/50 group-hover:text-white/80 transition-colors">
                Scans for OWASP Top 10 vulnerabilities including XSS, Injection, and missing security headers with AI-driven logic.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="group hover:-translate-y-2 duration-300 glass-liquid border-transparent hover:border-white/30">
            <CardHeader>

              <CardTitle className="text-white">Actionable Reporting</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed text-white/50 group-hover:text-white/80 transition-colors">
                Receive detailed security reports with severity scoring and remediation steps, generated instantly in Markdown.
              </CardDescription>
            </CardContent>
          </Card>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 glass-panel mt-20">
        <div className="container mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="relative w-6 h-6 rounded-full overflow-hidden border border-primary/20 shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Clawra Specter Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-white/60 font-medium">Clawra Specter AI Security &copy; 2026</span>
            </div>

            <p className="text-white/40 text-sm">
              Authorized Use Only. Educational & Defensive Purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
