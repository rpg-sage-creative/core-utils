import { escapeRegex } from "../../build/index.js";

/*

\$, \(, \), \*, \+, \., \/, \?, \[, \\, \], \^, \{, \|, \}: valid everywhere

\-: only valid inside character classes

\!, \#, \%, \&, \,, \:, \;, \<, \=, \>, \@, \`, \~: only valid inside v-mode character classes

*/

describe("regex", () => {
	describe("escapeRegex", () => {

		"$()*+./?[]\\^{}|".split("").forEach(char => {
			const expected = `\\${char}`;
			test(`escapeChar(${toString(char)}) === ${toString(expected)}`, () => {
				expect(escapeRegex(char)).toBe(expected);
			});
		});

	});
});
