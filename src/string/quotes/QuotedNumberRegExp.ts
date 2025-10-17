import { regex } from "regex";

/** Matches an unsigned number (integer or decimal) in any of the following quotes: "", “”, „“, „”, '', ‘’ */
export const QuotedNumberRegExp = regex()`
	# "" simple double quotes
	"\d+(\.\d+)?"

	|

	# “” fancy double quotes
	“\d+(\.\d+)?”

	|

	# '' simple single quotes
	'\d+(\.\d+)?'

	|

	# ‘’ fancy single quotes
	‘\d+(\.\d+)?’
`;
