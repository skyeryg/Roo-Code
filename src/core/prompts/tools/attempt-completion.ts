import { compilePrompt, TemplateContext } from "../template"

export async function getAttemptCompletionDescription(templateContext: TemplateContext): Promise<string> {
	return await compilePrompt("tools/attempt-completion", templateContext)
}
