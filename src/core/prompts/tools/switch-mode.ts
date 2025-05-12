import { compilePrompt, TemplateContext } from "../template"

export async function getSwitchModeDescription(templateContext: TemplateContext): Promise<string> {
	return await compilePrompt("tools/switch-mode", templateContext)
}
