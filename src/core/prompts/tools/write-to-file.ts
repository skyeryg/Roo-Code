import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getWriteToFileDescription(args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/write-to-file.ts", { args })
}
