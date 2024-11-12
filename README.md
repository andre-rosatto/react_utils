# React useRandom Hook

A pseudorandom number generator hook. It generates numbers between ```0``` and ```1``` using the Mulberry32 algorithm.

The generator is started with a provided seed. If no seed is provided, the current timestamp is used (from Date.now()), therefore generating a "random" seed.

![useRandom screenshot](https://github.com/user-attachments/assets/27aca9c7-3011-41cf-a80b-e06b9b3ea1d6)

## Usage

Initialize the hook using ```useRandom([seed])```.

Example:
<code>
  const { nextRandom, setSeed } = useRandom(0);
</code>

You can then call ```nextRandom()``` to retrieve the next pseudorandom number.

Example:
<code>
  const randomNumber = nextRandom();
</code>

Use ```setSeed([sewSeed])``` to set a new seed for the generator and restart it.

Example:
<code>
  setSeed(12345);
</code>

## Functions

### nextRandom() => number
Returns the next pseudorandom number in the sequence. It is a number between ```0``` and ```1```.

### setSeed(newSeed: number) => void
Sets a new seed for the generator and resets it, meaning that the sequence will restart with the new seed. 

Args -> ```newSeed: number``` -> The new seed for the generator. If no seed if provided, it defaults to ```Date.now()```.

## Scripts

## npm start
Serves the project in development mode on ```localhost:3000```.

## npm run build
Builds the project for production.
