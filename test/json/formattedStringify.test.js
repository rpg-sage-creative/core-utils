import { formattedStringify } from "../../build/index.js";

describe("json", () => {
	describe("formattedStringify", () => {

		test(`simple single line output`, () => {
			const input = { "one": "One", "two": 2 };
			const output = `{ "one": "One", "two": 2 }`;
			expect(formattedStringify(input)).toBe(output);
		});

		test(`simple multiline output`, () => {
			const input = { "one": "One", "two": [ 2, 3, 4 ] };
			const output = `{
	"one": "One",
	"two": [ 2, 3, 4 ]
}`;
			expect(formattedStringify(input)).toBe(output);
		});

		test(`simple multiline output`, () => {
			const input = { "one": "One", "two": [ "2", "3", "4" ] };
			const output = `{
	"one": "One",
	"two": [ "2", "3", "4" ]
}`;
			expect(formattedStringify(input)).toBe(output);
		});

		test(`multiline output`, () => {
			const input = { "one": "One", "two": [ "2", { "three": [ 3 ] }, 4 ] };
			const output = `{
	"one": "One",
	"two": [
		"2",
		{
			"three": [ 3 ]
		},
		4
	]
}`;
			expect(formattedStringify(input)).toBe(output);
		});

		test(`multiline output`, () => {
			const input = { "one": "One", "two": [ "2", { "three": [ 3 ] } ], "four": "4" };
			const output = `{
	"one": "One",
	"two": [
		"2",
		{
			"three": [ 3 ]
		}
	],
	"four": "4"
}`;
			expect(formattedStringify(input)).toBe(output);
		});

	});
});