import { compilePrompt } from "../template"

export async function getAskFollowupQuestionDescription(): Promise<string> {
	return await compilePrompt("tools/ask-followup-question")
}
