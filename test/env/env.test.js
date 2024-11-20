import { getBuildInfo, getCodeName, getDataRoot, getEnvironmentName, getId } from "../../build/index.js";

const hasArgs = process.argv.slice(3).length > 0;

describe("env", () => {

	if (hasArgs) {

		test.todo("add env tests that have args");

	}else {

		test(`getCodeName()`, () => {
			expect(getCodeName).toThrow("Environment Variable Missing: codeName,NODE_ENV");
		});

		test(`getBuildInfo()`, () => {
			expect(getBuildInfo).toThrow();
		});

		test(`getDataRoot()`, () => {
			expect(getDataRoot).toThrow("Environment Variable Missing: dataRoot");
		});

		test(`getEnvironmentName()`, () => {
			expect(getEnvironmentName).toThrow("Environment Variable Missing: codeName,NODE_ENV");
		});

		const idKeys = [
			"homeServer",
			"rollem",
			"superAdmin",
			"superUser",
			"tupperBox",
			"Map",
		];

		idKeys.forEach(idKey => {
			test(`getId()`, () => {
				expect(() => getId(idKey)).toThrow(`Environment Variable Missing: ${idKey}`);
			});
		});

	}

});
