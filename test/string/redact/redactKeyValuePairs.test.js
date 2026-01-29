import { redactKeyValuePairs, tagLiterals } from "../../../build/index.js";

describe("string", () => {
	describe("redact", () => {

		const tests = [
			//   input                                    expected output
			[],
			[null, null],
			["", ""],
			["                        ", "                        "],
			[` a="b" c.d="e" f-g="hi.j" naked=true `,   ` *="*" ***="*" ***="****" *****=**** `],
			["https://tenor.com/view/austin-powers-gif-5090756650443962254", "https://tenor.com/view/austin-powers-gif-5090756650443962254"],
		];
		tests.forEach(([input, expected]) => {
			test(tagLiterals`redactKeyValuePairs(${input}) === ${expected}`, () => {
				expect(redactKeyValuePairs(input)).toBe(expected);
			});
		});

	});
});
