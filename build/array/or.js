export function or(...testers) {
    return (value, index, array) => {
        let result;
        for (const tester of testers) {
            result = tester(value, index, array);
            if (result) {
                return result;
            }
        }
        return result;
    };
}
