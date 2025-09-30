import { redactCodeBlocks } from "./redactCodeBlocks.js";
import { redactKeyValuePairs } from "./redactKeyValuePairs.js";
import { redactMdLinks } from "./redactMdLinks.js";

type RedactOptions = {
	codeBlocks?: boolean;
	keyValuePairs?: boolean;
	mdLinks?: boolean;
	redactedCharacter?: string;
};

/** All options default to true unless given as false. */
export function redactContent(content: string, options?: RedactOptions): string {
	const { codeBlocks, keyValuePairs, mdLinks, redactedCharacter } = options ?? {};

	if (codeBlocks !== false) {
		content = redactCodeBlocks(content, redactedCharacter);
	}

	if (keyValuePairs !== false) {
		content = redactKeyValuePairs(content, redactedCharacter);
	}

	if (mdLinks !== false) {
		content = redactMdLinks(content, redactedCharacter);
	}

	return content;
}