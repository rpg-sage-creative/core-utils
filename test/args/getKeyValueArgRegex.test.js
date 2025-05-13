import { getKeyValueArgRegex, toLiteral } from "../../build/index.js";

describe("args", () => {
	describe("getKeyValueArgRegex", () => {

		describe("flag/cache tests", () => {
			const flagCacheTests = [
				{ options:undefined, flags:"iv" },
				{ options:{mode:"strict"}, flags:"iu" },
				{ options:{mode:"sloppy"}, flags:"iv" },
				{ options:{gFlag:"g"}, flags:"giv" },
				{ options:{gFlag:"g",mode:"strict"}, flags:"giu" },
				{ options:{gFlag:"g",mode:"sloppy"}, flags:"giv" },
				{ options:{capture:"arg"}, flags:"iv" },
				{ options:{capture:"arg",mode:"strict"}, flags:"iu" },
				{ options:{capture:"arg",mode:"sloppy"}, flags:"iv" },
			];
			flagCacheTests.forEach(({ options, flags }) => {
				test(`getKeyValueArgRegex(${toLiteral(options)})`, () => {
					const regexp = getKeyValueArgRegex(options);
					// compare flags to expected
					expect(regexp.flags).toBe(String(flags));
					if (options?.gFlag === "g") {
						const regexp2 = getKeyValueArgRegex(options);
						// make sure we DO NOT have a cached value
						expect(regexp2).not.toBe(regexp);
						// make sure they are the same signature
						expect(toLiteral(regexp2)).toBe(toLiteral(regexp));
					}else {
						// make sure we DO have a cached value
						expect(getKeyValueArgRegex(options)).toBe(regexp);
					}
				});
			});
		});

		describe("capture tests", () => {
			const input = `sloppyKey= "sloppy value" defaultKey=defaultValue nakedSloppyKey = nakedSloppyValue strictKey="strict value"`;
			const tests = [
				{ options:undefined, groups:undefined },
				{ options:{capture:"kva"}, groups:{ kva:`defaultKey=defaultValue` } },
				{ options:{capture:"kva",mode:"strict"}, groups:{ kva:`strictKey="strict value"`} },
				{ options:{capture:"kva",mode:"sloppy"}, groups:{ kva:`sloppyKey= "sloppy value"` } },
				{ options:{capture:"kva",key:"nakeySloppyKey",mode:"sloppy"}, groups:undefined },
			];
			tests.forEach(({ options, groups }) => {
				test(`getKeyValueArgRegex(${toLiteral(options)})`, () => {
					const regexp = getKeyValueArgRegex(options);
					const match = regexp.exec(input);
					expect(match?.groups).toEqual(groups);
				});
			});
		});

		// test the beginning and end boundaries
		describe("basic boundary tests", () => {
			const inputs = [
				`key1=value1 dot.dash-6="value 6"`,
				`dot.dash-6="value 6" key1=value1`,
			];
			inputs.forEach(input => {
				const tests = [
					{ options:undefined, expected:[`key1=value1`] },
					{ options:{key:"dot.dash-6"}, expected:[`dot.dash-6="value 6"`] },
				];
				tests.forEach(({options, expected }) => {
					test(`getKeyValueArgRegex(${toLiteral(options)}).exec(${toLiteral(input)}) equals ${toLiteral(expected)}`, () => {
						const regexp = getKeyValueArgRegex(options);
						expect(regexp.test(input)).toBe(true);
						expect(String(regexp.exec(input))).toBe(String(expected));
					});
				});
			});
		});

		describe("range errors", () => {
			const tests = [
				{ options:{mode:"sloppy",key:`her"is`}, expected:null },
				{ options:{mode:"sloppy",key:`"together"is`}, expected:null },
				{ options:{mode:"sloppy",key:`together"is`}, expected:null },
				{ options:{mode:"sloppy",key:`together,is`}, expected:null },
			];
			tests.forEach(({options }) => {
				test(`getKeyValueArgRegex(${toLiteral(options)}) should throw`, () => {
					expect(() => getKeyValueArgRegex(options)).toThrow(`Invalid keyValueArg key`);
				});
			});
		});

		describe("default tests", () => {
			const input = `key1=value1 key_2=‘value\n2’ dot.4="value 4" dash-5="value 5" mashed="together"is=bad dot.dash-6="value 6"`;
			const tests = [
				{ options:undefined, expected:[`key1=value1`] },
				{ options:{key:"key1"}, expected:[`key1=value1`] },
				{ options:{key:"key_2"}, expected:[`key_2=‘value\n2’`] },
				{ options:{key:"dot.dash-6"}, expected:[`dot.dash-6="value 6"`] },
				{ options:{key:"dash-6"}, expected:null },
				{ options:{key:"-6"}, expected:null },
				{ options:{key:"6"}, expected:null },
				{ options:{key:"mashed"}, expected:null },
				{ options:{key:"is"}, expected:null },
			];
			tests.forEach(({options, expected }) => {
				test(`getKeyValueArgRegex(${toLiteral(options)}).exec()`, () => {
					const regexp = getKeyValueArgRegex(options);
					expect(regexp.test(input)).toBe(!!expected);
					expect(String(regexp.exec(input))).toBe(String(expected));
				});
			});
		});

		describe("sloppy tests", () => {
			const input = `input: prefix  key1=value1  strict2="value2"what single='' curly=‘single’ fancy=“double”  space3 = "value3" mashed="together"is=bad  dot.4="value 4"  dash-5="value 5"  dot.dash-6="value 6" suffix`;
			const tests = [
				{ options:{mode:"sloppy",key:`strict2`}, expected:[`strict2="value2"`] },
				{ options:{mode:"sloppy",key:`mashed`}, expected:[`mashed="together"`] },
				{ options:{mode:"sloppy",key:`is`}, expected:[`is=bad`] },
				{ options:{mode:"sloppy",key:`shed`}, expected:null },
				{ options:{mode:"sloppy",key:"dash-6"}, expected:null },
				{ options:{mode:"sloppy",key:"-6"}, expected:null },
				{ options:{mode:"sloppy",key:"6"}, expected:null },
				{ options:{gFlag:"g",mode:"sloppy"}, expected:[`key1=value1`,`strict2="value2"`,`single=''`,`curly=‘single’`,`fancy=“double”`,`space3 = "value3"`,`mashed="together"`,`is=bad`] },
			];
			tests.forEach(({options, expected }) => {
				test(`getKeyValueArgRegex(${toLiteral(options)}).exec()`, () => {
					const regexp = getKeyValueArgRegex(options);
					expect(regexp.test(input)).toBe(!!expected);
					if (options?.gFlag==="g") {
						expect(String(input.match(getKeyValueArgRegex(options)))).toBe(String(expected));
					}else {
						expect(String(regexp.exec(input))).toBe(String(expected));
					}
				});
			});
		});

		describe("global tests", () => {
			const input = `input: prefix \n key0=val\nue0 key1=value1  \rstrict2="value2"\n single='' curly=‘single’ fancy=“double”  space3 = "value3" mashed="together"is=bad  dot.4="value 4" a.b="c"d  dash-5="value 5"  dot.dash-6="value 6" suffix`;
			const tests = [
				// { options:undefined, expected:null },
				{ options:{gFlag:"g"}, expected:[`key0=val`,`key1=value1`,`strict2="value2"`,`single=''`,`curly=‘single’`,`fancy=“double”`] },
				{ options:{gFlag:"g",mode:"strict"}, expected:[`strict2="value2"`,`single=''`,`curly=‘single’`,`fancy=“double”`] },
				{ options:{gFlag:"g",allowDashes:true}, expected:[`key0=val`,`key1=value1`,`strict2="value2"`,`single=''`,`curly=‘single’`,`fancy=“double”`,`dash-5="value 5"`] },
				{ options:{gFlag:"g",allowPeriods:true}, expected:[`key0=val`,`key1=value1`,`strict2="value2"`,`single=''`,`curly=‘single’`,`fancy=“double”`,`dot.4="value 4"`] },
				{ options:{gFlag:"g",allowDashes:true,allowPeriods:true}, expected:[`key0=val`,`key1=value1`,`strict2="value2"`,`single=''`,`curly=‘single’`,`fancy=“double”`,`dot.4="value 4"`,`dash-5="value 5"`,`dot.dash-6="value 6"`] },
				{ options:{gFlag:"g",style:"strict"}, expected:[`strict2="value2"`,`single=''`] },
				{ options:{gFlag:"g",style:"double"}, expected:[`strict2="value2"`,`fancy=“double”`] },
				{ options:{gFlag:"g",style:"double"}, expected:[`strict2="value2"`,`fancy=“double”`] },
			];
			tests.forEach(({options, expected }) => {
				test(`getKeyValueArgRegex(${toLiteral(options)}).exec()`, () => {
					// make sure that string.match returns the array we are expecting
					expect(String(input.match(getKeyValueArgRegex(options)))).toBe(String(expected));
					// make sure that regexp.exec matches each result of the expected array
					const regexp = getKeyValueArgRegex(options);
					while (expected.length) {
						const match = regexp.exec(input);
						expect(String(match)).toBe(String([expected.shift()]));
					}
				});
			});
		});

		describe("nested tests", () => {
			const tests = [
				// { options:{anhcored:true}, input:``, expected:false },
				{ options:{anhcored:true}, input:`key="\\"quoted \\"value\\"\\""`, expected:true },
			];
			tests.forEach(({ options, input, expected }) => {
				test(`getKeyValueArgRegex(${toLiteral(options)}).test(${toLiteral(input)}) === ${expected}`, () => {
					expect(getKeyValueArgRegex(options).test(input)).toBe(expected);
				});
			});
		});
	});
});