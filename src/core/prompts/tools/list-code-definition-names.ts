import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getListCodeDefinitionNamesDescription(
	templateContext: TemplateContext,
	args: ToolArgs,
): Promise<string> {
	return await compilePrompt("tools/list-code-definition-names", templateContext, { args })
}
