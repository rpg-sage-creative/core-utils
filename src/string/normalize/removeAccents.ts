const AccentsRegExp = /[\u0300-\u036f]/g;

/**
 * Removes accents from letters. Ex: "à" becomes "a"
 * @todo Update this RegExp / logic to capture more characters with accents.
 */
export function removeAccents(value: string): string {
	return value.normalize('NFD').replace(AccentsRegExp, '');
}
