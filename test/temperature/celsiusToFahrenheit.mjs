import { assert, celsiusToFahrenheit, runTests } from "../../build/index.js";

function assertCtoF({ c, f }) {
	const precision = String(f).split(".")[1]?.length;
	const actual = celsiusToFahrenheit(c, precision);
	assert(actual === f, `celsiusToFahrenheit(${c}, ${precision}) === ${f} >> false (${actual})`);
}

runTests(async function test_celsiusToFahrenheit() {
	[
		{ c:-1, f:30.2 },
		{ c:-0.555556, f:31 },
		{ c:0, f:32 },
		{ c:0.555556, f:33 },
		{ c:1, f:33.8 },
		{ c:99, f:210.2 },
		{ c:100, f:212 },
	].forEach(pair => {
		assertCtoF(pair);
	});
}, true);