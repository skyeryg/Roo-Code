import path from "path"
import { safeReadFile } from "./sections/custom-system-prompt"
import { fileExistsAtPath } from "../../utils/fs"

export type TemplateContext = {
	cwd: string
	lang?: string
}

export type PromptData = Record<string, any>

const delimiterRegex = /\{\{\s*([^{}]*)\s*\}\}/g

/**
 * 安全计算表达式
 * @param expr JavaScript表达式
 * @param data 模板数据
 * @returns 表达式计算结果
 */
function evaluateExpression(expr: string, data?: PromptData): string {
	try {
		// 创建安全的数据访问环境
		const sandbox = Object.create(null)
		if (data) {
			Object.keys(data).forEach((key) => {
				sandbox[key] = data[key]
			})
		}
		// 使用Function构造函数避免直接使用eval
		const evaluator = new Function(...Object.keys(sandbox), `return ${expr};`)

		// 执行表达式计算
		const result = evaluator(...Object.values(sandbox))

		// 处理计算结果
		if (result === undefined || result === null) return ""
		return String(result)
	} catch (error) {
		return ""
	}
}

/**
 * 编译双大括号模板
 * @param template 模板字符串
 * @returns 渲染函数
 */
function compileTemplate(template: string): (data?: PromptData) => string {
	const parts: string[] = []
	const exprs: string[] = []
	let lastIndex = 0

	// 解析模板
	for (const match of template.matchAll(delimiterRegex)) {
		parts.push(template.slice(lastIndex, match.index))
		exprs.push(match[1].trim())
		lastIndex = match.index + match[0].length
	}
	parts.push(template.slice(lastIndex))

	return (data?: PromptData) => {
		let output = parts[0]
		for (let i = 0; i < exprs.length; i++) {
			output += evaluateExpression(exprs[i], data) + parts[i + 1]
		}
		return output
	}
}

/**
 * 直接渲染模板
 * @param template 模板字符串
 * @param data 模板数据
 * @returns 渲染结果
 */
export function renderTemplate(template: string, data?: PromptData): string {
	return compileTemplate(template)(data)
}

export async function compilePrompt(name: string, promptContext: TemplateContext, data?: PromptData) {
	const templatePath = await getTemplateFilePath(name, promptContext)

	const templateContent = await safeReadFile(templatePath)
	if (!templateContent) {
		return ""
	}

	return renderTemplate(templateContent, data)
}

async function getTemplateFilePath(name: string, promptContext: TemplateContext): Promise<string> {
	const { cwd, lang = "en" } = promptContext
	if (cwd !== "") {
		const userTemplate = path.join(cwd, ".roo", `prompts/${name}.md`)

		if (await fileExistsAtPath(userTemplate)) {
			return userTemplate
		}
	}

	const systemTemplate = path.join(__dirname, `templates/${lang}/${name}.md`)

	if (await fileExistsAtPath(systemTemplate)) {
		return systemTemplate
	}

	return path.join(__dirname, `templates/en/${name}.md`)
}
