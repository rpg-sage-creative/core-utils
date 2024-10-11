import { regex } from "regex";
import { info, assert, runTests, escapeRegex } from "../../build/index.js";

/*

\$, \(, \), \*, \+, \., \/, \?, \[, \\, \], \^, \{, \|, \}: valid everywhere

\-: only valid inside character classes

\!, \#, \%, \&, \,, \:, \;, \<, \=, \>, \@, \`, \~: only valid inside v-mode character classes

*/

runTests(function test_escapeRegex() {
	"$()*+./?[]\\^{}|".split("").forEach(char => {
		assert(`\\${char}`, escapeRegex, char);
	});

}, true);