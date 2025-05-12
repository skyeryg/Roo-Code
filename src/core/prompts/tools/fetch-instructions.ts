import { compilePrompt, TemplateContext } from "../template"

export async function getFetchInstructionsDescription(templateContext: TemplateContext): Promise<string> {
	return await compilePrompt("tools/fetch-instructions", templateContext)
}
