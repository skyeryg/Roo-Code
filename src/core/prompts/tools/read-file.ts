import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getReadFileDescription(templateContext: TemplateContext, args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/read-file", templateContext, { args })
}
