import { useState } from 'react';
import './App.css';
import Confetti from './components/Confetti';

export default function App() {
	const [active, setActive] = useState<boolean>(false);
	const [colors, setColors] = useState<string[]>(['red', 'blue', 'cyan', 'green', 'yellow', 'white', 'pink', 'orange', 'purple']);
	const [count, setCount] = useState<number>(50);

	const handleCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		console.log(e.target.value);
		
		const value = e.target.value.match(/[^0]\d*/g)?.toString() ?? '0';
		console.log(value);
		
		setCount(parseInt(value));
	}

  return (
    <div className="App">
			<h1>React Confetti Component Demo</h1>
			<section>
				{/* colours config */}
				<label>Colours:
					<textarea
						className="control"
						rows={15}
						value={colors.join('\n')}
						onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setColors(e.target.value.split('\n'))}
					/>
				</label>

				{/* count config */}
				<label>Count:
					<input
						type="number"
						className="control"
						value={count.toString()}
						onChange={handleCountChange}
					/>
				</label>
			</section>

			{/* start/stop button */}
			<button
				className="control"
				onClick={() => setActive(!active)}
			>
				{active ? 'Stop' : 'Start'}
			</button>

			{/* confetti */}
			{active &&
				<Confetti
					colors={colors}
					count={count}
				/>
			}
    </div>
  );
}