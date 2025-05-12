import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getExecuteCommandDescription(
	templateContext: TemplateContext,
	args: ToolArgs,
): Promise<string | undefined> {
	return await compilePrompt("tools/execute-command", templateContext, { args })
}
