import { compilePrompt } from "../template"

export async function getSwitchModeDescription(): Promise<string> {
	return await compilePrompt("tools/switch-mode.ts")
}
