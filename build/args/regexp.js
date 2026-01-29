import { regex } from "regex";
export const AlphaNumericRegExp = regex() `[ \w \p{L} \p{N} ]`;
export const AlphaNumericDashDotRegExp = regex() `[ \w \p{L} \p{N} \- \. ]`;
export const AlphaNumericDashDotArgKeyRegExp = regex() `
	\g<alphaNumeric>                    # letters and numbers only (a leading dash is a FlagArg)
	(
		\g<alphaNumericDashDot>*        # letters, numbers, dashes, and periods
		\g<alphaNumeric>                # letters and numbers only (a traling dash is a IncrementArg)
	)?


	(?(DEFINE)
		(?<alphaNumeric> ${AlphaNumericRegExp} )
		(?<alphaNumericDashDot> ${AlphaNumericDashDotRegExp} )
	)
`;
