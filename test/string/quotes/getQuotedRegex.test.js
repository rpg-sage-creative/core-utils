import { createQuotedRegexPart, getQuotedRegex } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("quotes", () => {
	describe("getQuotedRegex", () => {

		const q2 = createQuotedRegexPart(`""`, "+");
		const q2f = createQuotedRegexPart(`“”`, "+");
		const q2e1 = createQuotedRegexPart(`„“`, "+");
		const q2e2 = createQuotedRegexPart(`„”`, "+");
		const q2a1 = createQuotedRegexPart(`«»`, "+");
		const q2a2 = createQuotedRegexPart(`»«`, "+");
		const q1 = createQuotedRegexPart(`''`, "+");
		const q1f = createQuotedRegexPart(`‘’`, "+");
		const join = (...args) => args.join("|");

		const sourceTests = [
			{ options:undefined,               expected:join(q2,q2f,q2e1,q2e2,q2a1,q2a2,q1,q1f) },
			{ options:{style:"double"},        expected:join(q2,q2f,q2e1,q2e2,q2a1,q2a2) },
			{ options:{style:"single"},        expected:join(q1,q1f) },
			{ options:{style:"strict"},        expected:join(q2,q1) },
			{ options:{style:"fancy"},         expected:join(q2,q2f,q1,q1f) },
			{ options:{style:"double-strict"}, expected:join(q2) },
			{ options:{style:"double-fancy"},  expected:join(q2,q2f) },
			{ options:{style:"single-strict"}, expected:join(q1) },

			{ options:{anchored:true}, expected:`^(?:${join(q2,q2f,q2e1,q2e2,q2a1,q2a2,q1,q1f)})$` },
			{ options:{capture:"quotes"}, expected:`(?<quotes>(?:${join(q2,q2f,q2e1,q2e2,q2a1,q2a2,q1,q1f)}))` },
		];

		sourceTests.forEach(({ options, expected }) => {
			test(`getQuotedRegex(${toString(options)}).source === ${toString(expected)}`, () => {
				expect(getQuotedRegex(options).source).toBe(expected);
			});
		});

		const tests = [
			// basic tests
			{ input:``, options:undefined, expectedTestResults:false, expectedExecResults:null },
			{ input:` '‘"“„ `, options:undefined, expectedTestResults:false, expectedExecResults:null },
			{ input:` 'normal single' `, options:undefined, expectedTestResults:true, expectedExecResults:[`'normal single'`] },
			{ input:` ‘fancy single’ `, options:undefined, expectedTestResults:true, expectedExecResults:[`‘fancy single’`] },
			{ input:` "normal double" `, options:undefined, expectedTestResults:true, expectedExecResults:[`"normal double"`] },
			{ input:` “fancy double” `, options:undefined, expectedTestResults:true, expectedExecResults:[`“fancy double”`] },
			{ input:` „extended double“ `, options:undefined, expectedTestResults:true, expectedExecResults:[`„extended double“`] },
			{ input:` „extended double” `, options:undefined, expectedTestResults:true, expectedExecResults:[`„extended double”`] },

			// strict tests
			{ input:` 'normal single' `, options:{style:"strict"}, expectedTestResults:true, expectedExecResults:[`'normal single'`] },
			{ input:` ‘fancy single’ `, options:{style:"strict"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` "normal double" `, options:{style:"strict"}, expectedTestResults:true, expectedExecResults:[`"normal double"`] },
			{ input:` “fancy double” `, options:{style:"strict"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` „extended double“ `, options:{style:"strict"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` „extended double” `, options:{style:"strict"}, expectedTestResults:false, expectedExecResults:null },

			// fancy tests
			{ input:` 'normal single' `, options:{style:"fancy"}, expectedTestResults:true, expectedExecResults:[`'normal single'`] },
			{ input:` ‘fancy single’ `, options:{style:"fancy"}, expectedTestResults:true, expectedExecResults:[`‘fancy single’`] },
			{ input:` "normal double" `, options:{style:"fancy"}, expectedTestResults:true, expectedExecResults:[`"normal double"`] },
			{ input:` “fancy double” `, options:{style:"fancy"}, expectedTestResults:true, expectedExecResults:[`“fancy double”`] },
			{ input:` „extended double“ `, options:{style:"fancy"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` „extended double” `, options:{style:"fancy"}, expectedTestResults:false, expectedExecResults:null },

			// single tests
			{ input:` 'normal single' `, options:{style:"single"}, expectedTestResults:true, expectedExecResults:[`'normal single'`] },
			{ input:` ‘fancy single’ `, options:{style:"single"}, expectedTestResults:true, expectedExecResults:[`‘fancy single’`] },
			{ input:` "normal double" `, options:{style:"single"}, expectedTestResults:false, expectedExecResults:null },

			// single-strict tests
			{ input:` 'normal single' `, options:{style:"single-strict"}, expectedTestResults:true, expectedExecResults:[`'normal single'`] },
			{ input:` ‘fancy single’ `, options:{style:"single-strict"}, expectedTestResults:false, expectedExecResults:null },

			// double tests
			{ input:` 'normal single' `, options:{style:"double"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` ‘fancy single’ `, options:{style:"double"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` "normal double" `, options:{style:"double"}, expectedTestResults:true, expectedExecResults:[`"normal double"`] },
			{ input:` “fancy double” `, options:{style:"double"}, expectedTestResults:true, expectedExecResults:[`“fancy double”`] },
			{ input:` „extended double“ `, options:{style:"double"}, expectedTestResults:true, expectedExecResults:[`„extended double“`] },
			{ input:` „extended double” `, options:{style:"double"}, expectedTestResults:true, expectedExecResults:[`„extended double”`] },

			// double-strict tests
			{ input:` 'normal single' `, options:{style:"double-strict"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` ‘fancy single’ `, options:{style:"double-strict"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` "normal double" `, options:{style:"double-strict"}, expectedTestResults:true, expectedExecResults:[`"normal double"`] },
			{ input:` “fancy double” `, options:{style:"double-strict"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` „extended double“ `, options:{style:"double-strict"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` „extended double” `, options:{style:"double-strict"}, expectedTestResults:false, expectedExecResults:null },

			// double-fancy tests
			{ input:` 'normal single' `, options:{style:"double-fancy"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` ‘fancy single’ `, options:{style:"double-fancy"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` "normal double" `, options:{style:"double-fancy"}, expectedTestResults:true, expectedExecResults:[`"normal double"`] },
			{ input:` “fancy double” `, options:{style:"double-fancy"}, expectedTestResults:true, expectedExecResults:[`“fancy double”`] },
			{ input:` „extended double“ `, options:{style:"double-fancy"}, expectedTestResults:false, expectedExecResults:null },
			{ input:` „extended double” `, options:{style:"double-fancy"}, expectedTestResults:false, expectedExecResults:null },

			// anchored tests
			{ input:`'normal single'`, options:{anchored:true}, expectedTestResults:true, expectedExecResults:[`'normal single'`] },
			{ input:` 'normal single' `, options:{anchored:true}, expectedTestResults:false, expectedExecResults:null },
			{ input:`"normal double"`, options:{anchored:true}, expectedTestResults:true, expectedExecResults:[`"normal double"`] },

			// quantifier tests
			{ input:`''`, options:{quantifier:"*"}, expectedTestResults:true, expectedExecResults:[`''`] },
			{ input:`''`, options:{quantifier:"+"}, expectedTestResults:false, expectedExecResults:null },
			{ input:`'ab'`, options:{quantifier:"*"}, expectedTestResults:true, expectedExecResults:[`'ab'`] },
			{ input:`'ab'`, options:{quantifier:"+"}, expectedTestResults:true, expectedExecResults:[`'ab'`] },
			{ input:`'ab'`, options:{quantifier:"{1}"}, expectedTestResults:false, expectedExecResults:null },
			{ input:`'ab'`, options:{quantifier:"{3,}"}, expectedTestResults:false, expectedExecResults:null },

			// escaped tests
			{ input:` 'normal ' single' `, options:undefined, expectedTestResults:true, expectedExecResults:[`'normal '`] },
			{ input:` 'normal \\' single' `, options:undefined, expectedTestResults:true, expectedExecResults:[`'normal \\' single'`] },
			{ input:`'normal ' single'`, options:{anchored:true}, expectedTestResults:false, expectedExecResults:null },
			{ input:`'normal \\' single'`, options:{anchored:true}, expectedTestResults:true, expectedExecResults:[`'normal \\' single'`] },

			{ input:` "normal " double" `, options:undefined, expectedTestResults:true, expectedExecResults:[`"normal "`] },
			{ input:` "normal \\" double" `, options:undefined, expectedTestResults:true, expectedExecResults:[`"normal \\" double"`] },
			{ input:`"normal " double"`, options:{anchored:true}, expectedTestResults:false, expectedExecResults:null },
			{ input:`"normal \\" double"`, options:{anchored:true}, expectedTestResults:true, expectedExecResults:[`"normal \\" double"`] },

			// { input:``, options:undefined, expectedTestResults:false, expectedExecResults:null },
		];

		tests.forEach(({ input, options, expectedTestResults, expectedExecResults }) => {

			test(`getQuotedRegex(${toString(options)}).test(${toString(input)}) === ${expectedTestResults}`, () => {
				expect(getQuotedRegex(options).test(input)).toBe(expectedTestResults);
			});

			test(`getQuotedRegex(${toString(options)}).exec(${toString(input)}) equals ${toString(expectedExecResults)}`, () => {
				if (expectedExecResults === null) {
					expect(getQuotedRegex(options).exec(input)).toBeNull();
				}else {
					// we use String() casting here because the RegExpExecArray doesn't have the same properties as a simple Array
					expect(String(getQuotedRegex(options).exec(input))).toBe(String(expectedExecResults));
				}
			});

		});

	});
});