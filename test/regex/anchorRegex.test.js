import { regex } from "regex";
import { anchorRegex } from "../../build/index.js";
import { toString } from "../toString.mjs";

/** @param {RegExp} regexp */
function anchor(regexp) {
	const expected = `^(?:${regexp.source})$`;
	const expectedFlags = regexp.flags.includes("u") ? regexp.flags : regexp.flags + "u";
	const anchored = anchorRegex(regexp);
	return { expected, expectedFlags, anchored };
}

describe("regex", () => {
	describe("anchorRegex", () => {

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
		regexps.forEach(regexp => {
			const { expected, expectedFlags, anchored } = anchor(regexp);
			test(`anchorRegex(${toString(regexp)}) === /${expected}/${expectedFlags}`, () => {
				expect(anchored.source).toBe(expected);
				expect(anchored.flags).toBe(expectedFlags);
			});
		});

		// [ [regexp, input, testResult], ... ]
		const tests = [
			[/simple/,               "simple",       true],
			[/simple/,               " simple ",     true],
			[anchorRegex(/simple/),  "simple",       true],
			[anchorRegex(/simple/),  " simple ",     false],
			[anchorRegex(/simple/),  " \nsimple\n ", false],
			[anchorRegex(/simple/m), " \nsimple\n ", true],
		];
		tests.forEach(([regexp, input, output]) => {
			test(`${toString(regexp)}.test(${toString(input)}) === ${output}`, () => {
				expect(regexp.test(input)).toBe(output);
			});
		});

	});
});
