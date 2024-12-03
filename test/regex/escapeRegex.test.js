import { escapeRegex } from "../../build/index.js";
import { toString } from "../toString.mjs";
/*

\$, \(, \), \*, \+, \., \/, \?, \[, \\, \], \^, \{, \|, \}: valid everywhere

\-: only valid inside character classes

\!, \#, \%, \&, \,, \:, \;, \<, \=, \>, \@, \`, \~: only valid inside v-mode character classes

*/

describe("regex", () => {
	describe("escapeRegex", () => {

		const optChar = { charClass:true };
		const optFlag = { vFlag:"v" };
		const optBoth = { charClass:true, vFlag:"v" };

		"$()*+./?[]\\^{}|".split("").forEach(char => {
			const escaped = `\\${char}`;
			test(`escapeChar(${toString(char)}) === ${toString(escaped)}`, () => {
				expect(escapeRegex(char)).toBe(escaped);
			});
			test(`escapeChar(${toString(char)}, ${toString(optChar)}) === ${toString(escaped)}`, () => {
				expect(escapeRegex(char, optChar)).toBe(escaped);
			});
			test(`escapeChar(${toString(char)}, ${toString(optFlag)}) === ${toString(escaped)}`, () => {
				expect(escapeRegex(char, optFlag)).toBe(escaped);
			});
			test(`escapeChar(${toString(char)}, ${toString(optBoth)}) === ${toString(escaped)}`, () => {
				expect(escapeRegex(char, optBoth)).toBe(escaped);
			});
		});

		"-".split("").forEach(char => {
			const escaped = `\\${char}`;
			test(`escapeChar(${toString(char)}) === ${toString(char)}`, () => {
				expect(escapeRegex(char)).toBe(char);
			});
			test(`escapeChar(${toString(char)}, ${toString(optChar)}) === ${toString(escaped)}`, () => {
				expect(escapeRegex(char, optChar)).toBe(escaped);
			});
			test(`escapeChar(${toString(char)}, ${toString(optFlag)}) === ${toString(char)}`, () => {
				expect(escapeRegex(char, optFlag)).toBe(char);
			});
			test(`escapeChar(${toString(char)}, ${toString(optBoth)}) === ${toString(escaped)}`, () => {
				expect(escapeRegex(char, optBoth)).toBe(escaped);
			});
		});

		"!#%&,:;<=>@`~".split("").forEach(char => {
			const escaped = `\\${char}`;
			test(`escapeChar(${toString(char)}) === ${toString(char)}`, () => {
				expect(escapeRegex(char)).toBe(char);
			});
			test(`escapeChar(${toString(char)}, ${toString(optChar)}) === ${toString(char)}`, () => {
				expect(escapeRegex(char, optChar)).toBe(char);
			});
			test(`escapeChar(${toString(char)}, ${toString(optFlag)}) === ${toString(char)}`, () => {
				expect(escapeRegex(char, optFlag)).toBe(char);
			});
			test(`escapeChar(${toString(char)}, ${toString(optBoth)}) === ${toString(escaped)}`, () => {
				expect(escapeRegex(char, optBoth)).toBe(escaped);
			});
		});

	});
});
