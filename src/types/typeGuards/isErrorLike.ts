
export type ErrorLike = {
	message: string;
	name: string;
	stack: string;
};

function _isErrorLike(err: unknown): err is ErrorLike {
	if (err) {
		if (err instanceof Error) {
			return true;
		}

		const type = Object.prototype.toString.call(err);
		if (type === "[object Error]") {
			return true;
		}

		if (type === "[object Object]") {
			return ["message", "name", "stack"].some(key => key in (err as any));
		}
	}
	return false;
}

type ErrorTester<T extends Error = Error> = (err: T) => boolean;

export function isErrorLike(err: unknown, arg?: string | ErrorTester): err is ErrorLike {
	if (_isErrorLike(err)) {

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
