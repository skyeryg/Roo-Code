import { ToolName } from "../../../schemas"
import { TOOL_GROUPS, ALWAYS_AVAILABLE_TOOLS, DiffStrategy } from "../../../shared/tools"
import { McpHub } from "../../../services/mcp/McpHub"
import { Mode, ModeConfig, getModeConfig, isToolAllowedForMode, getGroupName } from "../../../shared/modes"

import { ToolArgs } from "./types"
import { compilePrompt, TemplateContext } from "../template"

// Map of tool names to their description functions
const toolDescriptionMap: Record<
	string,
	(templateContext: TemplateContext, args: ToolArgs) => Promise<string | undefined>
> = {
	execute_command: async (templateContext, args) =>
		await compilePrompt("tools/execute-command", templateContext, { args }),
	read_file: async (templateContext, args) => await compilePrompt("tools/read-file", templateContext, { args }),
	fetch_instructions: async (templateContext) => await compilePrompt("tools/fetch-instructions", templateContext),
	write_to_file: async (templateContext, args) =>
		await compilePrompt("tools/write-to-file", templateContext, { args }),
	search_files: async (templateContext, args) => await compilePrompt("tools/search-files", templateContext, { args }),
	list_files: async (templateContext, args) => await compilePrompt("tools/list-files", templateContext, { args }),
	list_code_definition_names: async (templateContext, args) =>
		await compilePrompt("tools/list-code-definition-names", templateContext, { args }),
	browser_action: async (templateContext, args) =>
		!args.supportsComputerUse ? undefined : await compilePrompt("tools/browser-action", templateContext, { args }),
	ask_followup_question: async (templateContext) =>
		await compilePrompt("tools/ask-followup-question", templateContext),
	attempt_completion: async (templateContext) => await compilePrompt("tools/attempt-completion", templateContext),
	use_mcp_tool: async (templateContext, args) =>
		!args.mcpHub ? undefined : await compilePrompt("tools/use-mcp-tool", templateContext),
	access_mcp_resource: async (templateContext, args) =>
		!args.mcpHub ? undefined : await compilePrompt("tools/access-mcp-resource", templateContext),
	switch_mode: async (templateContext) => await compilePrompt("tools/switch-mode", templateContext),
	new_task: async (templateContext) => await compilePrompt("tools/new-task", templateContext),
	insert_content: async (templateContext, args) =>
		await compilePrompt("tools/insert-content", templateContext, { args }),
	search_and_replace: async (templateContext, args) =>
		await compilePrompt("tools/search-and-replace", templateContext, { args }),
	apply_diff: async (templateContext, args) =>
		args.diffStrategy ? args.diffStrategy.getToolDescription({ cwd: args.cwd, toolOptions: args.toolOptions }) : "",
}

export async function getToolDescriptionsForMode(
	templateContext: TemplateContext,
	mode: Mode,
	cwd: string,
	supportsComputerUse: boolean,
	diffStrategy?: DiffStrategy,
	browserViewportSize?: string,
	mcpHub?: McpHub,
	customModes?: ModeConfig[],
	experiments?: Record<string, boolean>,
): Promise<string> {
	const config = getModeConfig(mode, customModes)
	const args: ToolArgs = {
		cwd,
		supportsComputerUse,
		diffStrategy,
		browserViewportSize,
		mcpHub,
	}

	const tools = new Set<string>()

	// Add tools from mode's groups
	config.groups.forEach((groupEntry) => {
		const groupName = getGroupName(groupEntry)
		const toolGroup = TOOL_GROUPS[groupName]
		if (toolGroup) {
			toolGroup.tools.forEach((tool) => {
				if (
					isToolAllowedForMode(
						tool as ToolName,
						mode,
						customModes ?? [],
						undefined,
						undefined,
						experiments ?? {},
					)
				) {
					tools.add(tool)
				}
			})
		}
	})

	// Add always available tools
	ALWAYS_AVAILABLE_TOOLS.forEach((tool) => tools.add(tool))

	// Map tool descriptions for allowed tools

	const descriptions = await Promise.all(
		Array.from(tools).map(async (toolName) => {
			const descriptionFn = toolDescriptionMap[toolName]
			if (!descriptionFn) {
				return undefined
			}

			return await descriptionFn(templateContext, {
				...args,
				toolOptions: undefined, // No tool options in group-based approach
			})
		}),
	)

	return `# Tools\n\n${descriptions.filter(Boolean).join("\n\n")}`
}
