import { hasBalancedBrackets } from "../src/js/Brackets"


describe("Expect hasBalancedBrackets to return", () => {
    describe("true ", () => {
        test("for empty input", () => {
            expect(hasBalancedBrackets("")).toBe(true)
        })
        test("for two balanced brackets", () => {
            expect(hasBalancedBrackets("()")).toBe(true)
            expect(hasBalancedBrackets("[]")).toBe(true)
        })
        test("for a nested pair of balanced brackets", () => {
            expect(hasBalancedBrackets("(())")).toBe(true)
            expect(hasBalancedBrackets("[[]]")).toBe(true)
        })
        test("for a sequential pair of balanced brackets", () => {
            expect(hasBalancedBrackets("()()")).toBe(true)
            expect(hasBalancedBrackets("[][]")).toBe(true)
        })
        test("for balanced nested mixed brackets", () => {
            expect(hasBalancedBrackets("([])")).toBe(true)
            expect(hasBalancedBrackets("()[]")).toBe(true)
            expect(hasBalancedBrackets("([])()")).toBe(true)
        })
    })
    describe("false", () => {
        test("for an unclosed opening bracket", () => {
            expect(hasBalancedBrackets("(")).toBe(false)
            expect(hasBalancedBrackets("[")).toBe(false)
        })
        test("for an even number of unclosed opening brackets", () => {
            expect(hasBalancedBrackets("((")).toBe(false)
            expect(hasBalancedBrackets("[[")).toBe(false)
        })
        test("for a single unopened closing bracket", () => {
            expect(hasBalancedBrackets(")")).toBe(false)
            expect(hasBalancedBrackets("]")).toBe(false)
        })
        test("for an even number of unopened closing brackets", () => {
            expect(hasBalancedBrackets("))")).toBe(false)
            expect(hasBalancedBrackets("]]")).toBe(false)
        })
        test("for a pair of brackets in the wrong order", () => {
            expect(hasBalancedBrackets(")(")).toBe(false)
            expect(hasBalancedBrackets("][")).toBe(false)
        })
        test("for an extra opening bracket", () => {
            expect(hasBalancedBrackets("()(")).toBe(false)
            expect(hasBalancedBrackets("[][")).toBe(false)
        })
        test("for an extra closing bracket", () => {
            expect(hasBalancedBrackets("())")).toBe(false)
            expect(hasBalancedBrackets("[]]")).toBe(false)
        })
        test("for incorrectly nested mixed balanced brackets", () => {
            expect(hasBalancedBrackets("([)]")).toBe(false)
        })
        test("for a mixed formula with an unclosed opening bracket in the middle", () => {
            expect(hasBalancedBrackets("([])()()[(]([()])")).toBe(false)
        })
        test("for a mixed formula with an unopened closing bracket in the middle", () => {
            expect(hasBalancedBrackets("([])[()])(()[])")).toBe(false)
        })
    })
})