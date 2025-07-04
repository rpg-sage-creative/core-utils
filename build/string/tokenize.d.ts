/** A group of regular expressions used for Tokenizer.tokenize() */
export type TokenParsers = Record<string, RegExp>;
/** A token returned from Tokenizer.tokenize() */
export type TokenData<Key extends string = string> = {
    /** the TokenParsers key of the RegExp that matched */
    key: Key;
    /** the match groups captured by the RegExp */
    matches: string[];
    /** the substring that matched the RegExp */
    token: string;
};
/**
* Tiny tokenizer
*
* - Accepts a subject string and an object of regular expressions for parsing
* - Returns an array of token objects
*
* tokenize('this is text.', { word:/\w+/, whitespace:/\s+/, punctuation:/[^\w\s]/ }, 'invalid');
* result => [{ token:"this", key:"word" }, { token:" ", key:"whitespace" }, { token:"is", key:"word" }, ... ]
*
* @todo long term; improved tokenization with nested processing
*/
export declare function tokenize(input: string, parsers: TokenParsers, defaultKey?: string): TokenData[];
