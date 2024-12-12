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

	// updates the playback time
	useEffect(() => {
		let animationFrameHandle: number;
		const update = () => {
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

			</div>
    </div>
  );
}

export default App;
