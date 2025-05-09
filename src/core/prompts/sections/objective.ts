import { compilePrompt } from "../template"

export async function getObjectiveSection(): Promise<string> {
	return await compilePrompt("sections/objective")
}
