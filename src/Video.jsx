// App.jsx
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Video() {
	const videoRef = useRef(null);
	const scrollLength = 2000; // total scroll distance in px

	useEffect(() => {
		const video = videoRef.current;

		// ensure metadata is loaded before we can access duration
		const onLoaded = () => {
			const duration = video.duration;

			gsap.to(video, {
				currentTime: duration, // scrub from start to end
				ease: "none",
				scrollTrigger: {
					trigger: video,
					start: "top top",
					end: `+=${scrollLength}`,
					scrub: 1,
				},
			});
		};

		video.addEventListener("loadedmetadata", onLoaded);

		return () => {
			video.removeEventListener("loadedmetadata", onLoaded);
			ScrollTrigger.getAll().forEach((t) => t.kill());
		};
	}, []);

	return (
		<div style={{ height: window.innerHeight + scrollLength }}>
			<video
				ref={videoRef}
				src="/scrolltrigger-video-test/output.webm"
				preload="auto"
				style={{
					position: "sticky",
					top: 0,
					width: "100%",
					height: "100vh",
					objectFit: "cover",
					display: "block",
					background: "#000",
				}}
			/>
		</div>
	);
}
