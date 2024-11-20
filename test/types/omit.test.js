import { omit } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("types", () => {
	describe("omit", () => {

		const A = { a:"A" };
		const B = { b:"B" };
		const AB = { a:"A", b:"B" };
		const ABC = { a:"A", b:"B", c:"C" };

		/** [ [input, [arg, ...], output], ... ] */
		const tests = [
			[A, ["b"], A],
			[B, ["a"], B],
			[AB, ["a"], B],
			[ABC, ["c"], AB],
			[ABC, ["a", "c"], B],
			[ABC, ["a", "b", "c"], {}],
			[null, [null], null],
			[undefined, [], undefined],
		];
		tests.forEach(([input, args, output]) => {
			test(`omit(${toString(input)}, ...${toString(args)}) === ${toString(output)}`, () => {
				if (output === null || output === undefined) {
					expect(omit(input, ...args)).toBe(output);
				}else {
					expect(omit(input, ...args)).toEqual(output);
				}
			});
		});
	});
});
