import { escapeRegex, tagLiterals } from "../../build/index.js";

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
			test(tagLiterals`escapeChar(${char}) === ${escaped}`, () => {
				expect(escapeRegex(char)).toBe(escaped);
			});
			test(tagLiterals`escapeChar(${char}, ${optChar}) === ${escaped}`, () => {
				expect(escapeRegex(char, optChar)).toBe(escaped);
			});
			test(tagLiterals`escapeChar(${char}, ${optFlag}) === ${escaped}`, () => {
				expect(escapeRegex(char, optFlag)).toBe(escaped);
			});
			test(tagLiterals`escapeChar(${char}, ${optBoth}) === ${escaped}`, () => {
				expect(escapeRegex(char, optBoth)).toBe(escaped);
			});
		});

		"-".split("").forEach(char => {
			const escaped = `\\${char}`;
			test(tagLiterals`escapeChar(${char}) === ${char}`, () => {
				expect(escapeRegex(char)).toBe(char);
			});
			test(tagLiterals`escapeChar(${char}, ${optChar}) === ${escaped}`, () => {
				expect(escapeRegex(char, optChar)).toBe(escaped);
			});
			test(tagLiterals`escapeChar(${char}, ${optFlag}) === ${char}`, () => {
				expect(escapeRegex(char, optFlag)).toBe(char);
			});
			test(tagLiterals`escapeChar(${char}, ${optBoth}) === ${escaped}`, () => {
				expect(escapeRegex(char, optBoth)).toBe(escaped);
			});
		});

		"!#%&,:;<=>@`~".split("").forEach(char => {
			const escaped = `\\${char}`;
			test(tagLiterals`escapeChar(${char}) === ${char}`, () => {
				expect(escapeRegex(char)).toBe(char);
			});
			test(tagLiterals`escapeChar(${char}, ${optChar}) === ${char}`, () => {
				expect(escapeRegex(char, optChar)).toBe(char);
			});
			test(tagLiterals`escapeChar(${char}, ${optFlag}) === ${char}`, () => {
				expect(escapeRegex(char, optFlag)).toBe(char);
			});
			test(tagLiterals`escapeChar(${char}, ${optBoth}) === ${escaped}`, () => {
				expect(escapeRegex(char, optBoth)).toBe(escaped);
			});
		});

	});
});
