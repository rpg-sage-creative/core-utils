
export type ErrorLike<Name extends string = string> = {
	cause?: ErrorLike;
	message: string;
	name: Name;
	stack?: string;
};

function checkProperties(err: ErrorLike) {
	return typeof(err.message) === "string"
		&& typeof(err.name) === "string"
		&& (err.cause === undefined || _isErrorLike(err.cause))
		&& (err.stack === undefined || typeof(err.stack) === "string");
}

function _isErrorLike<Name extends string>(err: unknown): err is ErrorLike<Name> {
	if (err) {
		if (err instanceof Error) {
			return true;
		}

		const type = Object.prototype.toString.call(err);
		if (type === "[object Error]") {
			return true;
		}

		if (type === "[object Object]") {
			return checkProperties(err as ErrorLike);
		}
	}
	return false;
}

type ErrorTester<Name extends string = string, Err extends ErrorLike<Name> = ErrorLike<Name>> = (err: Err) => boolean;

export function isErrorLike<Name extends string = string>(err: unknown, arg?: string | ErrorTester<Name>): err is ErrorLike<Name> {
	if (_isErrorLike<Name>(err)) {

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
