import { ArgsManager } from "../../build/index.js";
// import { toString } from "../toString.mjs";

describe("args", () => {
	describe("ArgsManager", () => {

		test(`new ArgsManager("one", "two=too", 'three="tree"');`, () => {
			const args = new ArgsManager("one", "two=too", 'three="tree"');
			expect(args.length).toBe(3);
			expect(args.first()).toBe("one");
			expect(args.removeKeyValuePair("two")?.value).toBe("too");
			expect(args.removeKeyValuePair("three")?.value).toBe("tree");
			expect(args.removeKeyValuePair("four")?.value).toBe(undefined);
		});

	});
});