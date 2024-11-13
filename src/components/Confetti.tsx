import { CSSProperties, useEffect, useRef } from "react";

/**
 * Interface for the Confetti component
 */
interface ConfettiProps {
	/** The number of confetti pieces to be generated. @defaultValue ```50```. */
	count?: number;
	/** Array of colours to be randomly picked. @defaultValue ```['red', 'blue', 'cyan', 'green', 'yellow', 'white', 'pink', 'orange', 'purple']```. */
	colors?: Array<string>;
	/** Z-index of the component. @defaultValue ```Number.MAX_SAFE_INTEGER```. */
	zIndex?: number;
}

/**
 * Interface for confetti pieces
 */
interface IConfetti {
	/** X position */
	x: number;
	/** Y position */
	y: number;
	/** width */
	w: number;
	/** height */
	h: number;
	/** rotation */
	r: number;
	/** color */
	color: string;
	/** X speed */
	speedX: number;
	/** Y speed */
	speedY: number;
	/** rotation speed */
	speedR: number;
}

/**
 * Confetti component.
 */
export default function Confetti({
		count = 50,
		colors = ['red', 'blue', 'cyan', 'green', 'yellow', 'white', 'pink', 'orange', 'purple'],
		zIndex = Number.MAX_SAFE_INTEGER
	}: ConfettiProps) {
	const canvas = useRef<HTMLCanvasElement>(null);
	const confetti = useRef<Array<IConfetti>>(
		Array.from(Array(count), () => {
			return {
				x: Math.random() * window.innerWidth,
				y: Math.random() * -window.innerHeight,
				w: Math.random() * 10 + 8,
				h: Math.random() * 10 + 8,
				r: Math.random(),
				color: colors[Math.floor(Math.random() * colors.length)],
				speedY: Math.random() * 2 + 1,
				speedX: (Math.random() - 0.5) / 2,
				speedR: (Math.random() - 0.5) / 20
			}
		}
	));

	useEffect(() => {
		// resize event
		const handleResize = () => {
			if (canvas.current) {
				canvas.current.width = window.innerWidth;
				canvas.current.height = window.innerHeight;
			}
		}
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	useEffect(()=> {
		// confetti animation
		let animation: number;
		const updateConfetti = () => {
			if (!isCanvas(canvas.current)) return;
			const ctx = canvas.current.getContext('2d');
			if (!ctx) return;

			ctx.clearRect(0, 0, canvas.current.width, canvas.current.height);

			confetti.current.forEach(c => {
				c.x += c.speedX;
				if (c.y > canvas.current!.height) {
					c.x = Math.random() * canvas.current!.width;
					c.y = Math.random() * -5;
					c.speedR = (Math.random() - 0.5) / 20;
				} else {
					c.y += c.speedY
					c.r += c.speedR;
				}
				ctx.fillStyle = c.color;
				ctx.save();
				ctx.translate(c.x, c.y);
				ctx.rotate(c.r);
				ctx.fillRect(-c.w / 2, -c.h / 2, c.w, c.h);
				ctx.restore();
			});
			animation = requestAnimationFrame(updateConfetti);
		}
		animation = requestAnimationFrame(updateConfetti);
		return () => cancelAnimationFrame(animation);
	}, [canvas]);

	const isCanvas = (el: any): el is HTMLCanvasElement => el instanceof HTMLCanvasElement;

	const style: CSSProperties = {
		position: 'absolute',
		top: 0,
		left: 0,
		pointerEvents: 'none',
		zIndex: zIndex
	}

	return (
		<canvas
			ref={canvas}
			style={style}
		></canvas>
	);
}