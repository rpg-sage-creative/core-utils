import { redactKeyValuePairs, tagLiterals } from "../../../build/index.js";

describe("string", () => {
	describe("redact", () => {

		const tests = [
			//   input                                    expected output
			[` a="b" c.d="e" f-g="hi.j" naked=true `,   ` *="*" ***="*" ***="****" *****=**** `],
		];
		tests.forEach(([input, expected]) => {
			test(tagLiterals`redactKeyValuePairs(${input}) === ${expected}`, () => {
				expect(redactKeyValuePairs(input)).toBe(expected);
			});
		});

	});
});
