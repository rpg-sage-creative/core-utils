/** BigInt safe JSON.parse */
export function parse(text: string, reviver?: (this: any, key: string, value: any) => any): any {
	return JSON.parse(text, function(this: any, key: string, value: any) {
		// our stringify converts a bigint to { $bigint:"" }
		if (typeof(value?.$bigint) === "string") {
			// make sure we don't have another object that happens to have $bigint:string one of many keys
			if (Object.keys(value).length === 1) {
				value = BigInt(value.$bigint);
			}
		}
		return reviver ? reviver.call(this, key, value) : value;
	});
}