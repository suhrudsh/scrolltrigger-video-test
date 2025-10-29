import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Video from "./Video";
import { Canvas } from "./Canvas";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
	// wrapper gives us extra scroll, canvas is sticky
	return (
		<>
			<Canvas />
			<Video />
		</>
	);
}
