# AETHER Pro Landing Page

A cinematic, Apple-style landing page for the "AETHER Pro" laptop featuring scroll-sequence canvas animation, Bento feature grid, performance comparisons, and connectivity showcase.

## Features

- **Hero Scroll Animation**: 400vh sticky canvas with 200-frame image sequence scrubbing
- **Smooth Scrolling**: Lenis smooth scroll for buttery-smooth experience
- **Bento Feature Grid**: Glass-morphism cards with animated visuals
- **Performance Charts**: Scroll-triggered bar chart animations
- **Connectivity Section**: SVG laptop with animated port labels

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Animation**: Framer Motion + Lenis smooth scroll
- **Styling**: Tailwind CSS
- **Rendering**: HTML5 Canvas for frame scrubbing

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run development server**:
   ```bash
   npm run dev
   ```

3. **Open in browser**: Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
aether-pro/
├── public/
│   └── frames/           # 200 laptop animation frames
├── src/
│   ├── app/
│   │   ├── globals.css   # Global styles + animations
│   │   ├── layout.tsx    # Root layout with fonts
│   │   └── page.tsx      # Main page with Lenis
│   └── components/
│       ├── HeroScroll.tsx        # Sticky canvas animation
│       ├── BentoGrid.tsx         # Feature cards grid
│       ├── PerformanceSection.tsx # Charts & stats
│       └── ConnectivityFooter.tsx # Ports & footer
├── tailwind.config.ts
└── package.json
```

## Performance Notes

- Image frames are preloaded progressively during the loader animation
- Framer Motion's `useSpring` provides smooth scroll interpolation
- Below-fold sections use `useInView` for lazy animation triggers

## License

MIT
