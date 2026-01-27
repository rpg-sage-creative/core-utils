import { execCli } from "./internal/execCli.js";

/** Uses `git branch --show-current` to read the current git branch for the given repoPath. */
export async function readBranchName(repoPath: string): Promise<string | undefined> {
	return execCli("git branch --show-current", repoPath).catch(() => undefined);
}