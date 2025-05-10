import { compilePrompt } from "../template"
import { ToolArgs } from "./types"

export async function getListCodeDefinitionNamesDescription(args: ToolArgs): Promise<string> {
	return await compilePrompt("tools/list-code-definition-names.ts", { args })
}
