# React CircularProgressBar

A circular progress bar component.

Children elements will be displayed in the middle of the progress bar.

<strong>* Note: By default, the progress bar has no width or height, and so it won't show. It's necessary to define it's dimensions through the ```classes``` prop.</strong>

## Props

### min
```number```: The minimum value. Default is ```0```.

### max
```number```: The maximum value. Default is ```100```.

### value
```number```: The current value. Default is ```0```.

### emptyColor
```string```: A CSS color value to be used as the color of the empty part of the progress bar.  Default is ```transparent```.

### fullColor
```string```: A CSS color value to be used as the color of the filled part of the progress bar. Default is ```black```.

### thickness
```number```: The percentual thickness of the bar, from 0 to 100%. Default is ```10```.

### classes
```string```: External classes to be applied to the progress bar. Default is ```''```.
