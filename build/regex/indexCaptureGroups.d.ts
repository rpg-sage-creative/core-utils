/**
 * Some of our logic takes a RegExp and duplicates it inside a regex with wrapper/spoiler characters.
 * This can cause capture groups to get duplicated.
 * indexCaptureGroups will find duplicated capture groups and index them to avoid issues with duplicated capture groups.
 */
export declare function indexCaptureGroups(source: string): string;
