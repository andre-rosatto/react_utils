import { useState } from 'react';
import './App.css';
import CircularProgressBar from './components/CircularProgressBar';

export default function App() {
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(100);
	const [value, setValue] = useState(25);
	const [emptyColor, setEmptyColor] = useState('transparent');
	const [fullColor, setFullColor] = useState('black');
	const [thickness, setThickness] = useState(10);

  return (
		<div className="App">
			<CircularProgressBar
				min={min}
				max={max}
				value={value}
				emptyColor={emptyColor}
				fullColor={fullColor}
				thickness={thickness}
				classes='CircularPB'
			>
				{value}
			</CircularProgressBar>

			{/* controls for testing */}
			<section>
				
				{/* min */}
				<div className="item">
					<label>Min: </label>
					<input
						type="range"
						value={min}
						min={-200}
						max={max - 1}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMin(parseInt(e.target.value))} />
					<p>{min}</p>
				</div>

				{/* max */}
				<div className="item">
					<label>Max: </label>
					<input
						type="range"
						value={max}
						min={min + 1}
						max={200}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMax(parseInt(e.target.value))} />
					<p>{max}</p>
				</div>

				{/* value */}
				<div className="item">
					<label>Value: </label>
					<input
						type="range"
						value={value}
						min={min}
						max={max}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setValue(parseInt(e.target.value))} />
					<p>{value}</p>
				</div>

				{/* emptyColor */}
				<div className="item">
					<label>Empty Color: </label>
					<input
						type="text"
						value={emptyColor}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmptyColor(e.target.value)} />
				</div>

				{/* fullColor */}
				<div className="item">
					<label>Full Color: </label>
					<input
						type="text"
						value={fullColor}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFullColor(e.target.value)} />
				</div>
				
				{/* thickness */}
				<div className="item">
					<label>Thickness: </label>
					<input
						type="range"
						value={thickness}
						min={0}
						max={100}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setThickness(parseInt(e.target.value))} />
					<p>{thickness}</p>
				</div>
			</section>
			
		</div>
  );
}
