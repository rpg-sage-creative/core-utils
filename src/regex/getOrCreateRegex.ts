import { warn } from "../console/index.js";
import { splitChars } from "../string/wrap/splitChars.js";
import { isErrorLike } from "../types/typeGuards/isErrorLike.js";
import { escapeRegex } from "./escapeRegex.js";
import { indexCaptureGroups } from "./internal/indexCaptureGroups.js";
import type { RegExpAnchorOptions, RegExpCaptureOptions, RegExpFlagOptions, RegExpQuantifyOptions, RegExpSpoilerOptions, RegExpWrapOptions } from "./RegExpOptions.js";

export type RegExpGetOptions = RegExpAnchorOptions & RegExpCaptureOptions & RegExpFlagOptions & RegExpQuantifyOptions & RegExpSpoilerOptions & RegExpWrapOptions;

/**
 * Stores each unique instance to avoid duplicating regex when not needed.
 * The map key is the regex create function name.
 * The map value is an object containing each permutation of the regexp based on options.
 */
const cache: Record<string, Record<string, RegExp>> = {};

/** Creates the unique key for each variant based on options. */
function createCacheKey<T extends RegExpGetOptions>(options: T = {} as T): string {
	const pairs = Object.entries(options).sort(([aKey], [bKey]) => aKey < bKey ? -1 : 1);
	const parts = pairs.map(([key, value]) => `${key}=${value ?? false}`);
	return parts.join("|");
}

type CreateRegexFunction<T extends RegExpGetOptions, U extends RegExp> = (options?: T) => U;

function createRegex<T extends RegExpGetOptions, U extends RegExp>(creator: CreateRegexFunction<T, U>, options?: T, cacheKey?: string): RegExp {
	const { anchored, capture, spoilers, quantifier, wrapChars, wrapOptional } = options ?? {};

	// create the base regexp source
	let { source, flags } = creator(options);

	if (quantifier) {
		source = `(?:${source})${quantifier}`;
	}

	if (spoilers || wrapChars) {
		const { left, right } = splitChars(spoilers ? "||||" : wrapChars!);
		const lPattern = escapeRegex(left);
		const rPattern = escapeRegex(right);

		if (spoilers === "optional" || wrapOptional === true) {
			// create base spoilerized regex
			source = `(?:${lPattern}(?:${source})${rPattern})|(?:${source})`;

		}else {
			source = `${lPattern}(?:${source})${rPattern}`;
		}
	}

	// wrap in a capture group
	if (capture) {
		source = `(?<${capture}>${source})`;
	}

	// wrap to anchor
	if (anchored) {
		source = `^(?:${source})$`;
	}

	try {
		return new RegExp(source, flags);

	}catch(ex) {
		const isDuplicateCaptureGroup = isErrorLike(ex, err =>
			err.name === "SyntaxError"
			&& err.message.startsWith("Invalid regular expression")
			&& err.message.endsWith("Duplicate capture group name")
		);

		if (isDuplicateCaptureGroup) {
			warn(`isDuplicateCaptureGroup: ${cacheKey ?? createCacheKey(options)}`);
			return new RegExp(indexCaptureGroups(source), flags);
		}

		throw ex;
	}
}

/**
 * Returns a cached instance of the given regex if the gFlag is not set.
 * This allows us to cache non-global regex values where we don't need to worry about lastIndex.
 */
export function getOrCreateRegex<T extends RegExpGetOptions, U extends RegExp>(creator: CreateRegexFunction<T, U>, options?: T): RegExp {
	// we check the cache if not using a global regexp
	if (options?.gFlag !== "g") {
		const { name } = creator;
		const cacheItem = cache[name] ?? (cache[name] = {});
		const cacheKey = createCacheKey(options);
		return cacheItem[cacheKey] ??= createRegex(creator, options, cacheKey);
	}

	// return a unique regexp
	return createRegex(creator, options);
}
