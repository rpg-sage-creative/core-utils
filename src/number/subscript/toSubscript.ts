import { getSubscriptCharacters } from "./getSubscriptCharacters.js";

/** Converts the given number to a string of superscript numbers. Ex: 123 becomes "₁₂₃" */
export function toSubscript(value: number | bigint): string {
	const characters = getSubscriptCharacters();
	const mapper = (char: string) => {
		switch(char) {
			case ".": return characters[10];
			// case "+": return characters[11];
			case "-": return characters[12];
			// case "=": return characters[13];
			// case "(": return characters[14];
			// case ")": return characters[15];
			default: return characters[+char];
		}
	};
	return String(value).split("").map(mapper).join("");
}