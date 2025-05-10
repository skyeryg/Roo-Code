import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getReadFileDescription(args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/read-file.ts", { args })
}
