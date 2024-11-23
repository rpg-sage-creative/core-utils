import { jest } from "@jest/globals";
import { forEach, getLogger } from "../../build/index.js";

const debug = jest.spyOn(getLogger(), "debug");
const verbose = jest.spyOn(getLogger(), "verbose");

afterEach(() => {
	// restore the spy created with spyOn
	jest.restoreAllMocks();
});

describe("progress", () => {

	test("PercentLogger (empty handler)", () => {
		const array = new Array(100);
		array.fill(1);
		forEach("forEach", array, () => { });
		expect(verbose).toHaveBeenCalledTimes(11);
	});

	test("PercentLogger (log handler)", () => {
		const array = new Array(100);
		array.fill(1);
		forEach("forEach", array, debug);
		expect(debug).toHaveBeenCalledTimes(100);
		expect(verbose).toHaveBeenCalledTimes(11);
	});

});
