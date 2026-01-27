import { getBuildInfo, getCodeName, getDataRoot, getEnvironmentName, getId, getIds, tagLiterals } from "../../build/index.js";

const hasArgs = process.argv.slice(3).length > 0;

describe("env", () => {
	describe("getBuildInfo", () => {

		test(`getBuildInfo()`, async () => {
			const buildInfo = await getBuildInfo();
			expect(buildInfo).toBeDefined();
			expect(buildInfo.name).toBe("@rpg-sage-creative/core-utils");
		});

	});
});
