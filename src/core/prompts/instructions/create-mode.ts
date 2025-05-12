import * as path from "path"
import * as vscode from "vscode"

import { GlobalFileNames } from "../../../shared/globalFileNames"
import { compilePrompt } from "../template"

export async function createModeInstructions(
	cwd: string | undefined,
	context: vscode.ExtensionContext | undefined,
): Promise<string> {
	if (!context) throw new Error("Missing VSCode Extension Context")

	const settingsDir = path.join(context.globalStorageUri.fsPath, "settings")
	const customModesPath = path.join(settingsDir, GlobalFileNames.customModes)

	return await compilePrompt("instructions/create-mode", { cwd: cwd || "" }, { customModesPath })
}
