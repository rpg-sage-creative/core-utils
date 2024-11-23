function getTickRegexp(count) {
    switch (count) {
        case 1: return /((?<!\\)`){1}/;
        case 2: return /((?<!\\)`){2}/;
        case 3: return /((?<!\\)`){3}/;
        default: return /((?<!\\)`){1,3}/;
    }
}
function findNext(content, startIndex) {
    const sliced = content.slice(startIndex);
    const leftRegex = getTickRegexp();
    const leftMatch = leftRegex.exec(sliced);
    if (!leftMatch) {
        return undefined;
    }
    let leftIndex = leftMatch.index;
    let ticks = leftMatch[0].length;
    do {
        const rightRegex = getTickRegexp(ticks);
        const rightMatch = rightRegex.exec(sliced.slice(leftIndex + ticks));
        if (rightMatch) {
            const index = startIndex + leftIndex;
            const length = rightMatch.index + ticks * 2;
            const match = content.slice(index, index + length);
            return { index, length, match, ticks };
        }
        ticks--;
        leftIndex++;
    } while (ticks > 0);
    return undefined;
}
export function matchCodeBlocks(content) {
    const matches = [];
    let lastIndex = 0;
    let match;
    while (match = findNext(content, lastIndex)) {
        matches.push(match);
        lastIndex = match.index + match.length;
    }
    return matches;
}
