import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                obsidian: "#0A0A0B",
                "apple-gray": "#86868b",
            },
            fontFamily: {
                display: ["var(--font-outfit)", "system-ui", "sans-serif"],
                body: ["var(--font-inter)", "system-ui", "sans-serif"],
            },
            animation: {
                shimmer: "shimmer 2.5s ease-in-out infinite",
                glow: "glow 2s ease-in-out infinite alternate",
                float: "float 6s ease-in-out infinite",
                pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
            },
            keyframes: {
                shimmer: {
                    "0%, 100%": { backgroundPosition: "200% 0" },
                    "50%": { backgroundPosition: "-200% 0" },
                },
                glow: {
                    "0%": { boxShadow: "0 0 20px rgba(255, 255, 255, 0.1)" },
                    "100%": { boxShadow: "0 0 40px rgba(255, 255, 255, 0.2)" },
                },
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-10px)" },
                },
            },
        },
    },
    plugins: [],
};

export default config;
