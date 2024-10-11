import { regex } from "regex";
import { info, assert, runTests, captureRegex } from "../../build/index.js";

runTests(function test_captureRegex() {
	const captureGroup = "cgName";
	const capture = regexp => ({ expected:`(?<${captureGroup}>${regexp.source})`, captured:captureRegex(regexp, captureGroup) });
	const regexps = [
		/simple/,
		/simple/g,
		/simple/i,
		/simple/gi,
		/simple/ig,
		/a[bc]d?/,
	];
	regexps.forEach(regexp => {
		const { expected, captured } = capture(regexp);
		const capturedFlagsWithoutU = captured.flags.replace(/u/, "");
		assert(captured.source === expected, `"${captured.source}" !== "${expected}"`);
		assert(capturedFlagsWithoutU === regexp.flags, `"${capturedFlagsWithoutU}" !== "${regexp.flags}"`);
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
		const { expected, captured } = capture(regexp);
		assert(captured.source === expected, `"${captured.source}" !== "${expected}"`);
		assert(captured.flags === regexp.flags, `"${captured.flags}" !== "${regexp.flags}"`);
	});

	// baseline
	assert(true, s => /simple/.test(s), "simple");
	assert(false, s => /simple/.test(s), "simpl");
	assert(undefined, (s, t) => /simple/.exec(s)?.groups?.[t], "simple", captureGroup);

	// simple capture
	assert(true, s => captureRegex(/simple/, captureGroup).test(s), "simple");
	assert(false, s => captureRegex(/simple/, captureGroup).test(s), "simpl");
	assert("simple", (s, t) => captureRegex(/simple/, captureGroup).exec(s)?.groups?.[t], "simple", captureGroup);
	assert(undefined, (s, t) => captureRegex(/simple/, captureGroup).exec(s)?.groups?.[t], "simpl", captureGroup);

	// global capture
	assert(true, s => captureRegex(/simple/g, captureGroup).test(s), "simple");
	assert(false, s => captureRegex(/simple/g, captureGroup).test(s), "simpl");
	assert("simple", (s, t) => captureRegex(/simple/g, captureGroup).exec(s)?.groups?.[t], "simple", captureGroup);
	assert(undefined, (s, t) => captureRegex(/simple/g, captureGroup).exec(s)?.groups?.[t], "simpl", captureGroup);
}, true);