// import { Values } from "zod"

export { getRulesSection } from "./rules"
export { getSystemInfoSection } from "./system-info"
export { getObjectiveSection } from "./objective"
export { addCustomInstructions } from "./custom-instructions"
export { getSharedToolUseSection } from "./tool-use"
export { getMcpServersSection } from "./mcp-servers"
export { getToolUseGuidelinesSection } from "./tool-use-guidelines"
export { getCapabilitiesSection } from "./capabilities"
export { getModesSection } from "./modes"
export { markdownFormattingSection } from "./markdown-formatting"

// const SECTIONS = [
//     'markdown-formatting',
//     'tool-use',
//     'tools',
//     'tool-use-guidelines',
//     'mcp-servers',
//     'capabilities',
//     'modes',
//     'rules',
//     'system-info',
//     'objective',
//     'custom-instructions',
// ] as const
// type SECTIOM_NAME = keyof Values<typeof SECTIONS>

// const SECTION_TEMPLATES: Record<SECTIOM_NAME, string | (() => Promise<string>)> = {
//     "markdown-formatting": "sections/markdown-formatting",
//     "tool-use": "sections/tool-use",
//     "tools": "sections/tools",
//     "tool-use-guidelines": "sections/tool-use-guidelines",
//     "mcp-servers": "sections/mcp-servers",
//     "capabilities": "sections/capabilities",
//     "modes": "sections/modes",
//     "rules": "sections/rules",
//     "system-info": "sections/system-info",
//     "objective": "sections/objective",
//     "custom-instructions": "sections/custom-instructions"
// }
