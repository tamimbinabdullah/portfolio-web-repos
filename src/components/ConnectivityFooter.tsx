"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface PortLabelProps {
    name: string;
    description: string;
    position: { x: string; y: string };
    delay: number;
    isInView: boolean;
}

function PortLabel({ name, description, position, delay, isInView }: PortLabelProps) {
    return (
        <motion.div
            className="absolute flex items-start gap-3"
            style={{ left: position.x, top: position.y }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay }}
        >
            {/* Connection line */}
            <motion.div
                className="w-12 h-px bg-gradient-to-r from-indigo-400 to-transparent mt-3"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.4, delay: delay + 0.2 }}
                style={{ transformOrigin: "left" }}
            />

            {/* Label content */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-2">
                <div className="text-sm font-semibold text-white/90">{name}</div>
                <div className="text-xs text-apple-gray">{description}</div>
            </div>
        </motion.div>
    );
}

function LaptopSideView() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const ports = [
        { name: "Thunderbolt 4", description: "40Gb/s data transfer", position: { x: "5%", y: "30%" } },
        { name: "HDMI 2.1", description: "8K @ 60Hz output", position: { x: "20%", y: "50%" } },
        { name: "SDXC", description: "UHS-II support", position: { x: "35%", y: "70%" } },
        { name: "MagSafe 3", description: "Fast charging", position: { x: "70%", y: "40%" } },
    ];

    return (
        <div ref={ref} className="relative w-full max-w-4xl mx-auto aspect-[16/7]">
            {/* Laptop side view illustration */}
            <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ x: -100, opacity: 0 }}
                animate={isInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
            >
                <svg
                    viewBox="0 0 400 100"
                    className="w-full max-w-2xl"
                    fill="none"
                >
                    {/* Base */}
                    <motion.rect
                        x="50"
                        y="60"
                        width="300"
                        height="15"
                        rx="2"
                        fill="url(#laptopGradient)"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    />

                    {/* Screen */}
                    <motion.path
                        d="M 80 60 L 100 15 L 320 15 L 340 60"
                        fill="url(#screenGradient)"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    />

                    {/* Screen bezel */}
                    <motion.path
                        d="M 80 60 L 100 15 L 320 15 L 340 60"
                        stroke="rgba(255,255,255,0.2)"
                        strokeWidth="1"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                    />

                    {/* Port indicators */}
                    {[
                        { x: 55, label: "TB4" },
                        { x: 75, label: "HDMI" },
                        { x: 95, label: "SD" },
                        { x: 330, label: "Mag" },
                    ].map((port, i) => (
                        <motion.g key={port.label}>
                            <motion.rect
                                x={port.x}
                                y="63"
                                width="12"
                                height="8"
                                rx="1"
                                fill="rgba(99, 102, 241, 0.5)"
                                initial={{ opacity: 0, scale: 0 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                                transition={{ duration: 0.3, delay: 0.5 + i * 0.1 }}
                            />
                            {/* Glow */}
                            <motion.rect
                                x={port.x}
                                y="63"
                                width="12"
                                height="8"
                                rx="1"
                                fill="rgba(99, 102, 241, 0.3)"
                                filter="blur(3px)"
                                initial={{ opacity: 0 }}
                                animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
                                transition={{ duration: 2, delay: 1 + i * 0.1, repeat: Infinity }}
                            />
                        </motion.g>
                    ))}

                    <defs>
                        <linearGradient id="laptopGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#3f3f46" />
                            <stop offset="100%" stopColor="#27272a" />
                        </linearGradient>
                        <linearGradient id="screenGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#1f1f23" />
                            <stop offset="100%" stopColor="#0a0a0b" />
                        </linearGradient>
                    </defs>
                </svg>
            </motion.div>

            {/* Port labels */}
            {ports.map((port, index) => (
                <PortLabel
                    key={port.name}
                    {...port}
                    delay={0.8 + index * 0.15}
                    isInView={isInView}
                />
            ))}
        </div>
    );
}

export default function ConnectivityFooter() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-obsidian overflow-hidden"
        >
            <motion.div className="relative z-10" style={{ opacity }}>
                {/* Section header */}
                <div className="text-center mb-20 md:mb-32">
                    <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold hero-text mb-6">
                        <span className="text-white/90">Connected.</span>
                        <br />
                        <span className="text-apple-gray">To everything.</span>
                    </h2>
                    <p className="text-lg md:text-xl text-apple-gray max-w-2xl mx-auto">
                        Industry-leading ports. Blazing-fast data transfer.
                        Plug in and power through.
                    </p>
                </div>

                {/* Laptop side view with port labels */}
                <LaptopSideView />

                {/* CTA Section */}
                <motion.div
                    className="mt-32 md:mt-48 text-center"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8 }}
                >
                    <h3 className="text-4xl md:text-6xl font-display font-bold mb-6 text-gradient">
                        Experience AETHER Pro
                    </h3>
                    <p className="text-lg text-apple-gray mb-10 max-w-xl mx-auto">
                        The future of professional computing is here.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            className="px-8 py-4 bg-white text-black font-semibold rounded-full text-lg hover:bg-white/90 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Buy Now
                        </motion.button>
                        <motion.button
                            className="px-8 py-4 bg-white/10 text-white font-semibold rounded-full text-lg border border-white/20 hover:bg-white/20 transition-colors"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Learn More
                        </motion.button>
                    </div>
                </motion.div>
            </motion.div>

            {/* Footer */}
            <footer className="relative z-10 mt-32 pt-16 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                        <div>
                            <h4 className="text-sm font-semibold text-white/90 mb-4">Product</h4>
                            <ul className="space-y-2 text-sm text-apple-gray">
                                <li><a href="#" className="hover:text-white transition-colors">Overview</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Specifications</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Compare</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white/90 mb-4">Support</h4>
                            <ul className="space-y-2 text-sm text-apple-gray">
                                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Service</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white/90 mb-4">Company</h4>
                            <ul className="space-y-2 text-sm text-apple-gray">
                                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="text-sm font-semibold text-white/90 mb-4">Legal</h4>
                            <ul className="space-y-2 text-sm text-apple-gray">
                                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-sm text-apple-gray">
                        <div className="mb-4 md:mb-0">
                            <span className="font-display font-bold text-xl text-gradient">AETHER</span>
                        </div>
                        <div>
                            © 2026 AETHER Technologies. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>

            {/* Decorative gradient */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-radial from-indigo-500/5 via-transparent to-transparent pointer-events-none" />
        </section>
    );
}
