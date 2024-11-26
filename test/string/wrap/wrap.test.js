import { wrap } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("wrap", () => {
		const s = "value";
		const tests = [
			[s, `()`, `(${s})`],
			[s, `[]`, `[${s}]`],
			[s, `[[]]`, `[[${s}]]`],
			[s, `[[[]]]`, `[[[${s}]]]`],
			[s, `'`, `'${s}'`],
			[s, `''`, `'${s}'`],
			[s, `'''`, `'''${s}'''`],
			[s, `'|:`, `'|:${s}:|'`],
		];
		tests.forEach(([input, chars, output]) => {
			test(`wrap(${toString(input)}, ${toString(chars)}) === ${toString(output)}`, () => {
				expect(wrap(input, chars)).toBe(output);
			})
		});
	});
});
