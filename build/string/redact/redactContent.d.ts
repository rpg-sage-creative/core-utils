type RedactOptions = {
    codeBlocks?: boolean;
    keyValuePairs?: boolean;
    mdLinks?: boolean;
    redactedCharacter?: string;
};
/** All options default to true unless given as false. */
export declare function redactContent(content: string, options?: RedactOptions): string;
export {};
