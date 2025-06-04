import { ArgsManager, tagLiterals } from "../../build/index.js";

describe("args", () => {
	describe("ArgsManager", () => {

		const testEnum = { First:0, NotFirst:1, "0":"First", "1":"NotFirst" };

		const raw = ["first", "two=too", 'three="tree"', "--test", "hp+=5", "", `""`, "NOTFIRST", "dying--"];

		test(tagLiterals`new ArgsManager(${raw});`, () => {
			const args = new ArgsManager(raw);
			expect(args.length).toBe(9);
			expect(args.raw().shift()).toBe("first");
			expect(args.raw().pop()).toBe("dying--");
			expect(args.args().shift()?.isFlag).toBeUndefined();
			expect(args.args().shift()?.isValue).toBe(true);
			expect(args.valueArgs()[0]?.isValue).toBe(true);
			expect(args.valueArgs()[0]?.index).toBe(0);
			expect(args.valueArgs()[1]?.isValue).toBe(true);
			expect(args.valueArgs()[1]?.index).toBe(5);
			expect(args.valueArgs()[1]?.value).toBeNull();
			expect(args.valueArgs()[2]?.value).toBe("");
			expect(args.keyValueArgs()[0]?.isKeyValue).toBe(true);
			expect(args.keyValueArgs()[0]?.index).toBe(1);
			expect(args.keyValueArgs("TWo").length).toBe(1);
			expect(args.keyValueArgs("TwO", "thREe").length).toBe(2);
			expect(args.flagArgs().shift()?.isFlag).toBe(true);
			expect(args.flagArgs().pop()?.index).toBe(3);
			expect(args.flagArgs()[0]?.key).toBe("test");
			expect(args.incrementArgs().shift().isIncrement).toBe(true);
			expect(args.incrementArgs()[0].index).toBe(4);
			expect(args.incrementArgs()[0].key).toBe("hp");
			expect(args.incrementArgs()[0].operator).toBe("+");
			expect(args.incrementArgs()[0].value).toBe("5");
			expect(args.incrementArgs().pop().isIncrement).toBe(true);
			expect(args.incrementArgs()[1].index).toBe(8);
			expect(args.incrementArgs()[1].key).toBe("dying");
			expect(args.incrementArgs()[1].operator).toBe("-");
			expect(args.incrementArgs()[1].value).toBe("1");
			expect(args.enumValues(testEnum)).toStrictEqual([0,1]);
			// expect(args.removeKeyValuePair("two")?.value).toBe("too");
			// expect(args.removeKeyValuePair("three")?.value).toBe("tree");
			// expect(args.removeKeyValuePair("four")?.value).toBe(undefined);
		});

	});
});