import { parse, stringify, assert, runTests } from "../../build/index.js";

runTests(async function test_parseStringify() {
	[
		// simple bigint
		[1n, JSON.stringify({ $bigint:"1" })],
		// bigint as property
		[{ a:"Apple", b:1n }, JSON.stringify({ a:"Apple", b:{ $bigint:"1" } })],
		// array of bigint
		[[1n, 2n, 3n], JSON.stringify([{ $bigint:"1" }, { $bigint:"2" }, { $bigint:"3" }])],

		// make sure an object with $bigint isn't parsed
		[{ a:"Apple", $bigint:"1" }, JSON.stringify({ a:"Apple", $bigint:"1" })],
	]
	.forEach(([object, string]) => {
		const stringified = stringify(object);
		assert(string, stringify, object);
		assert(object, parse, stringified);
	});
}, true);