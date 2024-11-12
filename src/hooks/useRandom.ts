import { useCallback, useRef } from "react";

/**
 * Pseudorandom number generator class using the Mulberry32 algorithm.
 * @param seed The initial seed for the generator.
 */
export function useRandom(seed: number) {
	const seedRef = useRef(seed);

	const mulberry32 = useCallback(() => {
		return () => {
			let for_bit32_mul = seedRef.current += 0x6D2B79F5;
			let cast32_one = (for_bit32_mul) ^ (for_bit32_mul >>> 15);
			let cast32_two = for_bit32_mul | 1;
			for_bit32_mul = Math.imul(cast32_one, cast32_two);
			for_bit32_mul ^= for_bit32_mul + Math.imul(for_bit32_mul ^ (for_bit32_mul >>> 7), for_bit32_mul | 61);
			return ((for_bit32_mul ^ (for_bit32_mul >>> 14)) >>> 0) / 4294967296;
		}
	}, []);
	
	/**
	 * Resets the seed and restarts the generator.
	 * @param newSeed The new seed.
	 */
	const setSeed = useCallback((newSeed: number): void => {
		seedRef.current = newSeed;
	}, []);

	/**
	 * Gets the next random number in the sequence.
	 * @returns The next random number (between 0 and 1) in the sequence.
	 */
	const nextRandom = useCallback((): number => {
		return mulberry32()();
	}, [mulberry32]);

	return { nextRandom, setSeed }
}