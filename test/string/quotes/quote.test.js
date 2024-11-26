import { quote } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("quotes", () => {
		describe("quote", () => {
			const tests = [
				{ input:`simple`, style:undefined, expected:`"simple"` },
				{ input:`simple`, style:"double", expected:`"simple"` },
				{ input:`simple`, style:"single", expected:`'simple'` },
				{ input:`simple "with" quotes`, style:undefined, expected:`"simple \\"with\\" quotes"` },
				{ input:`"simple"`, style:undefined, expected:`"\\"simple\\""` },
				{ input:`simple 'with' quotes`, style:"single", expected:`'simple \\'with\\' quotes'` },
				{ input:`'simple'`, style:"single", expected:`'\\'simple\\''` },
				{ input:`sim“”ple`, style:undefined, expected:`"sim“”ple"` },
				{ input:`sim„“ple`, style:undefined, expected:`"sim„“ple"` },
				{ input:`sim''ple`, style:undefined, expected:`"sim''ple"` },
			];
			tests.forEach(({input, style, expected}) => {
				test(`quote(${toString(input)}, ${toString(style)}) === ${toString(expected)}`, () => {
					expect(quote(input, style)).toBe(expected);
				});
			});
		});
	});
});
