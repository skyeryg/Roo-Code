import { compilePrompt, TemplateContext } from "../template"

export async function markdownFormattingSection(templateContext: TemplateContext): Promise<string> {
	return await compilePrompt("sections/markdown-formatting", templateContext)
}
