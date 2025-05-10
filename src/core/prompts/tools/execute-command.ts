import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getExecuteCommandDescription(args: ToolArgs): Promise<string | undefined> {
	return await compilePrompt("tools/execute-command", { args })
}
