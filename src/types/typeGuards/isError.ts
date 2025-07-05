type ErrorTester<T extends Error = Error> = (err: T) => boolean;

export function isError<T extends Error = Error>(err: unknown): err is T;
export function isError<T extends Error = Error>(err: unknown, message: string): err is T;
export function isError<T extends Error = Error>(err: unknown, tester: ErrorTester): err is T;
export function isError(err: unknown, arg?: string | ErrorTester): boolean {
	if (err && err instanceof Error) {
		if (typeof(arg) === "string") {
			return err.message === arg || err.name === arg;
		}
		if (typeof(arg) === "function") {
			return arg(err);
		}
		return true;
	}
	return false;
}