import { regex } from "regex";
import { info, assert, runTests, spoilerRegex } from "../../build/index.js";

runTests(function test_spoilerRegex() {
	const spoilerOn = (regexp) => ({ expected:`\\|\\|(?:${regexp.source})\\|\\|`, spoilered:spoilerRegex(regexp, true) });
	const spoilerOptional = (regexp) => ({ expected:`\\|\\|(?:${regexp.source})\\|\\||(?:${regexp.source})`, spoilered:spoilerRegex(regexp, "optional") });
	const spoiler = (regexp, opt) => opt === true ? spoilerOn(regexp) : spoilerOptional(regexp);
	const options = [true, "optional"];
	[/simple/, /a[bc]d?/].forEach(regexp => {
		options.forEach(opt => {
			const { expected, spoilered } = spoiler(regexp, opt);
			const spoileredFlagsWithoutU = spoilered.flags.replace(/u/, "");
			assert(spoilered.source === expected, `"${spoilered.source}" !== "${expected}"`);
			assert(spoileredFlagsWithoutU === regexp.flags, `"${spoileredFlagsWithoutU}" !== "${regexp.flags}"`);
		});
	});
	[regex`simple`, regex`a[bc]d?`].forEach(regexp => {
		options.forEach(opt => {
			const { expected, spoilered } = spoiler(regexp, opt);
			assert(spoilered.source === expected, `"${spoilered.source}" !== "${expected}"`);
			assert(spoilered.flags === regexp.flags, `"${spoilered.flags}" !== "${regexp.flags}"`);
		});
	});

	assert(false, (opt, s) => spoilerRegex(/simple/, opt).test(s), true, "simpl");
	assert(false, (opt, s) => spoilerRegex(/simple/, opt).test(s), "optional", "simpl");

	assert(false, (opt, s) => spoilerRegex(/simple/, opt).test(s), true, "simple");
	assert(true,  (opt, s) => spoilerRegex(/simple/, opt).test(s), true, "||simple||");
	assert(true,  (opt, s) => spoilerRegex(/simple/, opt).test(s), "optional", "simple");
	assert(true,  (opt, s) => spoilerRegex(/simple/, opt).test(s), true, "||simple||");

	assert(null,         (opt, s) => spoilerRegex(/simple/, opt).exec(s), true, "simple");
	assert("||simple||", (opt, s) => spoilerRegex(/simple/, opt).exec(s)?.[0], true, "||simple||");
	assert("||simple||", (opt, s) => spoilerRegex(/simple/, opt).exec(s)?.[0], "optional", "||simple||");
	assert("simple",     (opt, s) => spoilerRegex(/simple/, opt).exec(s)?.[0], "optional", "simple");

}, true);