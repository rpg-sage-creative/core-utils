import { execCli } from "./internal/execCli.js";
export async function readBranchName(repoPath) {
    return execCli("git branch --show-current", repoPath).catch(() => undefined);
}
