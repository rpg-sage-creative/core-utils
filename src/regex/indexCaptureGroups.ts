/**
 * Some of our logic takes a RegExp and duplicates it inside a regex with wrapper/spoiler characters.
 * This can cause capture groups to get duplicated.
 * indexCaptureGroups will find duplicated capture groups and index them to avoid issues with duplicated capture groups.
 */
export function indexCaptureGroups(source: string): string {
	// simple map for storing index of a given capture group
	const map = { } as Record<string, number>;

	// regex to find all capture group labels
	const regexp = /\(\?<([a-z]+)\d*>/gi;

	return source.replace(regexp, (_, group) => {
		// if the group is in the map, increment and return an indexed group label
		if (group in map) {
			return `(?<${group}${++map[group]!}>`;
		}

		// add group to the map
		map[group] = 0;

		// since this is the first one, return a non-indexed group label
		return `(?<${group}>`;
	});
}