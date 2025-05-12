import { compilePrompt, TemplateContext } from "../template"

export async function getAskFollowupQuestionDescription(templateContext: TemplateContext): Promise<string> {
	return await compilePrompt("tools/ask-followup-question", templateContext)
}
