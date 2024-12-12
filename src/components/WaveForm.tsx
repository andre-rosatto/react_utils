import { CSSProperties, useEffect, useRef } from "react";

/** Interface for the CircularProgressBar's props. */
interface WaveFormProps {
	/** The audio buffer. @defaultValue ```null```. */
	audioBuffer?: AudioBuffer | null;
	/** The current playback time. @defaultValue ```0```. */
	currentTime?: number;
	/** The sample rate to be drawn. @defaultValue ```1000```. */
	samples?: number;
	/** The colour for the unplayed part. @defaultValue ```"black"```. */
	unplayedColor?: string;
	/** The colour for the part already played. @defaultValue ```"blue"```. */
	playedColor?: string;
	/** The cursor colour. @defaultValue ```"blue"```. */
	cursorColor?: string;
	/** Callback function called when the user clicks. @defaultValue ```undefined```.
	 * @param time: The time position clicked.
	*/
	onClick?: (time: number) => void;
}

// Helper functions
/** Helper function. Filters the audio data according to the sample rate */
const filterData = (audioBuffer: AudioBuffer, samples: number): number[] => {
	const rawData = audioBuffer.getChannelData(0);
	const blockSize = Math.floor(rawData.length / samples);
	
	const filteredData = [];
	for (let i = 0; i < samples; i++) {
		let blockStart = blockSize * i;
		let sum = 0;
		for (let j = 0; j < blockSize; j++) {
			sum += Math.abs(rawData[blockStart + j]);
		}
		filteredData.push(sum / blockSize);
	}
	return filteredData;
}

/** Helper function. Normalizes the filtered data for drawing */
const normalizeData = (filteredData: number[]) => {
	const multiplier = Math.pow(Math.max(...filteredData), -1);
	return filteredData.map(n => n * multiplier);
}

/** Helper function. Draws the waveform */
const draw = (
	canvas: HTMLCanvasElement,
	buffer: AudioBuffer | null,
	currentTime: number,
	samples: number,
	playedColor: string,
	unplayedColor: string,
	cursorColor: string
) => {
	const ctx = canvas.getContext('2d');
	if (!ctx) return;

	canvas.width = canvas.offsetWidth;
	canvas.height = canvas.offsetHeight;
	const position = buffer ? Math.min(currentTime, buffer.duration) * canvas.width / buffer.duration : 0;
	ctx.translate(0, canvas.offsetHeight / 2);

	drawBaseline(ctx, position, canvas.offsetWidth, playedColor, unplayedColor);

	if (buffer) {
		const normalizedBuffer = normalizeData(filterData(buffer, samples));
		const width = canvas.offsetWidth / normalizedBuffer.length;
	
		for (let i = 0; i < normalizedBuffer.length; i++) {
			const x = width * i;
			let height = Math.min(normalizedBuffer[i] * canvas.offsetHeight, canvas.offsetHeight / 2);
			if (height <= 0) {
				continue;
			}
	
			ctx.lineWidth = 1;
			ctx.fillStyle = x < position ? playedColor : unplayedColor;
			ctx.fillRect(x, -height, width, height * 2);
		}
	}
	drawCursor(ctx, position, canvas.height, cursorColor);
}

/** Helper function. Draws the middle baseline */
const drawBaseline = (
	ctx: CanvasRenderingContext2D,
	position: number,
	width: number,
	playedColor: string,
	unplayedColor: string
) => {
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeStyle = playedColor;
	ctx.moveTo(0, 0);
	ctx.lineTo(position, 0);
	ctx.stroke();
	ctx.beginPath();
	ctx.strokeStyle = unplayedColor;
	ctx.moveTo(position, 0);
	ctx.lineTo(width, 0);
	ctx.stroke();
}

/** Helper function. Draws the cursor */
const drawCursor = (ctx: CanvasRenderingContext2D, position: number, height: number, color: string) => {
	ctx.lineWidth = 1;
	ctx.strokeStyle = color;
	ctx.beginPath();
	ctx.moveTo(position, height / 2);
	ctx.lineTo(position, -height / 2);
	ctx.stroke();
}

/** Waveform representation of an audio buffer */
const WaveForm = ({
	audioBuffer = null,
	currentTime = 0,
	samples = 1000,
	unplayedColor = 'black',
	playedColor = 'blue',
	cursorColor = 'blue',
	onClick
}: WaveFormProps) => {
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// Redraws the waveform on any significant changes.
	useEffect(() => {
		if (canvasRef.current) {
			draw(canvasRef.current, audioBuffer, currentTime, samples, playedColor, unplayedColor, cursorColor);
		}
	}, [audioBuffer, currentTime, samples, playedColor, unplayedColor, cursorColor]);

	// Styling
	const style: CSSProperties = {
		width: '100%',
		height: '100%'
	}

	// Handles onClick event
	const handleClick = (e: React.MouseEvent<HTMLCanvasElement>): void => {
		if (!audioBuffer || !onClick) return;
		const x = e.nativeEvent.offsetX;
		const width = e.currentTarget.offsetWidth
		onClick(audioBuffer.duration * x / width);
	}

	return (
		<canvas
			ref={canvasRef}
			style={style}
			onClick={handleClick}
		></canvas>
	)
}

export default WaveForm;