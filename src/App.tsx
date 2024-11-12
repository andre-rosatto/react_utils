import { useState } from 'react';
import './App.css';
import { useRandom } from './hooks/useRandom';

const COUNT = 20;

export default function App() {
	const [seed1, setSeed1] = useState(0);
	const [seed2, setSeed2] = useState(0);
	const randomizer1 = useRandom(seed1);
	const randomizer2 = useRandom(seed2);
	const [results1, setResults1] = useState<number[]>([]);
	const [results2, setResults2] = useState<number[]>([]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
		const value = parseFloat(e.target.value);
		if (index === 1) {
			setSeed1(value);
		} else {
			setSeed2(value);
		}
	}

	const handleClick = (index: number): void => {
		const randomizer = index === 1 ? randomizer1 : randomizer2;
		const seed = index === 1 ? seed1 : seed2;
		const setResults = index === 1 ? setResults1 : setResults2;

		randomizer.setSeed(seed);
		const nextResults: number[] = [];
		for (let i = 0; i < COUNT; i++) {
			nextResults.push(randomizer.nextRandom());
		}
		setResults(nextResults);
	}

  return (
    <div className="App">
			<h1>useRandom Hook Demo</h1>

			<div className="sections">
				<section>
					<label>Seed:
						<input type="number" value={seed1} onChange={e => handleInputChange(e, 1)} />
					</label>
					<button onClick={() => handleClick(1)}>Generate {COUNT}</button>
					{results1.length > 0 && <div className="results">
						{results1.map((result, index) => <p key={index}>{result}</p>)}
					</div>}
				</section>

				<section>
					<label>Seed:
						<input type="number" value={seed2} onChange={e => handleInputChange(e, 2)} />
					</label>
					<button onClick={() => handleClick(2)}>Generate {COUNT}</button>
					{results2.length > 0 && <div className="results">
						{results2.map((result, index) => <p key={index}>{result}</p>)}
					</div>}
				</section>
			</div>

			<p>A seed generates the same sequence of random numbers.</p>
    </div>
  );
}