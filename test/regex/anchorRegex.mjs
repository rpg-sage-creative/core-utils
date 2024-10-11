import { regex } from "regex";
import { info, assert, runTests, anchorRegex } from "../../build/index.js";

runTests(function test_anchorRegex() {
	const anchor = regexp => ({ expected:`^(?:${regexp.source})$`, anchored:anchorRegex(regexp) });
	const regexps = [
		/simple/,
		/simple/g,
		/simple/i,
		/simple/gi,
		/simple/ig,
		/a[bc]d?/,
	];
	regexps.forEach(regexp => {
		const { expected, anchored } = anchor(regexp);
		const anchoredFlagsWithoutU = anchored.flags.replace(/u/, "");
		assert(anchored.source === expected, `"${anchored.source}" !== "${expected}"`);
		assert(anchoredFlagsWithoutU === regexp.flags, `"${anchoredFlagsWithoutU}" !== "${regexp.flags}"`);
	});

	const regexes = [
		regex`simple`,
		regex("g")`simple`,
		regex("i")`simple`,
		regex("gi")`simple`,
		regex("ig")`simple`,
		regex`a[bc]d?`,
	];
	regexes.forEach(regexp => {
		const { expected, anchored } = anchor(regexp);
		assert(anchored.source === expected, `"${anchored.source}" !== "${expected}"`);
		assert(anchored.flags === regexp.flags, `"${anchored.flags}" !== "${regexp.flags}"`);
	});

	const regexp = /simple/;
	const anchored = anchorRegex(regexp);
	const mAnchored = anchorRegex(/simple/m);
	assert(true, s => regexp.test(s),    "simple");
	assert(true, s => regexp.test(s),    " simple ");
	assert(true, s => anchored.test(s),  "simple");
	assert(false, s => anchored.test(s), " simple ");
	assert(false, s => anchored.test(s), " \nsimple\n ");
	assert(true, s => mAnchored.test(s), " \nsimple\n ");
}, true);