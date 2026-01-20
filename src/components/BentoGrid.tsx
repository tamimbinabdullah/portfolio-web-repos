"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FeatureCardProps {
    title: string;
    subtitle: string;
    description: string;
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

function FeatureCard({
    title,
    subtitle,
    description,
    children,
    className = "",
    delay = 0,
}: FeatureCardProps) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <motion.div
            ref={ref}
            className={`glass-card rounded-3xl overflow-hidden glow-effect ${className}`}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
            transition={{ duration: 0.8, delay, ease: "easeOut" }}
        >
            <div className="p-8 md:p-10 h-full flex flex-col">
                <div className="mb-6">
                    <span className="text-sm font-medium text-indigo-400 uppercase tracking-wider">
                        {subtitle}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-display font-bold mt-2 text-gradient">
                        {title}
                    </h3>
                </div>
                <p className="text-apple-gray text-base md:text-lg leading-relaxed mb-8">
                    {description}
                </p>
                <div className="flex-1 flex items-center justify-center">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}

// Neural Chip Animation
function NeuralChipVisual() {
    return (
        <div className="relative w-full max-w-xs aspect-square">
            {/* Chip base */}
            <div className="absolute inset-4 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/10">
                {/* Shimmer overlay */}
                <div className="absolute inset-0 rounded-2xl shimmer-gradient opacity-50" />

                {/* Circuit patterns */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
                    {/* Grid lines */}
                    {[20, 40, 60, 80].map((pos) => (
                        <g key={pos}>
                            <line
                                x1={pos}
                                y1="10"
                                x2={pos}
                                y2="90"
                                stroke="rgba(99, 102, 241, 0.2)"
                                strokeWidth="0.5"
                            />
                            <line
                                x1="10"
                                y1={pos}
                                x2="90"
                                y2={pos}
                                stroke="rgba(99, 102, 241, 0.2)"
                                strokeWidth="0.5"
                            />
                        </g>
                    ))}

                    {/* Core */}
                    <motion.rect
                        x="35"
                        y="35"
                        width="30"
                        height="30"
                        rx="4"
                        fill="url(#chipGradient)"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />

                    {/* Connection points */}
                    {[
                        { x: 20, y: 50 },
                        { x: 80, y: 50 },
                        { x: 50, y: 20 },
                        { x: 50, y: 80 },
                    ].map((point, i) => (
                        <motion.circle
                            key={i}
                            cx={point.x}
                            cy={point.y}
                            r="3"
                            fill="#6366f1"
                            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                        />
                    ))}

                    <defs>
                        <linearGradient id="chipGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#6366f1" />
                            <stop offset="50%" stopColor="#a855f7" />
                            <stop offset="100%" stopColor="#ec4899" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Glow effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-2xl" />
        </div>
    );
}

// Display Brightness Visual
function DisplayVisual() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative w-full max-w-md aspect-video overflow-hidden rounded-xl">
            {/* Dark layer (before) */}
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black flex items-center justify-center">
                <span className="text-xl font-bold text-white/30">Standard</span>
            </div>

            {/* Bright layer (after) with mask reveal */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white via-gray-100 to-gray-300 flex items-center justify-center"
                initial={{ clipPath: "inset(0 100% 0 0)" }}
                animate={isInView ? { clipPath: "inset(0 0% 0 0)" } : { clipPath: "inset(0 100% 0 0)" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            >
                <span className="text-xl font-bold text-black">XDR</span>
            </motion.div>

            {/* Divider line */}
            <motion.div
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-indigo-400 to-purple-400 shadow-lg shadow-indigo-500/50"
                initial={{ left: "0%" }}
                animate={isInView ? { left: "100%" } : { left: "0%" }}
                transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
        </div>
    );
}

// Thermal Airflow Visual
function ThermalVisual() {
    return (
        <div className="relative w-full max-w-sm aspect-[4/3]">
            <svg className="w-full h-full" viewBox="0 0 200 150">
                {/* Laptop body outline */}
                <rect
                    x="30"
                    y="50"
                    width="140"
                    height="80"
                    rx="8"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                />

                {/* Heat source (CPU) */}
                <motion.rect
                    x="85"
                    y="75"
                    width="30"
                    height="30"
                    rx="4"
                    fill="url(#heatGradient)"
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />

                {/* Airflow lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.path
                        key={i}
                        d={`M ${40 + i * 8} 90 Q ${60 + i * 8} ${85 - i * 3} ${85 + i * 2} ${90 - i * 5}`}
                        fill="none"
                        stroke={`rgba(99, 200, 255, ${0.3 + i * 0.1})`}
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="airflow-line"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}

                {/* Exhaust lines */}
                {[0, 1, 2, 3, 4].map((i) => (
                    <motion.path
                        key={`exhaust-${i}`}
                        d={`M ${115 + i * 2} ${90 - i * 5} Q ${140 + i * 8} ${85 - i * 3} ${165 + i * 2} 90`}
                        fill="none"
                        stroke={`rgba(255, 150, 100, ${0.3 + i * 0.1})`}
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="airflow-line"
                        style={{ animationDelay: `${i * 0.1}s` }}
                    />
                ))}

                {/* Temperature labels */}
                <text x="45" y="115" fill="#63b3ed" fontSize="10" fontFamily="sans-serif">
                    Cool
                </text>
                <text x="145" y="115" fill="#f6ad55" fontSize="10" fontFamily="sans-serif">
                    Exhaust
                </text>

                <defs>
                    <radialGradient id="heatGradient">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="50%" stopColor="#f97316" />
                        <stop offset="100%" stopColor="#eab308" />
                    </radialGradient>
                </defs>
            </svg>
        </div>
    );
}

// Battery Visual
function BatteryVisual() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <div ref={ref} className="relative flex flex-col items-center gap-6">
            {/* Battery icon */}
            <div className="relative w-32 h-16">
                <div className="absolute inset-0 rounded-lg border-2 border-white/30 overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400"
                        initial={{ width: "0%" }}
                        animate={isInView ? { width: "100%" } : { width: "0%" }}
                        transition={{ duration: 2, ease: "easeOut" }}
                    />
                </div>
                <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-2 h-6 bg-white/30 rounded-r" />
            </div>

            {/* Stats */}
            <div className="text-center">
                <motion.span
                    className="text-4xl font-display font-bold text-gradient"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.5 }}
                >
                    22 hours
                </motion.span>
                <p className="text-sm text-apple-gray mt-1">All-day battery life</p>
            </div>
        </div>
    );
}

export default function BentoGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-obsidian"
        >
            {/* Section header */}
            <motion.div
                className="text-center mb-20 md:mb-32"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold hero-text mb-6">
                    <span className="text-gradient">Pro</span> features.
                    <br />
                    <span className="text-apple-gray">Pro performance.</span>
                </h2>
                <p className="text-lg md:text-xl text-apple-gray max-w-2xl mx-auto">
                    Every component is designed to push the boundaries of what's possible.
                </p>
            </motion.div>

            {/* Bento grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {/* Neural Chip - Large card */}
                <FeatureCard
                    title="Neural Engine"
                    subtitle="The Brain"
                    description="16-core Neural Engine with 15.8 trillion operations per second. AI that thinks at the speed of light."
                    className="md:col-span-2 lg:col-span-2 lg:row-span-1"
                    delay={0}
                >
                    <NeuralChipVisual />
                </FeatureCard>

                {/* Display */}
                <FeatureCard
                    title="Liquid Retina XDR"
                    subtitle="The Vision"
                    description="Extreme Dynamic Range. 1,000,000:1 contrast. Over a billion colors."
                    delay={0.1}
                >
                    <DisplayVisual />
                </FeatureCard>

                {/* Thermal */}
                <FeatureCard
                    title="Advanced Thermal"
                    subtitle="Cool & Quiet"
                    description="Whisper-quiet operation even under intense workloads."
                    delay={0.2}
                >
                    <ThermalVisual />
                </FeatureCard>

                {/* Battery - Spans 2 columns */}
                <FeatureCard
                    title="All-Day Power"
                    subtitle="Unstoppable"
                    description="The most powerful battery ever in a pro laptop. Work without limits."
                    className="md:col-span-2 lg:col-span-2"
                    delay={0.3}
                >
                    <BatteryVisual />
                </FeatureCard>
            </div>
        </section>
    );
}
