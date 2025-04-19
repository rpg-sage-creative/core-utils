import { randomSnowflake, snowflakeToDate, toUnique } from "../../build/index.js";

async function generateSnowflakes() {
	/** @returns {Snowflake} */
	const snowflakes = [];
	let date = Date.now();
	for (let i = 0; i < 100; i++) {
		snowflakes.push(randomSnowflake());
		await new Promise(res => setTimeout(res, 2));
	}
	return snowflakes;
}

describe("snowflake", () => {
	describe("snowflakeToDate", () => {

		test(`snowflakeToDate(randomSnowflake()).toEqual(Date.now())`, async () => {
			const now = new Date();
			const snowflake = randomSnowflake();
			const date = snowflakeToDate(snowflake);
			expect(date).toEqual(now);
		});

		test(`sort snowflakes by date`, async () => {
			const snowflakes = await generateSnowflakes();
			const dates = snowflakes.map(s => snowflakeToDate(s));
			const timestamps = dates.map(d => d.getTime());
			// expect unique timestamps
			expect(timestamps.filter(toUnique)).toEqual(timestamps);
			// sort snowflakes
			snowflakes.sort();
			dates.sort();
			timestamps.sort();
			expect(snowflakes.map(s => snowflakeToDate(s))).toEqual(dates);
			expect(snowflakes.map(s => snowflakeToDate(s).getTime())).toEqual(timestamps);
			expect(snowflakes.map(s => snowflakeToDate(s).getTime()).reverse()).toEqual(timestamps.reverse());
		});

	});
});