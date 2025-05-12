import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getListFilesDescription(templateContext: TemplateContext, args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/list-files", templateContext, { args })
}
