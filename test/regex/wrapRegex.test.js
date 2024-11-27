import { regex } from "regex";
import { spoilerRegex, wrapRegex } from "../../build/index.js";
import { toString } from "../toString.mjs";

/**
 * @param {RegExp} regexp
 */
function spoiler(regexp, opt) {
	const spoilerOn = (regexp) => ({ expected:`\\|\\|(?:${regexp.source})\\|\\|`, spoilered:spoilerRegex(regexp, true) });
	const spoilerOptional = (regexp) => ({ expected:`(?:\\|\\|(?:${regexp.source})\\|\\|)|(?:${regexp.source})`, spoilered:spoilerRegex(regexp, "optional") });
	const spoiler = (regexp, opt) => opt === true ? spoilerOn(regexp) : spoilerOptional(regexp);
	const { expected, spoilered } = spoiler(regexp, opt);
	const expectedFlags = regexp.flags.includes("u") ? regexp.flags : regexp.flags + "u";
	return { expected, spoilered, expectedFlags };
}

describe("regex", () => {
	describe("wrapRegex", () => {

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

		const options = [true, "optional"];

		regexps.forEach(regexp => {
			options.forEach(opt => {
				const { expected, expectedFlags, spoilered } = spoiler(regexp, opt);
				test(`wrapRegex(${toString(regexp)}, "||||", ${toString(opt)}) === /${expected}/${expectedFlags}`, () => {
					expect(spoilered.source).toBe(expected);
					expect(spoilered.flags).toBe(expectedFlags);
				});
			});
		});

		/** [ [opt, input, output], ... ] */
		const testTests = [
			["||||", true, "simpl", false],
			["||||", "optional", "simpl", false],

			["||||", true, "simple", false],
			["||||", true, "||simple||", true],
			["||||", "optional", "simple", true],
			["||||", true, "||simple||", true],
		];
		testTests.forEach(([chars, opt, input, output]) => {
			test(`wrapRegex(/simple/, ${toString(opt)}, ${toString(opt)}).test(${toString(input)}) === ${output}`, () => {
				expect(wrapRegex(/simple/, chars, opt).test(input)).toBe(output);
			});
		});

		/** [ [chars, opt, input, output], ...] */
		const execTests = [
			["|", true, "||simple||", "|simple|"],
			["||", true, "||simple||", "|simple|"],
			["|||", true, "||simple||", undefined],
			["||||", true, "||simple||", "||simple||"],
			["||||", true, "simple", undefined],
			["||||", "optional", "||simple||", "||simple||"],
			["||||", "optional", "simple", "simple"],
			["<", true, "<simple>", undefined],
			["<>", true, "<simple>", "<simple>"],
		];
		execTests.forEach(([chars, opt, input, output]) => {
			test(`wrapRegex(/simple/, ${toString(chars)}, ${toString(opt)}).exec(${toString(input)})?.[0] === ${toString(output)}`, () => {
				expect(wrapRegex(/simple/, chars, opt).exec(input)?.[0]).toBe(output);
			});
		});

	});
});


