import { bracketsAreBalanced } from "../docs/js/validation"
import { InvalidInput } from "../docs/js/Errors"


describe("Expect bracketsAreBalanced to throw", () => {
    describe("a TypeError", () => {
        test("for non-string inputs", () => {
            expect(() => bracketsAreBalanced()).toThrow(TypeError)
            expect(() => bracketsAreBalanced(4)).toThrow(TypeError)
            expect(() => bracketsAreBalanced([ "(", ")" ])).toThrow(TypeError)
        })
    })
    describe("an InvalidInput error", () => {
        test("for inputs with invalid characters", () => {
            expect(() => bracketsAreBalanced("4")).toThrow(InvalidInput)
            expect(() => bracketsAreBalanced("(4)")).toThrow(InvalidInput)
            expect(() => bracketsAreBalanced("(4+5)")).toThrow(InvalidInput)
        })
    })
    describe("nothing", () => {
        describe("for balanced input", () => {
            test("with parentheses", () => {
                expect(() => bracketsAreBalanced("()")).not.toThrow()
            })
            test("with square brackets", () => {
                expect(() => bracketsAreBalanced("[]")).not.toThrow()
            })
            test("with curly braces", () => {
                expect(() => bracketsAreBalanced("{}")).not.toThrow()
            })
            test("with mixed brackets", () => {
                expect(() => bracketsAreBalanced("([{}]}")).not.toThrow()
            })

        })
        describe("for unbalanced input", () => {
            test("with parentheses", () => {
                expect(() => bracketsAreBalanced(")(")).not.toThrow()
            })
            test("with square brackets", () => {
                expect(() => bracketsAreBalanced("][")).not.toThrow()
            })
            test("with curly braces", () => {
                expect(() => bracketsAreBalanced("}{")).not.toThrow()
            })
            test("with mixed brackets", () => {
                expect(() => bracketsAreBalanced(")]}{[(")).not.toThrow()
            })

        })
    })
})

describe("Expect bracketsAreBalanced to return", () => {
    describe("true ", () => {
        test("for empty input", () => {
            expect(bracketsAreBalanced("")).toBe(true)
        })
        test("for two balanced brackets", () => {
            expect(bracketsAreBalanced("()")).toBe(true)
            expect(bracketsAreBalanced("[]")).toBe(true)
            expect(bracketsAreBalanced("{}")).toBe(true)
        })
        test("for a nested pair of balanced brackets", () => {
            expect(bracketsAreBalanced("(())")).toBe(true)
            expect(bracketsAreBalanced("[[]]")).toBe(true)
            expect(bracketsAreBalanced("{{}}")).toBe(true)
        })
        test("for a sequential pair of balanced brackets", () => {
            expect(bracketsAreBalanced("()()")).toBe(true)
            expect(bracketsAreBalanced("[][]")).toBe(true)
            expect(bracketsAreBalanced("{}{}")).toBe(true)
        })
        test("for balanced nested mixed brackets", () => {
            expect(bracketsAreBalanced("([{}])")).toBe(true)
            expect(bracketsAreBalanced("()[]{}")).toBe(true)
            expect(bracketsAreBalanced("([]){()}")).toBe(true)
        })
    })
    describe("false", () => {
        test("for an unclosed opening bracket", () => {
            expect(bracketsAreBalanced("(")).toBe(false)
            expect(bracketsAreBalanced("[")).toBe(false)
            expect(bracketsAreBalanced("{")).toBe(false)
        })
        test("for an even number of unclosed opening brackets", () => {
            expect(bracketsAreBalanced("((")).toBe(false)
            expect(bracketsAreBalanced("[[")).toBe(false)
            expect(bracketsAreBalanced("{{")).toBe(false)
        })
        test("for a single unopened closing bracket", () => {
            expect(bracketsAreBalanced(")")).toBe(false)
            expect(bracketsAreBalanced("]")).toBe(false)
            expect(bracketsAreBalanced("}")).toBe(false)
        })
        test("for an even number of unopened closing brackets", () => {
            expect(bracketsAreBalanced("))")).toBe(false)
            expect(bracketsAreBalanced("]]")).toBe(false)
            expect(bracketsAreBalanced("}}")).toBe(false)
        })
        test("for a pair of brackets in the wrong order", () => {
            expect(bracketsAreBalanced(")(")).toBe(false)
            expect(bracketsAreBalanced("][")).toBe(false)
            expect(bracketsAreBalanced("}{")).toBe(false)
        })
        test("for an extra opening bracket", () => {
            expect(bracketsAreBalanced("()(")).toBe(false)
            expect(bracketsAreBalanced("[][")).toBe(false)
            expect(bracketsAreBalanced("{}{")).toBe(false)
        })
        test("for an extra closing bracket", () => {
            expect(bracketsAreBalanced("())")).toBe(false)
            expect(bracketsAreBalanced("[]]")).toBe(false)
            expect(bracketsAreBalanced("{}}")).toBe(false)
        })
        test("for incorrectly nested mixed balanced brackets", () => {
            expect(bracketsAreBalanced("([)]")).toBe(false)
            expect(bracketsAreBalanced("[{]}")).toBe(false)
            expect(bracketsAreBalanced("{(})")).toBe(false)
        })
        test("for a mixed formula with an unclosed opening bracket in the middle", () => {
            expect(bracketsAreBalanced("([]){()()}[(]([()])")).toBe(false)
        })
        test("for a mixed formula with an unopened closing bracket in the middle", () => {
            expect(bracketsAreBalanced("([]{})[()])({()[]})")).toBe(false)
        })
    })
})