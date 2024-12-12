import { useEffect, useState } from 'react';
import './App.css';
import WaveForm from './components/WaveForm';

const audio = new Audio();
const audioContext = new AudioContext();

function App() {
	const [playedColor, setPlayedColor] = useState<string>('blue');
	const [unplayedColor, setUnplayedColor] = useState<string>('black');
	const [cursorColor, setCursorColor] = useState<string>('blue');
	const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>();
	const [currentTime, setCurrentTime] = useState<number>(0);
	const [playing, setPlaying] = useState<boolean>(false);
	const [samples, setSamples] = useState<number>(1000);

	// loads the audio on startup
	useEffect(() => {
		let ignore = false;
		const url = './audio/audio.mp3';
		audio.src = url;
		setAudioBuffer(null);
		fetch(audio.src)
			.then(response => response.arrayBuffer())
			.then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
			.then(audioBuffer => {
				if (ignore) return;
				setAudioBuffer(audioBuffer);
			})
			.catch((err) => {
				setAudioBuffer(null);
				console.error(`Error loading audio from ${url}:\n${err}`);
			})
			.finally(() => {
				setCurrentTime(0);
				setPlaying(false);
			});
		
		return () => {
			ignore = true;
		}
	}, []);

	// uses requestAnimationFrame to update the playback time
	useEffect(() => {
		let animationFrameHandle: number;
		const update = () => {
			if (audio.currentTime >= audio.duration) {
				setPlaying(false);
			}
			setCurrentTime(audio.currentTime);
			animationFrameHandle = window.requestAnimationFrame(update);
		}
		animationFrameHandle = window.requestAnimationFrame(update);

		return () => {
			window.cancelAnimationFrame(animationFrameHandle);
		}
	}, []);

	const handlePlayClick = (): void => {
		if (playing) {
			audio.pause();
		} else {
			audio.play();
		}
		setPlaying(!playing);
	}

	const handleWaveFormClick = (time: number): void => {
		audio.currentTime = time;
		setCurrentTime(time);
	}

  return (
    <div className="App">
      <div className='waveform-container'>
				<WaveForm
					playedColor={playedColor}
					unplayedColor={unplayedColor}
					cursorColor={cursorColor}
					audioBuffer={audioBuffer}
					currentTime={currentTime}
					samples={samples}
					onClick={handleWaveFormClick}
				/>
			</div>
			
			<button
				onClick={handlePlayClick}
				disabled={!audioBuffer}
			>{playing ? 'Stop' : 'Play'}</button>

			<div className="config-container">

				<label>Played Colour:
					<input
						type="text"
						value={playedColor}
						disabled={!audioBuffer}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayedColor(e.target.value)}
					/>
				</label>

				<label>Unplayed Colour:
					<input
						type="text"
						value={unplayedColor}
						disabled={!audioBuffer}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUnplayedColor(e.target.value)}
					/>
				</label>

				<label>Cursor Colour:
					<input
						type="text"
						value={cursorColor}
						disabled={!audioBuffer}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCursorColor(e.target.value)}
					/>
				</label>

				<label>Samples:
					<input
						type="range"
						min={50}
						max={1500}
						value={samples}
						disabled={!audioBuffer}
						onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSamples(parseInt(e.target.value))}
					/>
				</label>

			</div>
    </div>
  );
}

export default App;
