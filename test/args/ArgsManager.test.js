import { ArgsManager } from "../../build/index.js";
// import { toString } from "../toString.mjs";

describe("args", () => {
	describe("ArgsManager", () => {

		test(`new ArgsManager("one", "two=too", 'three="tree"', "--test", "hp+=5", "dying--");`, () => {
			const args = new ArgsManager("one", "two=too", 'three="tree"', "--test", "hp+=5", "dying--");
			expect(args.length).toBe(6);
			expect(args.first()).toBe("one");
			expect(args.valueArgs()[0]?.isValue).toBe(true);
			expect(args.valueArgs()[0]?.index).toBe(0);
			expect(args.keyValueArgs()[0]?.isKeyValue).toBe(true);
			expect(args.keyValueArgs()[0]?.index).toBe(1);
			expect(args.flagArgs()[0]?.isFlag).toBe(true);
			expect(args.flagArgs()[0]?.index).toBe(3);
			expect(args.flagArgs()[0]?.key).toBe("test");
			expect(args.incrementArgs()[0].isIncrement).toBe(true);
			expect(args.incrementArgs()[0].index).toBe(4);
			expect(args.incrementArgs()[0].key).toBe("hp");
			expect(args.incrementArgs()[0].operator).toBe("+");
			expect(args.incrementArgs()[0].value).toBe("5");
			expect(args.incrementArgs()[1].isIncrement).toBe(true);
			expect(args.incrementArgs()[1].index).toBe(5);
			expect(args.incrementArgs()[1].key).toBe("dying");
			expect(args.incrementArgs()[1].operator).toBe("-");
			expect(args.incrementArgs()[1].value).toBe("1");
			// expect(args.removeKeyValuePair("two")?.value).toBe("too");
			// expect(args.removeKeyValuePair("three")?.value).toBe("tree");
			// expect(args.removeKeyValuePair("four")?.value).toBe(undefined);
		});

	});
});