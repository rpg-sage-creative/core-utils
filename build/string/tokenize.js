export function tokenize(input, parsers, defaultKey = "unknown") {
    const tokens = [];
    let matchIndex, token;
    while (input) {
        token = undefined;
        matchIndex = input.length;
        for (const key in parsers) {
            const regExpMatchArray = parsers[key]?.exec(input);
            if (regExpMatchArray?.index !== undefined && regExpMatchArray.index < matchIndex) {
                token = {
                    groups: { ...regExpMatchArray.groups },
                    key,
                    matches: regExpMatchArray.slice(1),
                    token: regExpMatchArray[0]
                };
                matchIndex = regExpMatchArray.index;
            }
        }
        if (matchIndex) {
            tokens.push({
                groups: {},
                key: defaultKey,
                matches: [],
                token: input.slice(0, matchIndex)
            });
        }
        if (token) {
            tokens.push(token);
        }
        input = input.slice(matchIndex + (token?.token.length ?? 0));
    }
    return tokens;
}
