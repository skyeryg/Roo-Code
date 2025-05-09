import { compilePrompt } from "../template"

export async function markdownFormattingSection(): Promise<string> {
	return await compilePrompt("sections/markdown-formatting")
}
