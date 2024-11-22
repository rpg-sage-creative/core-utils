import { allToUS, initializeNoiseUS, initializeUKtoUS, oneToUS, reduceNoiseUS } from "../../build/index.js";

describe("language", () => {
	test("oneToUS (uninitialized)", () => expect(oneToUS("colour")).toBe("colour"));
	test("allToUS (uninitialized)", () => expect(allToUS(["colour", "armour", "water"])).toStrictEqual(["colour", "armour", "water"]));

	test("initializeUKtoUS", () => expect(initializeUKtoUS("./data/language/ukToUS.txt")).toBe(1717));

	test("oneToUS (initialized)", () => expect(oneToUS("colour")).toBe("color"));
	test("allToUS (initialized)", () => expect(allToUS(["colour", "armour", "water"])).toStrictEqual(["color", "armor", "water"]));

	const words = "I am a boss of the water and sky".split(" ");
	const reduced = words.filter(s => !["a","and","of","the"].includes(s));

	test("reduceNoiseUS (uninitialized)", () => expect(reduceNoiseUS(words)).toStrictEqual(words));

	test("initializeNoiseUS", () => expect(initializeNoiseUS("./data/language/noiseUS.txt")).toBe(4));

	test("reduceNoiseUS (initialized)", () => expect(reduceNoiseUS(words)).toStrictEqual(reduced));

});
