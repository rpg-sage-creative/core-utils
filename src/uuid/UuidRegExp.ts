import { regex } from "regex";
import type { TypedRegExp } from "../types/TypedRegExp.js";
import type { UUID } from "./types.js";

export const UuidRegExp = regex("i")`
	(?<uuid>
		[0-9a-f]{8}
		-
		[0-9a-f]{4}
		-
		[1-5]
		[0-9a-f]{3}
		-
		[89ab]
		[0-9a-f]{3}
		-
		[0-9a-f]{12}

		|

		00000000-0000-0000-0000-000000000000
	)
` as TypedRegExp<{ uuid:UUID }>;
