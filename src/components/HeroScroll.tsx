"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const TOTAL_FRAMES = 200;
const FRAME_PATH = "/frames/ezgif-frame-";

export default function HeroScroll() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [imagesLoaded, setImagesLoaded] = useState(false);
    const [loadProgress, setLoadProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    // Text opacity transforms for different phases
    const liftTextOpacity = useTransform(smoothProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const revealTextOpacity = useTransform(smoothProgress, [0.25, 0.35, 0.65, 0.70], [0, 1, 1, 0]);
    const reassemblyOpacity = useTransform(smoothProgress, [0.70, 0.80, 0.92, 0.95], [0, 1, 1, 0]);

    // Canvas scale and opacity for exit
    const canvasScale = useTransform(smoothProgress, [0.92, 1], [1, 0.85]);
    const canvasOpacity = useTransform(smoothProgress, [0.95, 1], [1, 0.7]);

    // Preload images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            let loaded = 0;

            const promises = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
                return new Promise<HTMLImageElement>((resolve, reject) => {
                    const img = new Image();
                    img.onload = () => {
                        loaded++;
                        setLoadProgress(Math.round((loaded / TOTAL_FRAMES) * 100));
                        resolve(img);
                    };
                    img.onerror = reject;
                    const frameNum = String(i + 1).padStart(3, "0");
                    img.src = `${FRAME_PATH}${frameNum}.jpg`;
                });
            });

            try {
                const results = await Promise.all(promises);
                loadedImages.push(...results);
                setImages(loadedImages);
                setImagesLoaded(true);
            } catch (error) {
                console.error("Error loading images:", error);
            }
        };

        loadImages();
    }, []);

    // Render frame based on scroll position
    const renderFrame = useCallback(
        (progress: number) => {
            if (!canvasRef.current || images.length === 0) return;

            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Calculate frame index (0 to TOTAL_FRAMES - 1)
            const frameIndex = Math.min(
                TOTAL_FRAMES - 1,
                Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
            );

            const img = images[frameIndex];
            if (!img) return;

            // Set canvas size to match window
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Clear canvas
            ctx.fillStyle = "#0A0A0B";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Calculate aspect ratio fill
            const imgAspect = img.width / img.height;
            const canvasAspect = canvas.width / canvas.height;

            let drawWidth, drawHeight, drawX, drawY;

            if (imgAspect > canvasAspect) {
                // Image is wider - fit to height
                drawHeight = canvas.height;
                drawWidth = drawHeight * imgAspect;
                drawX = (canvas.width - drawWidth) / 2;
                drawY = 0;
            } else {
                // Image is taller - fit to width
                drawWidth = canvas.width;
                drawHeight = drawWidth / imgAspect;
                drawX = 0;
                drawY = (canvas.height - drawHeight) / 2;
            }

            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);
        },
        [images]
    );

    // Subscribe to scroll changes
    useEffect(() => {
        const unsubscribe = smoothProgress.on("change", (v) => {
            renderFrame(v);
        });

        return () => unsubscribe();
    }, [smoothProgress, renderFrame]);

    // Initial render and resize handler
    useEffect(() => {
        if (imagesLoaded) {
            renderFrame(0);

            const handleResize = () => {
                renderFrame(smoothProgress.get());
            };

            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }
    }, [imagesLoaded, renderFrame, smoothProgress]);

    return (
        <section ref={containerRef} className="relative h-[400vh]">
            {/* Sticky container for canvas and overlays */}
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                {/* Loading state */}
                {!imagesLoaded && (
                    <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-obsidian">
                        <div className="mb-6 text-7xl font-display font-bold text-gradient">
                            AETHER
                        </div>
                        <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${loadProgress}%` }}
                                transition={{ duration: 0.1 }}
                            />
                        </div>
                        <div className="mt-4 text-sm text-apple-gray">
                            Loading experience... {loadProgress}%
                        </div>
                    </div>
                )}

                {/* Canvas for frame rendering */}
                <motion.canvas
                    ref={canvasRef}
                    className="absolute inset-0 w-full h-full"
                    style={{
                        scale: canvasScale,
                        opacity: canvasOpacity,
                    }}
                />

                {/* Phase 1: The Lift (0% - 25%) */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                    style={{ opacity: liftTextOpacity }}
                >
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                    >
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-display font-bold text-center hero-text text-gradient mb-4">
                            AETHER Pro
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-3xl text-center font-light tracking-wide">
                            <span className="text-white/80">Mind-blowing.</span>{" "}
                            <span className="text-apple-gray">Head-turning.</span>
                        </p>
                    </motion.div>

                    {/* Scroll indicator */}
                    <motion.div
                        className="absolute bottom-16 flex flex-col items-center"
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                        <span className="text-sm text-apple-gray mb-2">Scroll to explore</span>
                        <svg
                            className="w-6 h-6 text-apple-gray"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 14l-7 7m0 0l-7-7m7 7V3"
                            />
                        </svg>
                    </motion.div>
                </motion.div>

                {/* Phase 2: The Antigravity Reveal (25% - 70%) */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                    style={{ opacity: revealTextOpacity }}
                >
                    <div className="text-center max-w-4xl px-8">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold hero-text text-gradient mb-6">
                            Architecture
                            <br />
                            <span className="text-apple-gray">evolved.</span>
                        </h2>
                        <p className="text-lg md:text-xl text-apple-gray max-w-2xl mx-auto">
                            Every component. Reimagined. Every system. Revolutionized.
                        </p>
                    </div>
                </motion.div>

                {/* Phase 3: The Reassembly (70% - 95%) */}
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
                    style={{ opacity: reassemblyOpacity }}
                >
                    <div className="text-center max-w-4xl px-8">
                        <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold hero-text mb-6">
                            <span className="text-white/90">Precision</span>
                            <br />
                            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-transparent bg-clip-text">
                                perfected.
                            </span>
                        </h2>
                    </div>
                </motion.div>

                {/* Vignette overlay for cinematic effect */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        background:
                            "radial-gradient(ellipse at center, transparent 0%, rgba(10, 10, 11, 0.3) 70%, rgba(10, 10, 11, 0.8) 100%)",
                    }}
                />
            </div>
        </section>
    );
}
