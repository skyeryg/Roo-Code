import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getNewTaskDescription(templateContext: TemplateContext, _args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/new-task", templateContext)
}
