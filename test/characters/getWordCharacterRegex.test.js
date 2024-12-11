import { getWordCharacterRegex } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("characters", () => {
	describe("getWordCharacterRegex", () => {

		const tests = [
			// basic source tests
			{ input:"", options:undefined, expectedSource:`[\\w\\p{L}\\p{N}]`, expectedTestResults:false, expectedExecResults:null },
			{ input:"", options:{quantifier:"+"}, expectedSource:`(?:[\\w\\p{L}\\p{N}])+`, expectedTestResults:false, expectedExecResults:null },
			{ input:"", options:{quantifier:"+",allowDashes:true}, expectedSource:`(?:[\\w\\p{L}\\p{N}\\-])+`, expectedTestResults:false, expectedExecResults:null },
			{ input:"", options:{quantifier:"+",allowDashes:true,allowPeriods:true}, expectedSource:`(?:[\\w\\p{L}\\p{N}\\-\\.])+`, expectedTestResults:false, expectedExecResults:null },

			// basic tests
			{ input:"a1_а-.", options:undefined, expectedSource:`[\\w\\p{L}\\p{N}]`, expectedTestResults:true, expectedExecResults:["a"] },
			{ input:"a1_а-.", options:{quantifier:"{2}"}, expectedSource:`(?:[\\w\\p{L}\\p{N}]){2}`, expectedTestResults:true, expectedExecResults:["a1"] },
			{ input:"a1_а-.", options:{quantifier:"+"}, expectedSource:`(?:[\\w\\p{L}\\p{N}])+`, expectedTestResults:true, expectedExecResults:["a1_а"] },
			{ input:"a1_а-", options:{quantifier:"+",allowDashes:true}, expectedSource:`(?:[\\w\\p{L}\\p{N}\\-])+`, expectedTestResults:true, expectedExecResults:["a1_а-"] },
			{ input:"a1_а-.", options:{quantifier:"+",allowDashes:true,allowPeriods:true}, expectedSource:`(?:[\\w\\p{L}\\p{N}\\-\\.])+`, expectedTestResults:true, expectedExecResults:["a1_а-."] },

			{ input:"Кортез", options:{quantifier:"+"}, expectedSource:`(?:[\\w\\p{L}\\p{N}])+`, expectedTestResults:true, expectedExecResults:["Кортез"] },

			// { input:"", options:{ }, expectedSource:"", expectedTestResults:false, expectedExecResults:[] },
		];

		tests.forEach(({ input, options, expectedSource, expectedTestResults, expectedExecResults }) => {
			describe(`getWordCharacterRegex(${toString(options)})`, () => {

				test(`getWordCharacterRegex(${toString(options)}).source === ${toString(expectedSource)}`, () => {
					expect(getWordCharacterRegex(options).source).toBe(expectedSource);
				});

				test(`getWordCharacterRegex(${toString(options)}).test(${input}) === ${expectedTestResults}`, () => {
					expect(getWordCharacterRegex(options).test(input)).toBe(expectedTestResults);
				});

				test(`getWordCharacterRegex(${toString(options)}).exec(${input}) equals ${toString(expectedExecResults)}`, () => {
					if (expectedExecResults === null) {
						expect(getWordCharacterRegex(options).exec(input)).toBeNull();
					}else {
						// we use String() casting here because the RegExpExecArray doesn't have the same properties as a simple Array
						expect(String(getWordCharacterRegex(options).exec(input))).toBe(String(expectedExecResults));
					}
				});

			});
		});
	});
});