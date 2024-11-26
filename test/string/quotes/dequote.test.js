import { dequote } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("dequote", () => {

		const tests = [
			{ input:``, style:undefined, expected:`` },
			{ input:` '‘"“„ `, style:undefined, expected:` '‘"“„ ` },

			{ input:`"'‘“„"`, style:undefined, expected:`'‘“„` },
			{ input:`" he said \\"boo\\" "`, style:undefined, expected:` he said \\"boo\\" ` },

			{ input:` 'normal single' `, style:undefined, expected:` 'normal single' ` },
			{ input:` ‘fancy single’ `, style:undefined, expected:` ‘fancy single’ ` },
			{ input:` "normal double" `, style:undefined, expected:` "normal double" ` },
			{ input:` “fancy double” `, style:undefined, expected:` “fancy double” ` },
			{ input:` „extended double“ `, style:undefined, expected:` „extended double“ ` },
			{ input:` „extended double” `, style:undefined, expected:` „extended double” ` },

			{ input:`'normal single'`, style:undefined, expected:`normal single` },
			{ input:`‘fancy single’`, style:undefined, expected:`fancy single` },
			{ input:`"normal double"`, style:undefined, expected:`normal double` },
			{ input:`“fancy double”`, style:undefined, expected:`fancy double` },
			{ input:`„extended double“`, style:undefined, expected:`extended double` },
			{ input:`„extended double”`, style:undefined, expected:`extended double` },
			{ input:`«arrow double»`, style:undefined, expected:`arrow double` },
			{ input:`»arrow double«`, style:undefined, expected:`arrow double` },

			{ input:`"normal double"`, style:"double", expected:`normal double` },
			{ input:`"normal double"`, style:"single", expected:`"normal double"` },

			{ input:`“fancy double”`, style:"double", expected:`fancy double` },
			{ input:`“fancy double”`, style:"strict", expected:`“fancy double”` },
			{ input:`“fancy double”`, style:"fancy", expected:`fancy double` },

			{ input:`'normal single'`, style:"double", expected:`'normal single'` },
			{ input:`'normal single'`, style:"single", expected:`normal single` },

			// { input:``, style:undefined, expected:false },
		];

		tests.forEach(({ input, style, expected }) => {

			test(`dequote(${toString(input)}, ${toString(style)}) === ${expected}`, () => {
				expect(dequote(input, style)).toBe(expected);
			});

		});

	});
});