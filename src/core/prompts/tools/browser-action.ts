import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getBrowserActionDescription(args: ToolArgs): Promise<string | undefined> {
	if (!args.supportsComputerUse) {
		return undefined
	}
	return await compilePrompt("tools/browser-action", { args })
}
