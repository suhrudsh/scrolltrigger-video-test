# ScrollTrigger Video Test

This project is an experiment using [GSAP's ScrollTrigger](https://greensock.com/scrolltrigger/) to create a scroll-controlled video playback effect using a `<canvas>` element.

As the user scrolls, a sequence of pre-rendered images is drawn to a canvas, simulating a frame-by-frame video.

---

## Features

- Scroll-based frame-by-frame animation using GSAP ScrollTrigger  
- Responsive full-screen canvas  
- Image preloading for smooth playback  
- Sticky canvas that stays fixed while scrolling

---

## Technologies

- React  
- GSAP + ScrollTrigger  
- HTML Canvas API

---

## How It Works

1. Preloads 68 `.webp` images as frames.
2. As the user scrolls, the correct frame is drawn to the canvas based on scroll progress.
3. The canvas resizes to fill the viewport and stays sticky during the scroll interaction.

---

## Setup

```bash
npm install
npm run dev