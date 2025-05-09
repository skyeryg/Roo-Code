import { compilePrompt } from "../template"

export async function getSharedToolUseSection(): Promise<string> {
	return await compilePrompt("sections/tool-use")
}
