import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getAccessMcpResourceDescription(args: ToolArgs): Promise<string | undefined> {
	if (!args.mcpHub) {
		return undefined
	}
	return await compilePrompt("tools/access-mcp-resource")
}
