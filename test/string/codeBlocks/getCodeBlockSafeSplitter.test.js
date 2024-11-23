import { getCodeBlockSafeSplitter } from "../../../build/index.js";
import { toString } from "../../toString.mjs";

describe("string", () => {
	describe("getCodeBlockSafeSplitter", () => {

		// const splitter = getCodeBlockSafeSplitter(/\n/);
		const splitter = getCodeBlockSafeSplitter("\n");

		/** @type {[string, number | string[], string[] | undefined][]} */
		const strings = [
			["first\nsecond\nthird\nfourth\nfifth", 3, ["first","second","third"]],
			["\n\n\n\n", ["","","","",""]],
			["only", ["only"]],
			["\nsecond", ["","second"]],
			["first\nsecond",["first","second"]],
			["first\n\nthird",["first","","third"]],
			["start `left\nright` end", ["start `left\nright` end"]],
			["first\n`left\nright`\nthird",["first","`left\nright`","third"]],
			["first\n``left\nright``\nthird",["first","``left\nright``","third"]],
			["first\n```left\nright```\nthird",["first","```left\nright```","third"]],
			["first\n``left`\nright``\nthird",["first","``left`\nright``","third"]],
			["fir``st\n`left\nright``\nthird",["fir``st\n`left\nright``","third"]],
			[";\n`jk\nl;kj\n`\nj`\nkj;`\njk`\njk;`\nk;lj`k\n;`;\njkl`\n",[";","`jk\nl;kj\n`","j`\nkj;`","jk`\njk;`","k;lj`k\n;`;","jkl`",""]],
			["pc::Well?\n`hoobla::What?`\ngm::...and `there\nthey` waited ...",["pc::Well?","`hoobla::What?`","gm::...and `there\nthey` waited ..."]],
		];
		strings.forEach(([raw, limitOrExpected, expectedOrUndefined]) => {
			const limit = typeof(limitOrExpected) === "number" ? limitOrExpected : undefined;
			/** @type {string[]} */
			const expected = expectedOrUndefined ?? limitOrExpected ?? [];
			// const actual = raw.split(splitter, limit);
			// assert(expected.length === actual.length && expected.every((s, i) => actual[i] === s), `"${raw.replace(/\n/g, "\\n")}"${limit===undefined?"":`(${limit})`} expected ${JSON.stringify(expected)} got ${JSON.stringify(actual)}`)
			test(`raw.split(${toString(splitter)}, ${toString(limit)}) === ${toString(expected)}`, () => {
				expect(raw.split(splitter, limit)).toStrictEqual(expected);
			});
		});

	});
});
