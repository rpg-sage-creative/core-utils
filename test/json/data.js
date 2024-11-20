
/** @type {[object, string, string][]} [object, string, label] */
const cloneParseStringify = () => {
	const date = new Date();
	const dateString = date.toISOString();

	return [
		// simple bigint
		[1n, JSON.stringify({ $bigint:"1" }), `1n`],

		// simple date
		[date, JSON.stringify({ $date:dateString }), dateString],

		// bigint as property
		[{ a:"Apple", b:1n }, JSON.stringify({ a:"Apple", b:{ $bigint:"1" } }), `{ a:"Apple", b:1n }`],

		// date as property
		[{ a:"Apple", d:date }, JSON.stringify({ a:"Apple", d:{ $date:dateString } }), `{ a:"Apple", d:"${dateString}" }`],

		// array of bigint
		[[1n, 2n, 3n], JSON.stringify([{ $bigint:"1" }, { $bigint:"2" }, { $bigint:"3" }]), `[1n, 2n, 3n]`],

		// array of date
		[[date, date, date], JSON.stringify([{ $date:dateString }, { $date:dateString }, { $date:dateString }]), `["${dateString}", "${dateString}", "${dateString}"]`],

		// make sure an object with $bigint isn't parsed
		[{ a:"Apple", $bigint:"1" }, JSON.stringify({ a:"Apple", $bigint:"1" }), `{ a:"Apple", $bigint:"1" }`],

		// make sure an object with $date isn't parsed
		[{ a:"Apple", $date:dateString }, JSON.stringify({ a:"Apple", $date:dateString }), `{ a:"Apple", $date:"${dateString}" }`],

		// value with null
		[{ a:"Apple", b:null }, JSON.stringify({ a:"Apple", b:null }), `{ a:"Apple", b:null }`],

		// value with undefined
		[{ a:"Apple", b:undefined }, JSON.stringify({ a:"Apple", b:undefined }), `{ a:"Apple", b:undefined }`],

	];
};

/** @type {[object, boolean, boolean][]} [object, empty, keyless] */
const emptyKeyless = () => {
	const deleted = { a:"A" };
	delete deleted.a;

	const added = {};
	added.a = undefined;

	return [
		[{},            true,  true],
		[{a:undefined}, true,  false],
		[{a:null},      false, false],
		[deleted,       true,  true],
		[added,         true,  false],
		[{a:""},        false, false],
		[{"":""},       false, false],
		[{"":null},     false, false],
		[{0:null},      false, false],
	];
};

/**
 *
 * @param {"cloneJson" | "isEmpty" | "isKeyless" | "parseJson" | "stringifyJson"} name
 * @returns
 */
export function getTests(name) {
	switch(name) {
		case "cloneJson": return cloneParseStringify();
		case "isEmpty": return emptyKeyless();
		case "isKeyless": return emptyKeyless();
		case "parseJson": return cloneParseStringify();
		case "stringifyJson": return cloneParseStringify();
	}
}