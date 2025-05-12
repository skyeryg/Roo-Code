import { ToolName } from "../../../schemas"
import { TOOL_GROUPS, ALWAYS_AVAILABLE_TOOLS, DiffStrategy } from "../../../shared/tools"
import { McpHub } from "../../../services/mcp/McpHub"
import { Mode, ModeConfig, getModeConfig, isToolAllowedForMode, getGroupName } from "../../../shared/modes"

import { ToolArgs } from "./types"
import { getExecuteCommandDescription } from "./execute-command"
import { getReadFileDescription } from "./read-file"
import { getFetchInstructionsDescription } from "./fetch-instructions"
import { getWriteToFileDescription } from "./write-to-file"
import { getSearchFilesDescription } from "./search-files"
import { getListFilesDescription } from "./list-files"
import { getInsertContentDescription } from "./insert-content"
import { getSearchAndReplaceDescription } from "./search-and-replace"
import { getListCodeDefinitionNamesDescription } from "./list-code-definition-names"
import { getBrowserActionDescription } from "./browser-action"
import { getAskFollowupQuestionDescription } from "./ask-followup-question"
import { getAttemptCompletionDescription } from "./attempt-completion"
import { getUseMcpToolDescription } from "./use-mcp-tool"
import { getAccessMcpResourceDescription } from "./access-mcp-resource"
import { getSwitchModeDescription } from "./switch-mode"
import { getNewTaskDescription } from "./new-task"
import { TemplateContext } from "../template"

// Map of tool names to their description functions
const toolDescriptionMap: Record<
	string,
	(templateContext: TemplateContext, args: ToolArgs) => Promise<string | undefined>
> = {
	execute_command: (templateContext, args) => getExecuteCommandDescription(templateContext, args),
	read_file: (templateContext, args) => getReadFileDescription(templateContext, args),
	fetch_instructions: (templateContext) => getFetchInstructionsDescription(templateContext),
	write_to_file: (templateContext, args) => getWriteToFileDescription(templateContext, args),
	search_files: (templateContext, args) => getSearchFilesDescription(templateContext, args),
	list_files: (templateContext, args) => getListFilesDescription(templateContext, args),
	list_code_definition_names: (templateContext, args) => getListCodeDefinitionNamesDescription(templateContext, args),
	browser_action: (templateContext, args) => getBrowserActionDescription(templateContext, args),
	ask_followup_question: (templateContext) => getAskFollowupQuestionDescription(templateContext),
	attempt_completion: (templateContext) => getAttemptCompletionDescription(templateContext),
	use_mcp_tool: (templateContext, args) => getUseMcpToolDescription(templateContext, args),
	access_mcp_resource: (templateContext, args) => getAccessMcpResourceDescription(templateContext, args),
	switch_mode: (templateContext) => getSwitchModeDescription(templateContext),
	new_task: (templateContext, args) => getNewTaskDescription(templateContext, args),
	insert_content: (templateContext, args) => getInsertContentDescription(templateContext, args),
	search_and_replace: (templateContext, args) => getSearchAndReplaceDescription(templateContext, args),
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

// Export individual description functions for backward compatibility
export {
	getExecuteCommandDescription,
	getReadFileDescription,
	getFetchInstructionsDescription,
	getWriteToFileDescription,
	getSearchFilesDescription,
	getListFilesDescription,
	getListCodeDefinitionNamesDescription,
	getBrowserActionDescription,
	getAskFollowupQuestionDescription,
	getAttemptCompletionDescription,
	getUseMcpToolDescription,
	getAccessMcpResourceDescription,
	getSwitchModeDescription,
	getInsertContentDescription,
	getSearchAndReplaceDescription,
}
