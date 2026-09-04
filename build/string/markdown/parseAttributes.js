const attrRegex = /(?<key>\w+)="(?<value>[^"]+)"/gi;
/** @internal Parses the given string for html attribute key/value pairs. */
export function parseAttributes(attributesString) {
    const attributes = new Map();
    if (!attributesString) {
        return attributes;
    }
    const matches = attributesString.matchAll(attrRegex);
    for (const match of matches) {
        const { key, value } = match.groups;
        attributes.set(key, value);
    }
    return attributes;
}
