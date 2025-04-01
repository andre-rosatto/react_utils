import styles from './CircularProgressBar.module.css';

/** Interface for the CircularProgressBar's props. */
export interface CircularProgressBarProps {
	/** The minimum value. @defaultValue ```0```. */
	min?: number;
	/** The maximum value. @defaultValue ```100```. */
	max?: number;
	/** The progress of the value from 0 to 100%. @defaultValue ```0```. */
	value?: number;
	/** The color to be used as the background/empty color. @defaultValue ```transparent```. */
	emptyColor?: string;
	/** The color of the part of the progress bar that is complete/filled. @defaultValue ```white```. */
	fullColor?: string;
	/** The percentual $thickness of the bar. @defaultValue ```10```. */
	thickness?: number;
	/** Classes to be applied to the progress bar so that it can be customized. @defaultValue ```''```. */
	classes?: string;
	children?: React.ReactNode;
}


// helper functions
// helper function to clamp values
const clamp = (value: number, min: number, max: number): number => Math.max(Math.min(value, max), min);

// helper function to convert the value into percentage
const getPercent = (value: number, min: number, max: number): number => clamp((value - min) * 100 / (max - min), 0, 100);


/** A circular progress bar. */
export default function CircularProgressBar({
	min = 0,
	max = 0,
	value = 0,
	emptyColor = 'transparent',
	fullColor = 'black',
	thickness = 10,
	classes = '',
	children
}: CircularProgressBarProps) {
	return (
		// container
		<div className={`${styles.CircularProgressBar} ${classes}`}>
			{/* the bar itself */}
			<div
				className={styles.bar}
				style={{
					background: `conic-gradient(${fullColor} ${getPercent(value, min, max)}%, ${emptyColor} ${getPercent(value, min, max)}%)`,
					maskImage: `radial-gradient(closest-side, transparent ${100 - clamp(thickness, 0, 100)}%, black ${100 - clamp(thickness, 0, 100)}%)`,
					WebkitMaskImage: `radial-gradient(closest-side, transparent ${100 - clamp(thickness, 0, 100)}%, black ${100 - clamp(thickness, 0, 100)}%)`,
				}}
			></div>

			{/* children container */}
			<span className={styles.content}>{children}</span>
		</div>
	);
}