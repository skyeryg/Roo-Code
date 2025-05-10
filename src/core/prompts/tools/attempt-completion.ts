import { compilePrompt } from "../template"

export async function getAttemptCompletionDescription(): Promise<string> {
	return await compilePrompt("tools/attempt-completion")
}
