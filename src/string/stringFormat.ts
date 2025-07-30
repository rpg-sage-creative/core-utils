import { navigateJson } from "../json/navigateJson.js";

/**
 * Splits the key into dot notation and looks through the args until it finds a value that matches the key.
 */
function findByKeyPath(args: any[], key: string): string | undefined {
	const navResults = args.map(arg => navigateJson(arg, key));
	for (const navResult of navResults) {
		if (navResult.isFull) {
			return navResult.value;
		}
	}
	return undefined;
}

let stringFormatRegex: RegExp;

/**
 * Formats the given string template by using the given arguments.
 * The template is searched for indexed args #{0} as well as named args ${name}.
 * Named strings can be dot notation to find children values.
 * Any value that resolves to /undefined/ will *NOT* be replaced, leaving the unused key in the resulting output.
 * ex: stringFormat(`Hello #{0}.`, "Bob"); >> "Hello Bob."
 * ex: stringFormat(`Hello #{1}.`, "Bob"); >> "Hello #{1}."
 * ex: stringFormat(`Hello ${name}.`, { name:"Bob" }); >> "Hello Bob."
 * ex: stringFormat(`${name.first} ${name.last} is a #{1}.`, { name:{first:"Bob",last:"Dole"} }, "Dev); >> "Bob Dole is a Dev."
 */
export function stringFormat<T>(template: string, ...args: T[]): string;

export function stringFormat(template: string, ...args: any[]): string {
	stringFormatRegex ??= /\$\{[\w\.\[\]]+}|#\{\d+}/g;

	const pairs = new Map();
	return template.replace(stringFormatRegex, keyMatch => {
		if (!pairs.has(keyMatch)) {
			const key = keyMatch.slice(2, -1);
			const value = keyMatch.startsWith("$")
				? findByKeyPath(args, key)
				: args[+key];
			pairs.set(keyMatch, String(value ?? keyMatch));
		}
		return pairs.get(keyMatch);
	});
}
