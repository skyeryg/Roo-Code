import { DiffStrategy } from "../../../shared/tools"
import { compilePrompt, TemplateContext } from "../template"

export async function getRulesSection(
	templateContext: TemplateContext,
	cwd: string,
	supportsComputerUse: boolean,
	diffStrategy?: DiffStrategy,
): Promise<string> {
	const context = {
		cwd: cwd.toPosix(),
		diffStrategy,
		supportsComputerUse,
	}
	return await compilePrompt("sections/rules", templateContext, context)
}
