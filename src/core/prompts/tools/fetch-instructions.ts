import { compilePrompt } from "../template"

export async function getFetchInstructionsDescription(): Promise<string> {
	return await compilePrompt("tools/fetch-instructions")
}
