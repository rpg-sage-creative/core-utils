import { redactCodeBlocks } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("redactCodeBlocks", () => {

		const tests = [
			//   input                          expected output
			[" hi `redacted` no `shit` ",   " hi `********` no `****` "],
			[" \\`notredacted\\` `hi` go ", " \\`notredacted\\` `**` go "],
			["`0` ``redacted`` \\`9`",      "`*` ``********`` \\`9`"],
			[" \\``redacted`\\` ",          " \\``********`\\` "],
			[" `\\`redacted\\`` ",          " `************` "],
			[" ```redacted``` ",            " ```********``` "],
			[" ```redacted\nredacted``` ",  " ```*****************``` "],
			[" \\```redacted``\\` ",        " \\```********``\\` "],
			[" `\\``notredacted`\\`` ",     " `**`notredacted`**` "],
			[" \\``\\`redacted``\\` ",      " \\``**********``\\` "],
			[" \\``\\`redacted``\\` ",      " \\``**********``\\` "],
		];
		tests.forEach(([input, expected]) => {
			test(`redactCodeBlocks(${toString(input)}) === ${toString(expected)}`, () => {
				expect(redactCodeBlocks(input)).toBe(expected);
			});
		});

	});
});
