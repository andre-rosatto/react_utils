# React WaveForm

An audio waveform visualization component.

![screenshot](https://github.com/user-attachments/assets/4d547837-1645-426e-8195-f15863c51791)

## Props

### audioBuffer
```AudioBuffer```: The audio buffer to be displayed as waveform. Default is ```null```.

### currentTime
```number```: The current playback time. Default is ```0```.

### samples
```number```: The sample rate to draw the waveform. Default is ```1000```.

### playedColor
```string```: A CSS colour value to be used as the colour of the played part of the waveform.  Default is ```"blue"```.

### unplayedColor
```string```: A CSS colour value to be used as the colour of the unplayed part of the waveform. Default is ```"black"```.

### cursorColor
```number```: A CSS colour value to be used as the colour of the cursor of the waveform. Default is ```"blue"```.


## Scripts

## npm start
Serves the project in development mode on ```localhost:3000```.

## npm run build
Builds the project for production.
