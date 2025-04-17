/**
 * @param {string} randomSnowflake
 * @param {`${number}`} NIL_SNOWFLAKE
 * @returns
 */
export function getTests(randomSnowflake, NIL_SNOWFLAKE) {
	return [
		{ input:"00000",         isSnowflakeResult:false, isNilSnowflakeResult:false, isNonNilSnowflakeResult:false, orNilSnowflakeResult:NIL_SNOWFLAKE },
		{ input:NIL_SNOWFLAKE,   isSnowflakeResult:true,  isNilSnowflakeResult:true,  isNonNilSnowflakeResult:false, orNilSnowflakeResult:NIL_SNOWFLAKE },
		{ input:"1234567890",    isSnowflakeResult:false, isNilSnowflakeResult:false, isNonNilSnowflakeResult:false, orNilSnowflakeResult:NIL_SNOWFLAKE },
		{ input:randomSnowflake, isSnowflakeResult:true,  isNilSnowflakeResult:false, isNonNilSnowflakeResult:true,  orNilSnowflakeResult:randomSnowflake },
		{ input:"control",       isSnowflakeResult:false, isNilSnowflakeResult:false, isNonNilSnowflakeResult:false, orNilSnowflakeResult:NIL_SNOWFLAKE },
	];
}