import { sortPrimitive } from "../../../build/index.js";
import { isDate } from "node:util/types";
describe("array", () => {
	describe("sort", () => {
		describe("sortPrimitive", () => {
			// previous tests created the numeric date values directly as numbers; this avoids TZ issues when testing
			const date = 283334400000;
			const DATE = new Date(date);
			expect(DATE.getTime()).toBe(date);
			const date_1 = date + 1;
			const DATE_1 = new Date(date_1);
			expect(DATE_1.getTime()).toBe(date_1);

			const getInput = () => [2, 1, null, "2", true, null, undefined, 2, null, "1", 1, false, true];
			const getDatesInput = () => [date_1, DATE, date, DATE_1, DATE];
			const getMixedInput = () => getInput().concat(getDatesInput());

			// due to an issue in the GitHubAction workflow, expect(input).toStrictEqual(expected) is having issues with Date values
			const expectArray = (input, expected) => {
				expect(input.length).toBe(expected.length);
				input.forEach((value, index) => {
					const other = expected[index];
					if (isDate(value) && isDate(other)) {
						expect(value.getTime()).toBe(other.getTime());
					}else {
						expect(value).toBe(other);
					}
				});
			};

			test(`sortPrimitive`, () => {
				const input = getInput();
				const expected = [false, true, true, 1, 1, "1", 2, 2, "2", null, null, null, undefined];
				expect(input).not.toStrictEqual(expected);
				input.sort(sortPrimitive);
				expectArray(input, expected);
			});

			test(`sortPrimitive() (reversed)`, () => {
				const input = getInput();
				const expected = [undefined, null, null, null, "2", 2, 2, "1", 1, 1, true, true, false];
				expect(input).not.toStrictEqual(expected);
				input.sort(sortPrimitive).reverse();
				expectArray(input, expected);
			});

			test(`sortPrimitive (dates)`, () => {
				const input = getDatesInput();
				const expected = [DATE, DATE, date, DATE_1, date_1];
				expect(input).not.toStrictEqual(expected);
				input.sort(sortPrimitive);
				expectArray(input, expected);
			});

			test(`sortPrimitive (reversed dates)`, () => {
				const input = getDatesInput();
				const expected = [date_1, DATE_1, date, DATE, DATE];
				expect(input).not.toStrictEqual(expected);
				input.sort(sortPrimitive).reverse();
				expectArray(input, expected);
			});

			test(`sortPrimitive (mixed)`, () => {
				const input = getMixedInput();
				const expected = [false, true, true, 1, 1, "1", 2, 2, "2", DATE, DATE, date, DATE_1, date_1, null, null, null, undefined];
				expect(input).not.toStrictEqual(expected);
				input.sort(sortPrimitive);
				expectArray(input, expected);
			});

			test(`sortPrimitive (reversed mixed)`, () => {
				const input = getMixedInput();
				const expected = [undefined, null, null, null, date_1, DATE_1, date, DATE, DATE, "2", 2, 2, "1", 1, 1, true, true, false];
				expect(input).not.toStrictEqual(expected);
				input.sort(sortPrimitive).reverse();
				expectArray(input, expected);
			});

			test(`sortPrimitive (single value)`, () => {
				const input = [false];
				const expected = [false];
				input.sort(sortPrimitive).reverse();
				expectArray(input, expected);
			});

			test(`sortPrimitive (empty array)`, () => {
				const input = [];
				const expected = [];
				input.sort(sortPrimitive).reverse();
				expectArray(input, expected);
			});
		});
	});
});