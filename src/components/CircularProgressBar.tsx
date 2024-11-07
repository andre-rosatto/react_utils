import { CSSProperties, ReactNode } from 'react';


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
	children?: ReactNode;
}


// helper functions
// helper function to clamp values
const clamp = (value: number, min: number, max: number): number => Math.max(Math.min(value, max), min);

// helper function to convert the value into percentage
const getPercent = (value: number, min: number, max: number): number => clamp((value - min) * 100 / (max - min), 0, 100);


/** A circular progress bar. */
const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
	min = 0,
	max = 0,
	value = 0,
	emptyColor = 'transparent',
	fullColor = 'black', 
	thickness = 10,
	classes = '',
	children
}) => {
	
	// styling
	const styles: {
		base: CSSProperties,
		bar: CSSProperties,
		span: CSSProperties,
	} = {
		base: {
			position: 'relative'
		},
		bar: {
			width: '100%',
			height: '100%',
			position: 'absolute',
			borderRadius: '50%',
			background: `conic-gradient(${fullColor} ${getPercent(value, min, max)}%, ${emptyColor} ${getPercent(value, min, max)}%)`,
			maskImage: `radial-gradient(closest-side, transparent ${100 - clamp(thickness, 0, 100)}%, black ${100 - clamp(thickness, 0, 100)}%)`,
			WebkitMaskImage: `radial-gradient(closest-side, transparent ${100 - clamp(thickness, 0, 100)}%, black ${100 - clamp(thickness, 0, 100)}%)`,
		},
		span: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			transform: 'translate(-50%, -50%)'
		}
	}	

	return (
		// container
		<div className={classes} style={styles.base}>
			{/* the bar itself */}
			<div style={styles.bar}></div>

			{/* children container */}
			<span style={styles.span}>{children}</span>
		</div>
	);
}

export default CircularProgressBar;