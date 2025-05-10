import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getListFilesDescription(args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/list-files.ts", { args })
}
