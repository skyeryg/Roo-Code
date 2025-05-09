import path from "path"
import { safeReadFile } from "./sections/custom-system-prompt"
import { fileExistsAtPath } from "../../utils/fs"

type TemplateContent = Record<string, any>

const delimiterRegex = /\{\{\s*([^{}]*)\s*\}\}/g

/**
 * 安全计算表达式
 * @param expr JavaScript表达式
 * @param data 模板数据
 * @returns 表达式计算结果
 */
function evaluateExpression(expr: string, data: TemplateContent): string {
	try {
		// 创建安全的数据访问环境
		const sandbox = Object.create(null)
		Object.keys(data).forEach((key) => {
			sandbox[key] = data[key]
		})

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
function compileTemplate(template: string): (ctc: TemplateContent) => string {
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

	return (ctx: TemplateContent) => {
		let output = parts[0]
		for (let i = 0; i < exprs.length; i++) {
			output += evaluateExpression(exprs[i], ctx) + parts[i + 1]
		}
		return output
	}
}

/**
 * 直接渲染模板
 * @param template 模板字符串
 * @param context 模板数据
 * @returns 渲染结果
 */
export function renderTemplate(template: string, context: TemplateContent): string {
	return compileTemplate(template)(context)
}

export async function compilePrompt(name: string, context: TemplateContent, lang: string = "en") {
	const templatePath = await getTemplateFilePath(name, lang)

	const templateContent = await safeReadFile(templatePath)
	if (!templateContent) {
		return ""
	}

	return renderTemplate(templateContent, context)
}

async function getTemplateFilePath(name: string, lang: string): Promise<string> {
	const filePath = path.resolve(__dirname, `templates/${lang}/${name}.md`)

	const exist = await fileExistsAtPath(filePath)
	if (exist) {
		return filePath
	}

	return path.resolve(__dirname, `templates/en/${name}.md`)
}
