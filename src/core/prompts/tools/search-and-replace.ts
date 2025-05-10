import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getSearchAndReplaceDescription(args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/search-and-replace.ts", { args })
}
