export function or(...testers) {
    return (value, index, array) => {
        let result;
        for (const tester of testers) {
            result = tester(value, index, array);
            // if the result is "truthy", return it now to stop testing
            if (result) {
                return result;
            }
        }
        // return the last "falsey" result (for sorting it should be a 0)
        return result;
    };
}
