"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

interface PerformanceBarProps {
    label: string;
    value: number;
    maxValue: number;
    color: string;
    delay?: number;
    isInView: boolean;
}

function PerformanceBar({
    label,
    value,
    maxValue,
    color,
    delay = 0,
    isInView,
}: PerformanceBarProps) {
    const percentage = (value / maxValue) * 100;

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between items-baseline">
                <span className="text-lg font-medium text-white/90">{label}</span>
                <span className="text-sm text-apple-gray">{value}x faster</span>
            </div>
            <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                <motion.div
                    className="h-full rounded-full"
                    style={{ background: color }}
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${percentage}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
                />
            </div>
        </div>
    );
}

interface ComparisonData {
    category: string;
    aetherPro: number;
    previousGen: number;
    competitor: number;
}

const performanceData: ComparisonData[] = [
    { category: "CPU Performance", aetherPro: 2.8, previousGen: 1.5, competitor: 1.0 },
    { category: "GPU Rendering", aetherPro: 3.2, previousGen: 1.8, competitor: 1.0 },
    { category: "Machine Learning", aetherPro: 4.5, previousGen: 2.1, competitor: 1.0 },
    { category: "Video Export", aetherPro: 2.4, previousGen: 1.4, competitor: 1.0 },
];

function PerformanceChart() {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <div ref={ref} className="w-full max-w-4xl mx-auto">
            {/* Legend */}
            <div className="flex flex-wrap gap-6 mb-10 justify-center">
                {[
                    { label: "AETHER Pro", color: "bg-gradient-to-r from-indigo-500 to-purple-500" },
                    { label: "Previous Gen", color: "bg-white/30" },
                    { label: "Competitor", color: "bg-white/10" },
                ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded ${item.color}`} />
                        <span className="text-sm text-apple-gray">{item.label}</span>
                    </div>
                ))}
            </div>

            {/* Chart bars */}
            <div className="space-y-10">
                {performanceData.map((data, index) => (
                    <div key={data.category} className="space-y-4">
                        <h4 className="text-xl font-display font-semibold text-white/90">
                            {data.category}
                        </h4>
                        <div className="space-y-3">
                            <PerformanceBar
                                label="AETHER Pro"
                                value={data.aetherPro}
                                maxValue={5}
                                color="linear-gradient(90deg, #6366f1 0%, #a855f7 100%)"
                                delay={index * 0.1}
                                isInView={isInView}
                            />
                            <PerformanceBar
                                label="Previous Gen"
                                value={data.previousGen}
                                maxValue={5}
                                color="rgba(255, 255, 255, 0.3)"
                                delay={index * 0.1 + 0.1}
                                isInView={isInView}
                            />
                            <PerformanceBar
                                label="Competitor"
                                value={data.competitor}
                                maxValue={5}
                                color="rgba(255, 255, 255, 0.1)"
                                delay={index * 0.1 + 0.2}
                                isInView={isInView}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function StatCard({
    value,
    label,
    delay,
}: {
    value: string;
    label: string;
    delay: number;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    return (
        <motion.div
            ref={ref}
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.8, delay }}
        >
            <div className="text-5xl md:text-6xl lg:text-7xl font-display font-bold text-gradient mb-2">
                {value}
            </div>
            <div className="text-base md:text-lg text-apple-gray">{label}</div>
        </motion.div>
    );
}

export default function PerformanceSection() {
    const sectionRef = useRef<HTMLElement>(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [100, 0, 0, -100]);

    return (
        <section
            ref={sectionRef}
            className="relative py-32 md:py-48 px-6 md:px-12 lg:px-24 bg-black"
        >
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-black to-obsidian" />

            <motion.div className="relative z-10" style={{ opacity, y }}>
                {/* Section header */}
                <div className="text-center mb-20 md:mb-32">
                    <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-display font-bold hero-text leading-none mb-8">
                        <span className="text-white/90">Speed.</span>
                        <br />
                        <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                            Redefined.
                        </span>
                    </h2>
                    <p className="text-lg md:text-xl text-apple-gray max-w-3xl mx-auto">
                        The AETHER Pro delivers unprecedented performance across every task.
                        From intensive workflows to everyday use, experience speed like never before.
                    </p>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto mb-24 md:mb-32">
                    <StatCard value="2.8x" label="Faster CPU" delay={0} />
                    <StatCard value="3.2x" label="GPU Power" delay={0.1} />
                    <StatCard value="4.5x" label="ML Performance" delay={0.2} />
                    <StatCard value="40%" label="More Efficient" delay={0.3} />
                </div>

                {/* Performance comparison chart */}
                <PerformanceChart />
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-1/4 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[150px] pointer-events-none" />
        </section>
    );
}
