export function indexCaptureGroups(source) {
    const map = {};
    const regexp = /\(\?<([a-z]+)\d*>/gi;
    return source.replace(regexp, (_, group) => {
        if (group in map) {
            return `(?<${group}${++map[group]}>`;
        }
        map[group] = 0;
        return `(?<${group}>`;
    });
}
