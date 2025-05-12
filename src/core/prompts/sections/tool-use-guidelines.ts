import { compilePrompt, TemplateContext } from "../template"

export async function getToolUseGuidelinesSection(templateContext: TemplateContext): Promise<string> {
	return await compilePrompt("sections/tool-use-guidelines", templateContext)
}
