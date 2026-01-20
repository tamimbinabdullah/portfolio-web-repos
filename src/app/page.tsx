"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import HeroScroll from "@/components/HeroScroll";
import BentoGrid from "@/components/BentoGrid";
import PerformanceSection from "@/components/PerformanceSection";
import ConnectivityFooter from "@/components/ConnectivityFooter";

export default function Home() {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: "vertical",
            smoothWheel: true,
        });

        function raf(time: number) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <main className="min-h-screen bg-obsidian">
            {/* Hero Section with Sticky Canvas Scroll */}
            <HeroScroll />

            {/* Bento Feature Grid */}
            <BentoGrid />

            {/* Performance Comparison Section */}
            <PerformanceSection />

            {/* Connectivity & Footer */}
            <ConnectivityFooter />
        </main>
    );
}
