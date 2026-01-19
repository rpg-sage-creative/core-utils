import { regex } from "regex";
const HexRegExp = regex("i") `
	^
	(0x|\#)
	(?<digits>
		(
			[0-9a-f]{3,4}  # rgb or rgba
		){1,2}             # rrggbb or rrggbbaa
	)
	$
`;
export function matchHex(value) {
    if (!value)
        return undefined;
    const match = HexRegExp.exec(value.trim());
    const digits = match?.groups?.digits;
    if (!digits)
        return undefined;
    const digitCount = digits.length;
    const noAlpha = digitCount === 3 || digitCount === 6;
    const hasAlpha = digitCount === 4 || digitCount === 8;
    if (noAlpha || hasAlpha) {
        return { digits, hasAlpha };
    }
    return undefined;
}
