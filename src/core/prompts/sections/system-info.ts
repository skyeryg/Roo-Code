import os from "os"
import osName from "os-name"

import { getShell } from "../../../utils/shell"
import { compilePrompt } from "../template"

export async function getSystemInfoSection(cwd: string): Promise<string> {
	const context = {
		osName: osName(),
		shell: getShell(),
		homeDir: os.homedir().toPosix(),
		cwd: cwd.toPosix(),
	}
	return await compilePrompt("sections/system-info", context)
}
