import { regex } from "regex";
import { NumberRegExp } from "../../number/isNumberString.js";
export const QuotedNumberRegExp = regex() `
	# "" simple double quotes
	" \g<number> "

	|

	# “” fancy double quotes
	“ \g<number> ”

	|

	# '' simple single quotes
	' \g<number> '

	|

	# ‘’ fancy single quotes
	‘ \g<number> ’


	(?(DEFINE)
		(?<number>
			\s*              # optional spaces
			${NumberRegExp}
			\s*              # optional spaces
		)
	)
`;
