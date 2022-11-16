import { Expression } from "../docs/js/Expression"
import { UnknownOperator } from "../docs/js/Errors"


describe("Expression.constructor", () => {
    describe("throws a TypeError", () => {
        test("for non-string inputs", () => {
            expect(() => new Expression()).toThrow(TypeError)
            expect(() => new Expression(4)).toThrow(TypeError)
            expect(() => new Expression([ 4 ])).toThrow(TypeError)
        })
    })
})

describe("Expression.solve", () => {
    describe("throws UnknownOperator Error", () => {
        test("for unknown operator", () => {
            expect(() => new Expression("3%4").solve()).toThrow(UnknownOperator)
        })
    })
    describe("returns correct result", () => {
        test("for single addition", () => {
            expect(new Expression("3+4").solve()).toBe(7)
        })
        test("for single multiplication", () => {
            expect(new Expression("3*4").solve()).toBe(12)
        })
        test("for chained addition", () => {
            expect(new Expression("3+4+5+6").solve()).toBe(18)
        })
        test("for chained multiplication", () => {
            expect(new Expression("3*4*5*6").solve()).toBe(360)
        })
    })
    describe("respects brackets", () => {
        test("for single brackets", () => {
            expect(new Expression("(3+4)*5").solve()).toBe(35)
        })
        test("for nested brackets", () => {
            expect(new Expression("((3+4)*5)+6").solve()).toBe(41)
        })
        test("for nested brackets of different kind", () => {
            expect(new Expression("[(3+4)*5]+6").solve()).toBe(41)
        })
        test("for sequential bracket pairs", () => {
            expect(new Expression("(3+4)*(5+6)").solve()).toBe(77)
        })
    })
    describe("respects precedence", () => {
        test("for mixed addition and multiplication", () => {
            expect(new Expression("3*4+5").solve()).toBe(17)
            expect(new Expression("3+4*5").solve()).toBe(23)
        })
        test("for mixed operators and brackets", () => {
            expect(new Expression("(3+4*5)*6+7").solve()).toBe(145)
        })
    })
})