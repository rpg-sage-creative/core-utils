import { NIL_UUID, isNilUuid, isNonNilUuid, isUuid, orNilUuid, randomUuid } from "../../build/index.js";
import { toString } from "../toString.mjs";

describe("uuid", () => {

	const uuid = randomUuid();

	/** [ [input, isUuidResult, isNilUuidResult, isNonNilUuidResult, orNilUuidResult], ... ]  */
	const tests = [
		[NIL_UUID, true, true, false, NIL_UUID],
		[uuid, true, false, true, uuid],
		["control", false, false, false, NIL_UUID],
	];

	describe("isUuid", () => {
		tests.forEach(([input, isUuidResult, isNilUuidResult, isNonNilUuidResult, orNilUuidResult]) => {
			test(`isUuid(${toString(input)}) === ${toString(isUuidResult)}`, () => {
				expect(isUuid(input)).toBe(isUuidResult);
			});
		});
	});

	describe("isNilUuid", () => {
		tests.forEach(([input, isUuidResult, isNilUuidResult, isNonNilUuidResult, orNilUuidResult]) => {
			test(`isNilUuid(${toString(input)}) === ${toString(isNilUuidResult)}`, () => {
				expect(isNilUuid(input)).toBe(isNilUuidResult);
			});
		});
	});

	describe("isNonNilUuid", () => {
		tests.forEach(([input, isUuidResult, isNilUuidResult, isNonNilUuidResult, orNilUuidResult]) => {
			test(`isNonNilUuid(${toString(input)}) === ${toString(isNonNilUuidResult)}`, () => {
				expect(isNonNilUuid(input)).toBe(isNonNilUuidResult);
			});
		});
	});

	describe("orNilUuid", () => {
		tests.forEach(([input, isUuidResult, isNilUuidResult, isNonNilUuidResult, orNilUuidResult]) => {
			test(`orNilUuid(${toString(input)}) === ${toString(orNilUuidResult)}`, () => {
				expect(orNilUuid(input)).toBe(orNilUuidResult);
			});
		});
	});

});
