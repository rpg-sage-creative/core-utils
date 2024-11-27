import { parseKeyValueArg } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("args", () => {
	describe("parseKeyValueArg", () => {

		const tests = [
			{ input:`a=b`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
			{ input:`a=b`, options:"a", expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
			{ input:`a=b`, options:{key:"a"}, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
			{ input:`a=b`, options:{key:"A"}, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
			{ input:`a=b`, options:{key:"b"}, expected:null },
			{ input:`a=b`, options:"b", expected:null },
			{ input:`a=b`, options:{mode:"strict"}, expected:null },

			{ input:`a=`, options:undefined, expected:null },
			{ input:`a= `, options:undefined, expected:null },
			{ input:`a= "`, options:undefined, expected:null },
			{ input:`a= b"`, options:undefined, expected:null },
			{ input:`a= b"`, options:{mode:"sloppy"}, expected:null },

			{ input:`a= "''"`, options:undefined, expected:null },
			{ input:`a= "''"`, options:{mode:"sloppy"}, expected:{ key:`a`, keyLower:`a`, value:`''`, clean:`a="''"` } },
			{ input:`a= "''"`, options:{key:"a",mode:"sloppy"}, expected:{ key:`a`, keyLower:`a`, value:`''`, clean:`a="''"` } },
			{ input:`a= "''"`, options:{key:"b",mode:"sloppy"}, expected:null },

			{ input:`a=""`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:``, clean:`a=""` } },
			{ input:`a=''`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:``, clean:`a=""` } },
			{ input:`a="b"`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
			{ input:`a='b'`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`b`, clean:`a="b"` } },
			{ input:`a=$$%$$%$%$`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`$$%$$%$%$`, clean:`a="$$%$$%$%$"` } },
			{ input:`a="$$%$$%$%$"`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`$$%$$%$%$`, clean:`a="$$%$$%$%$"` } },
			{ input:`a='$$%$$%$%$'`, options:undefined, expected:{ key:`a`, keyLower:`a`, value:`$$%$$%$%$`, clean:`a="$$%$$%$%$"` } },
		];
		tests.forEach(({ input, options, expected }) => {
			test(`parseKeyValueArg(${toString(input)}, ${toString(options)})`, () => {
				expect(parseKeyValueArg(input, options)).toStrictEqual(expected);
			});
		});

	});
});
