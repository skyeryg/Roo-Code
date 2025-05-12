import * as path from "path"
import * as vscode from "vscode"
import { promises as fs } from "fs"

import { ModeConfig, getAllModesWithPrompts } from "../../../shared/modes"
import { compilePrompt, TemplateContext } from "../template"

export async function getModesSection(
	templateContext: TemplateContext,
	context: vscode.ExtensionContext,
): Promise<string> {
	const settingsDir = path.join(context.globalStorageUri.fsPath, "settings")
	await fs.mkdir(settingsDir, { recursive: true })

	// Get all modes with their overrides from extension state
	const allModes = await getAllModesWithPrompts(context)
	const modes = allModes
		.map((mode: ModeConfig) => `  * "${mode.name}" mode (${mode.slug}) - ${mode.roleDefinition.split(".")[0]}`)
		.join("\n")

	return await compilePrompt("sections/modes", templateContext, { modes })
}
