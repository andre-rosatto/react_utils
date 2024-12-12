# React WaveForm

An audio waveform visualization component.

Children elements will be displayed in the middle of the progress bar.



## Props

### audioBuffer
```AudioBuffer```: The audio buffer to be displayed as waveform. Default is ```null```.

### currentTime
```number```: The current playback time. Default is ```0```.

### samples
```number```: The sample rate to draw the waveform. Default is ```1000```.

### playedColor
```string```: A CSS colour value to be used as the colour of the played part of the waveform.  Default is ```blue```.

### unplayedColor
```string```: A CSS colour value to be used as the colour of the unplayed part of the waveform. Default is ```black```.

### cursorColor
```number```: A CSS colour value to be used as the colour of the cursor of the waveform. Default is ```blue```.


## Scripts

## npm start
Serves the project in development mode on ```localhost:3000```.

## npm run build
Builds the project for production.
