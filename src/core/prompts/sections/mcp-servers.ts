import { DiffStrategy } from "../../../shared/tools"
import { McpHub } from "../../../services/mcp/McpHub"
import { compilePrompt } from "../template"

export async function getMcpServersSection(
	mcpHub?: McpHub,
	diffStrategy?: DiffStrategy,
	enableMcpServerCreation?: boolean,
): Promise<string> {
	if (!mcpHub) {
		return ""
	}

	const connectedServers =
		mcpHub.getServers().length > 0
			? `${mcpHub
					.getServers()
					.filter((server) => server.status === "connected")
					.map((server) => {
						const tools = server.tools
							?.map((tool) => {
								const schemaStr = tool.inputSchema
									? `    Input Schema:
		${JSON.stringify(tool.inputSchema, null, 2).split("\n").join("\n    ")}`
									: ""

								return `- ${tool.name}: ${tool.description}\n${schemaStr}`
							})
							.join("\n\n")

						const templates = server.resourceTemplates
							?.map((template) => `- ${template.uriTemplate} (${template.name}): ${template.description}`)
							.join("\n")

						const resources = server.resources
							?.map((resource) => `- ${resource.uri} (${resource.name}): ${resource.description}`)
							.join("\n")

						const config = JSON.parse(server.config)

						return (
							`## ${server.name} (\`${config.command}${config.args && Array.isArray(config.args) ? ` ${config.args.join(" ")}` : ""}\`)` +
							(tools ? `\n\n### Available Tools\n${tools}` : "") +
							(templates ? `\n\n### Resource Templates\n${templates}` : "") +
							(resources ? `\n\n### Direct Resources\n${resources}` : "")
						)
					})
					.join("\n\n")}`
			: "(No MCP servers currently connected)"

	const baseSection = await compilePrompt("sections/mcp-servers", { connectedServers })

	if (!enableMcpServerCreation) {
		return baseSection
	}

	return (
		baseSection +
		`
${await compilePrompt("sections/create-mcp-servers", {})}`
	)
}
