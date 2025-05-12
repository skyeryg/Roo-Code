import { compilePrompt, TemplateContext } from "../template"

export async function getObjectiveSection(templateContext: TemplateContext): Promise<string> {
	return await compilePrompt("sections/objective", templateContext)
}
