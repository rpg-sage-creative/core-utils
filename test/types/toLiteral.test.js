import { toLiteral } from "../../build/index.js";

describe("types", () => {
	describe("toLiteral", () => {

		const date = new Date();

		const tests = [
			{ input:/regexp/i, expected:`/regexp/i` },
			{ input:date, expected:`Date("${date.toISOString()}")` },
			{ input:["a",1], expected:`["a",1]` },
			{ input:new Set([1,1,2]), expected:`Set([1,2])` },
			{ input:new Map([["a","b"],["c","d"]]), expected:`Map([[\"a\",\"b\"],[\"c\",\"d\"]])` },
			{ input:["a",1,{a:"b"},/r/i], expected:`["a",1,{"a":"b"},/r/i]` },
			{ input:{a:"b"}, expected:`{"a":"b"}` },
			{ input:{a:"b",b:0n}, expected:`{"a":"b","b":0n}` },
			{ input:{a:/regexp/i}, expected:`{"a":/regexp/i}` },
			{ input:0, expected:`0` },
			{ input:NaN, expected:`NaN` },
			{ input:0n, expected:`0n` },
			{ input:true, expected:`true` },
			{ input:false, expected:`false` },
			{ input:"", expected:`""` },
			{ input:undefined, expected:`undefined` },
			{ input:null, expected:`null` },
		];

		tests.forEach(({ input, expected }) => {
			test(`toLiteral(${toLiteral(input)}) === ${expected}`, () => {
				expect(toLiteral(input)).toStrictEqual(expected);
			});
		});

	});
});