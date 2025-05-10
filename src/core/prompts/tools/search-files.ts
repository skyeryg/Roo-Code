import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getSearchFilesDescription(args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/search-files.ts", { args })
}
