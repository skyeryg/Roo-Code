import { DiffStrategy } from "../../../shared/tools"
import { McpHub } from "../../../services/mcp/McpHub"
import { compilePrompt, TemplateContext } from "../template"

export async function getCapabilitiesSection(
	templateContext: TemplateContext,
	cwd: string,
	supportsComputerUse: boolean,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
): Promise<string> {
	return await compilePrompt("sections/capabilities", templateContext, {
		cwd,
		supportsComputerUse,
		mcpHub,
		diffStrategy,
	})
}
