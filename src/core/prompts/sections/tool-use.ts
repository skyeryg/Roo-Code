import { compilePrompt, TemplateContext } from "../template"

export async function getSharedToolUseSection(templateContext: TemplateContext): Promise<string> {
	return await compilePrompt("sections/tool-use", templateContext)
}
