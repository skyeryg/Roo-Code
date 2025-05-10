import { DiffStrategy } from "../../../shared/tools"
import { compilePrompt } from "../template"

export async function getRulesSection(
	cwd: string,
	supportsComputerUse: boolean,
	diffStrategy?: DiffStrategy,
): Promise<string> {
	const context = {
		cwd: cwd.toPosix(),
		diffStrategy,
		supportsComputerUse,
	}
	return compilePrompt("sections/rules", context)
}
