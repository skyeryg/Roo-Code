import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getSearchFilesDescription(templateContext: TemplateContext, args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/search-files", templateContext, { args })
}
