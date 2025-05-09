import { DiffStrategy } from "../../../shared/tools"
import { McpHub } from "../../../services/mcp/McpHub"
import { compilePrompt } from "../template"

export async function getCapabilitiesSection(
	cwd: string,
	supportsComputerUse: boolean,
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
): Promise<string> {
	return await compilePrompt("sections/capabilities", { cwd, supportsComputerUse, mcpHub, diffStrategy })
}
