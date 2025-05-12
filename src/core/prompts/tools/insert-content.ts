import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getInsertContentDescription(templateContext: TemplateContext, args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/insert-content", templateContext, { args })
}
