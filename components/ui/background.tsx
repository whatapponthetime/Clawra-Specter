"use client"

import Image from "next/image"

export function Background() {
    return (
        <div className="fixed inset-0 -z-50 w-full h-full bg-background">
            {/* Background Image - Less Blurred & Higher Opacity */}
            <div className="absolute inset-0 overflow-hidden">
                <Image
                    src="/logo.png"
                    alt="Clawra Specter Background"
                    fill
                    quality={100}
                    sizes="100vw"
                    priority
                    className="object-cover opacity-20 blur-[2px] scale-105"
                />
            </div>

            {/* Glass/Frost Overlay */}
            <div className="absolute inset-0 backdrop-blur-[1px] bg-black/60" />

            {/* Gradient Overlay for Text Readability - Much Lighter */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90" />

            {/* Texture Overlay - Subtle */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30"></div>

            {/* Ambient Glow */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none -z-5">
                <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[100px] animate-pulse-slow" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-secondary/10 rounded-full blur-[100px] animate-pulse-slow delay-1000" />
            </div>
        </div>
    )
}
