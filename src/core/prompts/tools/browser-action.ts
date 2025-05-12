import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getBrowserActionDescription(
	templateContext: TemplateContext,
	args: ToolArgs,
): Promise<string | undefined> {
	if (!args.supportsComputerUse) {
		return undefined
	}
	return await compilePrompt("tools/browser-action", templateContext, { args })
}
