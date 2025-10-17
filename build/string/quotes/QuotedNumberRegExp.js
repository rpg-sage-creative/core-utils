import { regex } from "regex";
export const QuotedNumberRegExp = regex() `
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
