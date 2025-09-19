import { redactMdLink, tagLiterals } from "../../../build/index.js";

describe("string", () => {
	describe("redact", () => {

		const tests = [
			//   input                       expected output
			[`[link](http://rpgsage.io)`,   `[****](*****************)`],
			[`[link](<http://rpgsage.io>)`, `[****](<*****************>)`],
			[`[link](invalid_url)`,         `[link](invalid_url)`],
		];
		tests.forEach(([input, expected]) => {
			test(tagLiterals`redactMdLink(${input}) === ${expected}`, () => {
				expect(redactMdLink(input)).toBe(expected);
			});
		});

	});
});
