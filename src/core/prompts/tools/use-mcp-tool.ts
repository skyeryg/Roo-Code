import { compilePrompt, TemplateContext } from "../template"
import { ToolArgs } from "./types"

export async function getUseMcpToolDescription(
	templateContext: TemplateContext,
	args: ToolArgs,
): Promise<string | undefined> {
	if (!args.mcpHub) {
		return undefined
	}
	return await compilePrompt("tools/use-mcp-tool", templateContext)
}
