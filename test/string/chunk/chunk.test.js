import { chunk } from "../../../build/index.js";

describe("string", () => {
	describe("chunk", () => {

		// [expectedArray, inputString, maxLength]
		const input = [
			[["this is\n a sentence\n that has a\n bunch of words."], "this is\n a sentence\n that has a\n bunch of words.", 2000],
			[["this is", " a sentence", " that has a", " bunch of", " words."], "this is\n a sentence\n that has a\n bunch of words.", 15],
			[["this is a", " sentence that", " has a bunch", " of words."], "this is a sentence that has a bunch of words.", 15],
			[[], " \t \n ".trim(), 2000],
			[[], undefined, 2000],
		];
		input.forEach(([expected, value, length]) => {
			test(`chunk(${value})`, () => {
				expect(chunk(value, length)).toEqual(expected);
			});
		});

	});
});
