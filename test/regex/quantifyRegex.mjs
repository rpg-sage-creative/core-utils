import { regex } from "regex";
import { info, assert, runTests, quantifyRegex } from "../../build/index.js";

runTests(function test_quantifyRegex() {
	const quantify = (regexp, quantifier) => ({ expected:`(?:${regexp.source})${quantifier}`, quantified:quantifyRegex(regexp, quantifier) });
	const quantifiers = ["?", "*", "+", "{2}", "{1,}", "{1,2}"];
	[/simple/, /a[bc]d?/].forEach(regexp => {
		quantifiers.forEach(quantifier => {
			const { expected, quantified } = quantify(regexp, quantifier);
			const quantifiedFlagsWithoutU = quantified.flags.replace(/u/, "");
			assert(quantified.source === expected, `"${quantified.source}" !== "${expected}"`);
			assert(quantifiedFlagsWithoutU === regexp.flags, `"${quantifiedFlagsWithoutU}" !== "${regexp.flags}"`);
		});
	});
	[regex`simple`, regex`a[bc]d?`].forEach(regexp => {
		quantifiers.forEach(quantifier => {
			const { expected, quantified } = quantify(regexp, quantifier);
			assert(quantified.source === expected, `"${quantified.source}" !== "${expected}"`);
			assert(quantified.flags === regexp.flags, `"${quantified.flags}" !== "${regexp.flags}"`);
		});
	});

	// ?
	assert("",  (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /a/, "?", "");
	assert("a", (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /a/, "?", "a");
	assert("a", (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /a/, "?", "aa");

	// *
	assert("",    (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /b/, "*", "");
	assert("b",   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /b/, "*", "b");
	assert("bb",  (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /b/, "*", "bb");
	assert("bbb", (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /b/, "*", "bbb");
	assert("",    (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /b/, "*?", "bbb");
	assert("bbb", (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /b/, "*+", "bbb");

	// +
	assert(void 0, (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /c/, "+", "");
	assert("c",    (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /c/, "+", "c");
	assert("cc",   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /c/, "+", "cc");
	assert("ccc",  (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /c/, "+", "ccc");
	assert("c",    (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /c/, "+?", "ccc");
	assert("ccc",  (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /c/, "++", "ccc");

	// {2}
	assert(void 0, (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /d/, "{2}", "");
	assert(void 0, (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /d/, "{2}", "d");
	assert("dd",   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /d/, "{2}", "dd");
	assert("dd",   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /d/, "{2}", "ddd");
	assert("dd",   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /d/, "{2}", "dddd");

	// {2,}
	assert(void 0,   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /e/, "{2,}", "");
	assert(void 0,   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /e/, "{2,}", "e");
	assert("ee",     (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /e/, "{2,}", "ee");
	assert("eee",    (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /e/, "{2,}", "eee");
	assert("eeee",   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /e/, "{2,}", "eeee");
	assert("ee",     (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /e/, "{2,}?", "eeee");
	assert("eeee",   (r, q, s) => quantifyRegex(r, q).exec(s)?.[0], /e/, "{2,}+", "eeee");

}, true);