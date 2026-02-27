"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="fixed top-0 w-full z-50 border-b border-white/5 glass-panel backdrop-blur-md bg-black/40"
        >
            <div className="container mx-auto px-6 py-4 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all shadow-[0_0_15px_hsl(var(--primary)/0.1)] group-hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]">
                        <Image
                            src="/logo.png"
                            alt="Clawra Specter Logo"
                            fill
                            className="object-cover"
                        />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight flex items-center gap-1">
                        CLAWRA<span className="text-primary font-light">SPECTER</span>
                    </span>
                </Link>
                <nav className="flex items-center gap-6">
                    <Link
                        href="/pentest"
                        className="text-sm font-medium text-white/70 hover:text-white transition-colors hidden sm:block"
                    >
                        Scanner
                    </Link>

                    <Link
                        href="https://github.com/whatapponthetime/CLAWD-HUNTER.git"
                        target="_blank"
                        className="relative group outline-none"
                    >
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                            <Github className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                    </Link>

                    <Link
                        href="https://x.com/ClawdHnter"
                        target="_blank"
                        className="relative group outline-none"
                    >
                        <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/30 transition-all duration-300">
                            <Twitter className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
                        </div>
                    </Link>

                    <Link href="/pentest">
                        <Button size="sm" className="hidden md:flex bg-primary hover:bg-primary/80 text-primary-foreground border-none shadow-[0_0_15px_hsl(var(--primary)/0.3)] font-semibold">
                            Launch Specter
                        </Button>
                    </Link>
                </nav>
            </div>
        </motion.header>
    )
}
