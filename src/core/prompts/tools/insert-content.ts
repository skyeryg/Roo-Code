import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getInsertContentDescription(args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/insert-content", { args })
}
