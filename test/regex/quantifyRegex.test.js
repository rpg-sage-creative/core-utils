import { regex } from "regex";
import { quantifyRegex } from "../../build/index.js";
import { toString } from "../toString.mjs";

/**
 * @param {RegExp} regexp
 * @param {string} quantifier
 */
function quantify(regexp, quantifier) {
	const expected = `(?:${regexp.source})${quantifier}`;
	const expectedFlags = regexp.flags.includes("u") ? regexp.flags : regexp.flags + "u";
	const quantified = quantifyRegex(regexp, quantifier);
	return { expected, expectedFlags, quantified };
}

describe("regex", () => {
	describe("quantifyRegex", () => {

		// we test the regexp from both input types to ensure our code doesn't conflict nor cater to the regex library.
		const regexps = [
			// RegExp
			/simple/,
			/simple/g,
			/simple/i,
			/simple/gi,
			/simple/ig,
			/a[bc]d?/,
			/a[bc]d?/u,

			// regex
			regex`simple`,
			regex("g")`simple`,
			regex("i")`simple`,
			regex("gi")`simple`,
			regex("ig")`simple`,
			regex`a[bc]d?`,
			// regex("u")`a[bc]d?`, <-- throws exception because "u" is always on and cannot be specified
		];

		const quantifiers = ["?", "*", "+", "{2}", "{1,}", "{1,2}"];

		regexps.forEach(regexp => {
			quantifiers.forEach(quantifier => {
				const { expected, expectedFlags, quantified } = quantify(regexp, quantifier);
				test(`quantifyRegex(${toString(regexp)}, ${toString(quantifier)}) === /${expected}/${expectedFlags}`, () => {
					expect(quantified.source).toBe(expected);
					expect(quantified.flags).toBe(expectedFlags);
				});
			});
		});

		/** [ [regexp, quantifier, input, output], ... ] */
		const tests = [
			// ?
			[/a/, "?", "", ""],
			[/a/, "?", "a", "a"],
			[/a/, "?", "aa", "a"],

			// *
			[/b/, "*", "", ""],
			[/b/, "*", "b", "b"],
			[/b/, "*", "bb", "bb"],
			[/b/, "*", "bbb", "bbb"],
			[/b/, "*?", "bbb", ""],
			[/b/, "*+", "bbb", "bbb"],

			// +
			[/c/, "+", "", undefined],
			[/c/, "+", "c", "c"],
			[/c/, "+", "cc", "cc"],
			[/c/, "+", "ccc", "ccc"],
			[/c/, "+?", "ccc", "c"],
			[/c/, "++", "ccc", "ccc"],

			// {2}
			[/d/, "{2}", "", undefined],
			[/d/, "{2}", "d", undefined],
			[/d/, "{2}", "dd", "dd"],
			[/d/, "{2}", "ddd", "dd"],
			[/d/, "{2}", "dddd", "dd"],

			// {2,}
			[/e/, "{2,}", "", undefined],
			[/e/, "{2,}", "e", undefined],
			[/e/, "{2,}", "ee", "ee"],
			[/e/, "{2,}", "eee", "eee"],
			[/e/, "{2,}", "eeee", "eeee"],
			[/e/, "{2,}?", "eeee", "ee"],
			[/e/, "{2,}+", "eeee", "eeee"],

		];

		tests.forEach(([regexp, quantifier, input, output]) => {
			test(`quantifyRegex(${toString(regexp)}, ${toString(quantifier)}).exec(${toString(input)})?.[0] === ${toString(output)}`, () => {
				const { quantified } = quantify(regexp, quantifier);
				const match = quantified.exec(input);
				const result = match?.[0];
				expect(result).toBe(output);
			});
		});

	});
});
