import { renderTemplate } from "../template"

describe("模板引擎核心功能", () => {
	// 基础变量替换
	describe("变量替换", () => {
		test("简单变量替换", () => {
			expect(renderTemplate("Hello {{name}}", { name: "张三" })).toBe("Hello 张三")
		})

		test("嵌套对象访问", () => {
			expect(renderTemplate("{{user.name}}", { user: { name: "李四" } })).toBe("李四")
		})

		test("数组索引访问", () => {
			expect(renderTemplate("{{items[0]}}", { items: ["a", "b"] })).toBe("a")
		})
	})

	// 空白符处理
	describe("空白符处理", () => {
		test("支持分隔符内空格", () => {
			expect(renderTemplate("Hello {{  name  }}", { name: "王五" })).toBe("Hello 王五")
		})

		test("支持分隔符内换行", () => {
			expect(renderTemplate("Hello {{\nname\n}}", { name: "赵六" })).toBe("Hello 赵六")
		})

		test("支持混合空白符", () => {
			expect(renderTemplate("Hello {{\t\n name \t\n}}", { name: "钱七" })).toBe("Hello 钱七")
		})
	})

	// 表达式支持
	describe("表达式支持", () => {
		const context = {
			user: { age: 25 },
			price: 10,
			quantity: 3,
			isVIP: true,
		}

		test("数学运算", () => {
			expect(renderTemplate("Total: {{price * quantity}}", context)).toBe("Total: 30")
		})

		test("三元表达式", () => {
			expect(renderTemplate('Status: {{isVIP ? "VIP" : "Normal"}}', context)).toBe("Status: VIP")
		})
		test("支持表达式中空白符", () => {
			expect(renderTemplate('Status: {{isVIP ? \n "VIP" : "Normal"}}', context)).toBe("Status: VIP")
		})

		test("逻辑运算", () => {
			expect(renderTemplate('{{user.age > 18 && "Adult"}}', context)).toBe("Adult")
		})
	})

	// 方法调用
	describe("方法调用支持", () => {
		const context = {
			user: {
				name: "张三",
				getName() {
					return this.name.toUpperCase()
				},
			},
			date: new Date("2023-01-01"),
			utils: {
				reverse: (str: string) => str.split("").reverse().join(""),
			},
		}

		test("对象方法调用", () => {
			expect(renderTemplate("{{user.getName()}}", context)).toBe("张三".toUpperCase())
		})

		test("工具函数调用", () => {
			expect(renderTemplate('{{utils.reverse("abc")}}', context)).toBe("cba")
		})

		test("内置对象方法", () => {
			expect(renderTemplate("{{date.getFullYear()}}", context)).toBe("2023")
		})
	})

	// 错误处理
	describe("错误处理", () => {
		test("未定义变量-非严格模式", () => {
			expect(renderTemplate("{{missing}}", {})).toBe("")
		})

		test("方法不存在", () => {
			expect(renderTemplate("{{user.nonExistMethod()}}", { user: {} })).toBe("")
		})

		test("语法错误表达式", () => {
			expect(renderTemplate("{{1 + }}", {})).toBe("")
		})
	})

	// 边界情况
	describe("边界情况", () => {
		test("空模板", () => {
			expect(renderTemplate("", { name: "张三" })).toBe("")
		})

		test("纯文本无变量", () => {
			expect(renderTemplate("Hello World", {})).toBe("Hello World")
		})

		test("只有分隔符无内容", () => {
			expect(renderTemplate("{{}}", {})).toBe("")
		})

		test("空白表达式", () => {
			expect(renderTemplate("{{   }}", {})).toBe("")
		})
	})
})

// 性能测试（单独describe便于控制是否运行）
describe.skip("性能测试", () => {
	test("渲染1000次简单模板", () => {
		const template = "Hello {{name}}"
		const context = { name: "张三" }

		const start = performance.now()
		for (let i = 0; i < 1000; i++) {
			renderTemplate(template, context)
		}
		const duration = performance.now() - start

		console.log(`1000次简单模板渲染耗时: ${duration.toFixed(2)}ms`)
		expect(duration).toBeLessThan(100)
	})

	test("渲染100次复杂模板", () => {
		const template = `
      User: {{user.name}}
      Age: {{user.age}}
      Status: {{user.age > 18 ? 'Adult' : 'Child'}}
      Balance: {{account.balance.toFixed(2)}}
    `
		const context = {
			user: { name: "李四", age: 25 },
			account: { balance: 1234.567 },
		}

		const start = performance.now()
		for (let i = 0; i < 100; i++) {
			renderTemplate(template, context)
		}
		const duration = performance.now() - start

		console.log(`100次复杂模板渲染耗时: ${duration.toFixed(2)}ms`)
		expect(duration).toBeLessThan(50)
	})
})
