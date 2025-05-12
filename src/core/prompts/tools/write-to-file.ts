import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getWriteToFileDescription(templateContext: TemplateContext, args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/write-to-file", templateContext, { args })
}
