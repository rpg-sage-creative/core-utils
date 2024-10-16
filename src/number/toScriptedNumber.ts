import { getSubscriptCharSet } from "../characters/getSubscriptCharSet.js";
import { getSuperscriptCharSet } from "../characters/getSuperscriptCharSet.js";
import type { ScriptedCharSet } from "../characters/internal/types.js";

/** Converts the given number to a string of scripted numbers. */
function toScriptedNumber(value: number | bigint, characters: ScriptedCharSet): string {
	const mapper = (char: string) => {
		switch(char) {
			case ".": return characters.period;
			case "-": return characters.minus;
			default: return characters.numbers[+char];
		}
	};
	return String(value).split("").map(mapper).join("");
}

/** Converts the given number to a string of subscript numbers. Ex: 123 becomes "₁₂₃" */
export function toSubscript(value: number | bigint): string {
	return toScriptedNumber(value, getSubscriptCharSet());
}

/** Converts the given number to a string of superscript numbers. Ex: 123 becomes "¹²³" */
export function toSuperscript(value: number | bigint): string {
	return toScriptedNumber(value, getSuperscriptCharSet());
}