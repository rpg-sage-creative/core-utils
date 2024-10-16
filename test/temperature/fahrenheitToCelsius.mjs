import { assert, fahrenheitToCelsius, runTests } from "../../build/index.js";

function assertFtoC({ c, f }) {
	const precision = String(c).split(".")[1]?.length ?? 0;
	const actual = fahrenheitToCelsius(f, precision);
	assert(actual === c, `fahrenheitToCelsius(${f}, ${precision}) === ${c} >> false (${actual})`);
}

runTests(async function test_fahrenheitToCelsius() {
	[
		{ c:-1, f:30.2 },
		{ c:-0.555556, f:31 },
		{ c:0, f:32 },
		{ c:0.555556, f:33 },
		{ c:1, f:33.8 },
		{ c:99, f:210.2 },
		{ c:100, f:212 },
	].forEach(pair => {
		assertFtoC(pair);
	});
}, true);