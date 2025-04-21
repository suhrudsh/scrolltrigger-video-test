// App.jsx

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
	const canvasRef = useRef(null);
	const imagesRef = useRef([]);
	const totalFrames = 68;
	const scrollLength = 2000; // ~3-6s of scroll

	// preload all frames
	useEffect(() => {
		for (let i = 1; i <= totalFrames; i++) {
			const img = new Image();
			img.src = `/scrolltrigger-video-test/${i
				.toString()
				.padStart(4, "0")}.webp`;
			imagesRef.current.push(img);
		}
		// once the first frame is loaded, draw it
		imagesRef.current[0].onload = () => {
			const ctx = canvasRef.current.getContext("2d");
			ctx.drawImage(
				imagesRef.current[0],
				0,
				0,
				canvasRef.current.width,
				canvasRef.current.height
			);
		};
	}, []);

	// set up canvas size + ScrollTrigger
	useEffect(() => {
		const canvas = canvasRef.current;
		const setCanvasSize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			// redraw current frame to fill new size
			const ctx = canvas.getContext("2d");
			const currentFrame = Math.floor(
				((ScrollTrigger && ScrollTrigger.latestProgress) || 0) *
					(totalFrames - 1)
			);
			const img = imagesRef.current[currentFrame] || imagesRef.current[0];
			if (img.complete) ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
		};
		setCanvasSize();
		window.addEventListener("resize", setCanvasSize);

		const trigger = ScrollTrigger.create({
			trigger: canvas,
			start: "top top",
			end: `+=${scrollLength}`,
			scrub: 1,
			onUpdate: (self) => {
				const frameIndex = Math.floor(self.progress * (totalFrames - 1));
				const img = imagesRef.current[frameIndex];
				if (img && img.complete) {
					const ctx = canvas.getContext("2d");
					ctx.clearRect(0, 0, canvas.width, canvas.height);
					ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
				}
			},
		});

		return () => {
			trigger.kill();
			window.removeEventListener("resize", setCanvasSize);
		};
	}, []);

	// wrapper gives us extra scroll, canvas is sticky
	return (
		<div style={{ height: window.innerHeight + scrollLength }}>
			<canvas
				ref={canvasRef}
				style={{
					position: "sticky",
					top: 0,
					width: "100%",
					height: "100vh",
					display: "block",
					background: "#000",
					objectFit: "cover",
				}}
			/>
		</div>
	);
}
