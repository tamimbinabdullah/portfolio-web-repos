import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: "swap",
});

const outfit = Outfit({
    subsets: ["latin"],
    variable: "--font-outfit",
    display: "swap",
});

export const metadata: Metadata = {
    title: "AETHER Pro | Mind-blowing. Head-turning.",
    description: "Experience the next evolution of laptop architecture. AETHER Pro features the revolutionary Neural Chip, Liquid Retina XDR display, and advanced thermal performance.",
    keywords: ["laptop", "AETHER Pro", "premium laptop", "high performance", "neural chip"],
    openGraph: {
        title: "AETHER Pro | Mind-blowing. Head-turning.",
        description: "Experience the next evolution of laptop architecture.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${inter.variable} ${outfit.variable}`}>
            <body className="bg-obsidian antialiased">
                {children}
            </body>
        </html>
    );
}
