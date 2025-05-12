import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getSearchAndReplaceDescription(
	templateContext: TemplateContext,
	args: ToolArgs,
): Promise<string> {
	return await compilePrompt("tools/search-and-replace", templateContext, { args })
}
