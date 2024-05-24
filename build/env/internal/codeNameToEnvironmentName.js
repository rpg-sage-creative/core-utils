export function codeNameToEnvironmentName(codeName) {
    switch (codeName) {
        case "dev":
            return "development";
        case "beta":
            return "test";
        case "stable":
            return "production";
    }
    throw new Error(`Invalid CodeName: ${codeName}`);
}
