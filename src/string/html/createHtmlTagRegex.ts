import { debug } from "../../console/index.js";
import { tagLiterals } from "../../templates/tagLiterals.js";
import { createCloseTagSource, createSelfCloseSource, type Flags } from "./internal/helpers.js";

type Options = { flags?:Flags; };

export function createHtmlTagRegex(options?: Options): RegExp {
	debug(tagLiterals`createHtmlTagRegex(${options})`);
	const source = `(${createCloseTagSource(options)}|${createSelfCloseSource(options)})`;
	return new RegExp(source, options?.flags);
}
