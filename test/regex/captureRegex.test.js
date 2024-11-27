import { regex } from "regex";
import { captureRegex } from "../../build/index.js";
import { toString } from "../toString.mjs";

const captureGroup = "cgName";

/** @param {RegExp} regexp */
function capture(regexp) {
	const expected = `(?<${captureGroup}>(?:${regexp.source}))`;
	const expectedFlags = regexp.flags.includes("u") ? regexp.flags : regexp.flags + "u";
	const captured = captureRegex(regexp, captureGroup);
	return { expected, expectedFlags, captured };
}

describe("regex", () => {
	describe("captureRegex", () => {

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
			const { expected, expectedFlags, captured } = capture(regexp);
			test(`captureRegex(${toString(regexp)}) === /${expected}/${expectedFlags}`, () => {
				expect(captured.source).toBe(expected);
				expect(captured.flags).toBe(expectedFlags);
			});
		});

		// [ [regexp, input, testResult, execCapture], ... ]
		const tests = [
			[/simple/,                              "simple", true,  undefined],
			[/simple/,                              "simpl",  false, undefined],
			[captureRegex(/simple/, captureGroup),  "simple", true,  "simple"],
			[captureRegex(/simple/, captureGroup),  "simpl",  false, undefined],
			[captureRegex(/simple/g, captureGroup), "simple", true,  "simple"],
			[captureRegex(/simple/g, captureGroup), "simpl",  false, undefined],
		];
		tests.forEach(([regexp, input, testResult, execCapture]) => {
			test(`${toString(regexp)}.test(${toString(input)}) === ${testResult}`, () => {
				expect(regexp.test(input)).toBe(testResult);
			});

			// .test/.exec will increment the .lastIndex on a global regexp, so global tests should return undefined
			// let's run the exec as is first
			test(`${toString(regexp)}.exec(${toString(input)})?.groups.${captureGroup} === ${toString(execCapture)}`, () => {
				const match = regexp.exec(input);
				const groups = match?.groups;
				const capturedValue = groups?.[captureGroup];
				const expectedValue = regexp.global ? undefined : execCapture;
				expect(capturedValue).toBe(expectedValue);
			});

			// .test/.exec will increment the .lastIndex on a global regexp, so global tests should return undefined
			// let's reset .lastIndex and try again
			test(`${toString(regexp)}.exec(${toString(input)})?.groups.${captureGroup} === ${toString(execCapture)}`, () => {
				regexp.lastIndex = -1;
				const match = regexp.exec(input);
				const groups = match?.groups;
				const capturedValue = groups?.[captureGroup];
				expect(capturedValue).toBe(execCapture);
			});
		});
	});

});
