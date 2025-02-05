import { getNumberRegex, toLiteral } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("number", () => {
	describe("getNumberRegex", () => {

		const signTypeTests = [
			{ input:"2", options:{ }, expected:"2" },
			{ input:"-2", options:{ }, expected:"-2" },
			{ input:"+2", options:{ }, expected:"+2" },

			{ input:"2", options:{ sign:"none" }, expected:"2" },
			{ input:"-2", options:{ sign:"none" }, expected:"2" },
			{ input:"+2", options:{ sign:"none" }, expected:"2" },
			{ input:"-2", options:{ sign:"none", anchored:true }, expected:undefined },
			{ input:"+2", options:{ sign:"none", anchored:true }, expected:undefined },

			{ input:"2", options:{ sign:"required" }, expected:undefined },
			{ input:"-2", options:{ sign:"required" }, expected:"-2" },
			{ input:"+2", options:{ sign:"required" }, expected:"+2" },

			{ input:"2.01", options:{ }, expected:"2.01" },
			{ input:"-2.01", options:{ }, expected:"-2.01" },
			{ input:"+2.01", options:{ }, expected:"+2.01" },

			{ input:"2", options:{ type:"decimal" }, expected:undefined },
			{ input:"-2", options:{ type:"decimal" }, expected:undefined },
			{ input:"+2", options:{ type:"decimal" }, expected:undefined },

			{ input:"2.01", options:{ type:"decimal" }, expected:"2.01" },
			{ input:"-2.01", options:{ type:"decimal" }, expected:"-2.01" },
			{ input:"+2.01", options:{ type:"decimal" }, expected:"+2.01" },

			{ input:"2", options:{ type:"integer" }, expected:"2" },
			{ input:"-2", options:{ type:"integer" }, expected:"-2" },
			{ input:"+2", options:{ type:"integer" }, expected:"+2" },

			{ input:"2.01", options:{ type:"integer" }, expected:undefined },
			{ input:"-2.01", options:{ type:"integer" }, expected:undefined },
			{ input:"+2.01", options:{ type:"integer" }, expected:undefined },
		];
		signTypeTests.forEach(({ input, options, expected }) => {
			test(`getNumberRegex(${toLiteral(options)}).exec(${toLiteral(input)})?.[0] === ${toLiteral(expected)}`, () => {
				expect(getNumberRegex(options).exec(input)?.[0]).toBe(expected);
			});
		});

		const values = [
			"2",
			"+2",
			"-2",
			"+2.0",
			"-2.0",
		];

		/** @type {[string, object | undefined, string | undefined][]} [input, options, output] */
		const tests = values.map(value => [
			[value, undefined, value],
			[value, { anchored:true }, value],
			[value, { anchored:false }, value],

			[` ${value} `, undefined, value],
			[` ${value} `, { anchored:true }, undefined],
			[` ${value} `, { anchored:false }, value],

			[value, undefined, value],
			[`||${value}||`, { spoilers:true }, `||${value}||`],
			[`||${value}||`, { spoilers:"optional" }, `||${value}||`],

			[` ||${value}|| `, { anchored:true, spoilers:true }, undefined],
			[` ||${value}|| `, { anchored:false, spoilers:true }, `||${value}||`],
			[` ||${value}|| `, { anchored:false, spoilers:"optional" }, `||${value}||`],
			[` ||${value}|| `, { anchored:true, spoilers:"optional" }, undefined],

			[`||${value}||`, { anchored:true, spoilers:true }, `||${value}||`],
			[`||${value}||`, { anchored:false, spoilers:true }, `||${value}||`],
			[`||${value}||`, { anchored:false, spoilers:"optional" }, `||${value}||`],
			[`||${value}||`, { anchored:true, spoilers:"optional" }, `||${value}||`],

		]).flat(1);

		tests.forEach(([input, options, output]) => {
			test(`getNumberRegex(${toString(options)}).exec(${toString(input)})?.[0] === ${toString(output)}`, () => {
				expect(getNumberRegex(options).exec(input)?.[0]).toBe(output);
			});
		});

		const capture = "num";
		const captureTests = values.map(value => [
			[`${value}`, { capture }, value],
			[`||${value}||`, { capture, spoilers:true }, `||${value}||`],
		]).flat(1);

		captureTests.forEach(([input, options, output]) => {
			test(`getNumberRegex(${toString(options)}).exec(${toString(input)})?.groups?.${capture} === ${toString(output)}`, () => {
				expect(getNumberRegex(options).exec(input)?.groups?.[capture]).toBe(output);
			});
		});

	});
});
