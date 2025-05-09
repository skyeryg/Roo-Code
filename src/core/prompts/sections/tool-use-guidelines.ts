import { compilePrompt } from "../template"

export async function getToolUseGuidelinesSection(): Promise<string> {
	return await compilePrompt("sections/tool-use-guidelines")
}
