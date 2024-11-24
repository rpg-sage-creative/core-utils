import { getWhitespaceRegex } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("regex", () => {
	describe("getWhitespaceRegex", () => {

		const tests = [
			// basic source tests
			{ input:"", options:undefined, expectedSource:`(?:\\s)+`, expectedTestResults:false, expectedExecResults:null },
			{ input:"", options:{quantifier:""}, expectedSource:`\\s`, expectedTestResults:false, expectedExecResults:null },
			{ input:"", options:{horizontalOnly:true}, expectedSource:`(?:[^\\S\\r\\n])+`, expectedTestResults:false, expectedExecResults:null },
			{ input:"", options:{horizontalOnly:true,quantifier:""}, expectedSource:`[^\\S\\r\\n]`, expectedTestResults:false, expectedExecResults:null },

			// basic space tests
			{ input:" ", options:undefined, expectedSource:`(?:\\s)+`, expectedTestResults:true, expectedExecResults:[" "] },
			{ input:" ", options:{quantifier:""}, expectedSource:`\\s`, expectedTestResults:true, expectedExecResults:[" "] },
			{ input:" ", options:{horizontalOnly:true}, expectedSource:`(?:[^\\S\\r\\n])+`, expectedTestResults:true, expectedExecResults:[" "] },
			{ input:" ", options:{horizontalOnly:true,quantifier:""}, expectedSource:`[^\\S\\r\\n]`, expectedTestResults:true, expectedExecResults:[" "] },

			// basic newline tests
			{ input:"\n", options:undefined, expectedSource:`(?:\\s)+`, expectedTestResults:true, expectedExecResults:["\n"] },
			{ input:"\n", options:{quantifier:""}, expectedSource:`\\s`, expectedTestResults:true, expectedExecResults:["\n"] },
			{ input:"\n", options:{horizontalOnly:true}, expectedSource:`(?:[^\\S\\r\\n])+`, expectedTestResults:false, expectedExecResults:null },
			{ input:"\n", options:{horizontalOnly:true,quantifier:""}, expectedSource:`[^\\S\\r\\n]`, expectedTestResults:false, expectedExecResults:null },

			{ input:"b\n  \rb", options:undefined, expectedSource:`(?:\\s)+`, expectedTestResults:true, expectedExecResults:["\n  \r"] },
			{ input:"b\n  \rb", options:{quantifier:""}, expectedSource:`\\s`, expectedTestResults:true, expectedExecResults:["\n"] },
			{ input:"b\n  \rb", options:{horizontalOnly:true}, expectedSource:`(?:[^\\S\\r\\n])+`, expectedTestResults:true, expectedExecResults:["  "] },
			{ input:"b\n  \rb", options:{horizontalOnly:true,quantifier:""}, expectedSource:`[^\\S\\r\\n]`, expectedTestResults:true, expectedExecResults:[" "] },

			// { input:"", options:{ }, expectedSource:"", expectedTestResults:false, expectedExecResults:[] },
		];

		tests.forEach(({ input, options, expectedSource, expectedTestResults, expectedExecResults }) => {
			describe(`getWhitespaceRegex(${toString(options)})`, () => {

				test(`getWhitespaceRegex(${toString(options)}).source === ${toString(expectedSource)}`, () => {
					expect(getWhitespaceRegex(options).source).toBe(expectedSource);
				});

				test(`getWhitespaceRegex(${toString(options)}).test(${input}) === ${expectedTestResults}`, () => {
					expect(getWhitespaceRegex(options).test(input)).toBe(expectedTestResults);
				});

				test(`getWhitespaceRegex(${toString(options)}).exec(${input}) equals ${toString(expectedExecResults)}`, () => {
					if (expectedExecResults === null) {
						expect(getWhitespaceRegex(options).exec(input)).toBeNull();
					}else {
						// we use String() casting here because the RegExpExecArray doesn't have the same properties as a simple Array
						expect(String(getWhitespaceRegex(options).exec(input))).toBe(String(expectedExecResults));
					}
				});

			});
		});
	});
});