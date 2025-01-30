import { uncache, stringifyJson } from "../../build/index.js";

const toString = value => stringifyJson(value);

describe("cache", () => {
	describe("uncache", () => {

		const tests = [
			[{ a:"A", b:"B", c:new Set(["A","B"]) }, undefined, { a:"A", b:"B", c:new Set() }],
			[{ a:"A", b:"B", c:new Set(["A","B"]) }, { nullify:true }, { a:null, b:null, c:null }],
			[{ a:"A", b:"B", c:new Set(["A","B"]) }, { undefine:true }, { }],
		];

		tests.forEach(([input, args, output]) => {
			test(`uncache(${toString(input)}, ${toString(args)}) equals ${toString(output)}`, () => {
				const ret = uncache(input, args);
				expect(ret).toBe(args?.undefine ? undefined : null);
				expect(input).toEqual(output);
			});
		});
	});
});
