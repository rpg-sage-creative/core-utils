import { getFromProcessSafely } from "./getFromProcessSafely.js";
export function getAwsRegion(key) {
    const regionValidator = (value) => {
        return ["us-west-1", "us-west-2", "us-east-1", "us-east-2"].includes(String(value));
    };
    return getFromProcessSafely(regionValidator, key);
}
