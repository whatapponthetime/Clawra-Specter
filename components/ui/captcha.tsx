'use client';

import React, { useRef, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CaptchaProps {
    onValidate: (isValid: boolean) => void;
    className?: string;
    onRefresh?: () => void;
}

const generateRandomString = (length: number) => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluded I, O, 0, 1 for clarity
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
};

export const Captcha = ({ onValidate, className, onRefresh }: CaptchaProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [captchaCode, setCaptchaCode] = React.useState('');
    const [inputValue, setInputValue] = React.useState('');

    const drawCaptcha = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Generate new code
        const code = generateRandomString(5);
        setCaptchaCode(code);
        if (onRefresh) onRefresh();

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        ctx.fillStyle = '#0f172a'; // Slate-900
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add noise (lines)
        for (let i = 0; i < 7; i++) {
            ctx.strokeStyle = `rgba(16, 185, 129, ${Math.random()})`; // Emerald
            ctx.beginPath();
            ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineTo(Math.random() * canvas.width, Math.random() * canvas.height);
            ctx.lineWidth = 1 + Math.random() * 2;
            ctx.stroke();
        }

        // Add noise (dots)
        for (let i = 0; i < 30; i++) {
            ctx.fillStyle = `rgba(16, 185, 129, ${Math.random()})`;
            ctx.beginPath();
            ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, 1, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Draw Text
        ctx.font = 'bold 28px monospace';
        ctx.textBaseline = 'middle';
        ctx.textAlign = 'center';

        // Distort text slightly
        const xStride = canvas.width / (code.length + 1);
        for (let i = 0; i < code.length; i++) {
            ctx.save();
            ctx.translate(xStride * (i + 1), canvas.height / 2);
            ctx.rotate((Math.random() - 0.5) * 0.4); // Random rotation
            ctx.fillStyle = '#10b981'; // Emerald-500
            ctx.shadowColor = '#059669';
            ctx.shadowBlur = 4;
            ctx.fillText(code[i], 0, 0);
            ctx.restore();
        }
    };

    useEffect(() => {
        drawCaptcha();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setInputValue(val);
        if (val.length === captchaCode.length) {
            onValidate(val === captchaCode);
        } else {
            onValidate(false);
        }
    };

    return (
        <div className={cn("flex items-center gap-3", className)}>
            <div className="relative group overflow-hidden rounded-md border border-emerald-500/30">
                <canvas
                    ref={canvasRef}
                    width={140}
                    height={48}
                    className="cursor-pointer"
                    title="Click to refresh"
                    onClick={drawCaptcha}
                />
            </div>

            <input
                type="text"
                value={inputValue}
                onChange={handleChange}
                placeholder="CAPTCHA"
                className="w-24 h-12 bg-black/40 border border-white/10 rounded-md text-center font-mono text-emerald-500 tracking-widest uppercase focus:border-emerald-500/50 focus:outline-none placeholder:text-muted-foreground/30 placeholder:normal-case placeholder:tracking-normal"
                maxLength={5}
            />

            <button
                type="button"
                onClick={drawCaptcha}
                className="p-2 rounded-md hover:bg-white/5 text-muted-foreground hover:text-emerald-500 transition-colors"
            >
                <RefreshCw className="w-5 h-5" />
            </button>
        </div>
    );
};
