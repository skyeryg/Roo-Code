import { McpHub } from "../../../services/mcp/McpHub"
import { DiffStrategy } from "../../../shared/tools"
import { compilePrompt } from "../template"

export async function createMCPServerInstructions(
	mcpHub: McpHub | undefined,
	diffStrategy: DiffStrategy | undefined,
): Promise<string> {
	if (!diffStrategy || !mcpHub) throw new Error("Missing MCP Hub or Diff Strategy")

	const mcpServersPath = await mcpHub.getMcpServersPath()
	const mcpSettingsFilePath = await mcpHub.getMcpSettingsFilePath()
	const mcpServers = mcpHub
		.getServers()
		.map((server) => server.name)
		.join(", ")

	return await compilePrompt("instructions/create-mcp-server", {
		diffStrategy,
		mcpServersPath,
		mcpSettingsFilePath,
		mcpServers,
	})
}
