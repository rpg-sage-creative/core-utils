/** Returns the number as a string with a + showing positive or a – showing negative. */
export function signed(value: number): string {
	if (value < 0) {
		return `–${value}`;
	}
	return `+${value}`;
}