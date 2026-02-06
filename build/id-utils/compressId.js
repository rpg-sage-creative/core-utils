import { decompressId } from "./decompressId.js";
export function compressId(value, radix = 36) {
    if (value) {
        if (value.includes("-")) {
            return value.split("-").map(s => compressId(decompressId(s, 16), radix)).join("-");
        }
        return BigInt(value).toString(radix);
    }
    return undefined;
}
