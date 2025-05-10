import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getNewTaskDescription(_args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/new-task.ts")
}
