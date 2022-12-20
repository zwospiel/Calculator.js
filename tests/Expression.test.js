import { Expression } from "../src/js/Expression"
import { InvalidInput, UnbalancedBrackets, MalformedExpression } from "../src/js/Errors"


describe("Expression.constructor", () => {
    describe("throws a TypeError", () => {
        test("for non-string inputs", () => {
            expect(() => new Expression()).toThrow(TypeError)
            expect(() => new Expression(4)).toThrow(TypeError)
            expect(() => new Expression([ 4 ])).toThrow(TypeError)
        })
    })
    describe("throws UnbalancedBrackets Error", () => {
        test("for opening bracket without closing", () => {
            expect(() => new Expression("(3+4")).toThrow(UnbalancedBrackets)
            expect(() => new Expression("3+4(")).toThrow(UnbalancedBrackets)
        })
        test("for closing bracket without opening", () => {
            expect(() => new Expression("3+4)")).toThrow(UnbalancedBrackets)
            expect(() => new Expression(")7+10(")).toThrow(UnbalancedBrackets)
        })
        test("for mismatching pair of brackets", () => {
            expect(() => new Expression("(3+4]")).toThrow(UnbalancedBrackets)
        })
        test("for unbalanced brackets", () => {
            expect(() => new Expression("(3+4))")).toThrow(UnbalancedBrackets)
            expect(() => new Expression("[[3+4]")).toThrow(UnbalancedBrackets)
        })
        test("for mismatching nesting order of brackets", () => {
            expect(() => new Expression("3*(4+[7+15)*10]")).toThrow(UnbalancedBrackets)
        })
    })
})

describe("Expression.solve", () => {
    describe("throws InvalidInput Error", () => {
        test("for unknown operator", () => {
            let expression = new Expression("3%4")
            expect(() => expression.solve()).toThrow(InvalidInput)
        })
        test("for invalid character", () => {
            let expression = new Expression("3+ä4")
            expect(() => expression.solve()).toThrow(InvalidInput)
        })
        test("for invalid string", () => {
            let expression = new Expression("7+turing+7")
            expect(() => expression.solve()).toThrow(InvalidInput)
        })
    })
    describe("throws MalformedExpression Error", () => {
        test("when input is just an operator", () => {
            let expression = new Expression("+")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for empty brackets", () => {
            let expression = new Expression("()")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for empty brackets followed by valid expression", () => {
            let expression = new Expression("()3+4")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for multiple operators in a row", () => {
            let expression = new Expression("3++4")
            expect(() => expression.solve()).toThrow(MalformedExpression)
            expression = new Expression("3*+4")
            expect(() => expression.solve()).toThrow(MalformedExpression)
            expression = new Expression("7**+*+5")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for operator at the beginning", () => {
            let expression = new Expression("+3*4")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for operator at the end", () => {
            let expression = new Expression("3*4+")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for missing operator before open bracket", () => {
            let expression = new Expression("3(7+5)")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for missing operator after closed bracket", () => {
            let expression = new Expression("(7+5)3")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for open bracket between number and operator", () => {
            let expression = new Expression("2*1(+3*5)")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for closed bracket between number and operator", () => {
            let expression = new Expression("(3*5+)2*1")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for missing number after opening bracket", () => {
            let expression = new Expression("5+(+7)")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for missing number before closing bracket", () => {
            let expression = new Expression("(5+)*7")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
    })
    describe("returns correct result", () => {
        test("when input is a single-digit number", () => {
            expect(new Expression("3").solve()).toBe(3)
        })
        test("when input is a multi-digit number", () => {
            expect(new Expression("34").solve()).toBe(34)
        })
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
        test("for mixed operators, brackets and multi-digit numbers", () => {
            expect(new Expression("(34+56*78)*90").solve()).toBe(396180)
        })
    })
    describe("ignores whitespaces", () => {
        test("inbetween tokens", () => {
            let expression = new Expression("3 + 4")
            expect(expression.solve()).toBe(7)
        })
        test("for whitespaces followed by valid input", () => {
            let expression = new Expression(" 3+4")
            expect(expression.solve()).toBe(7)
        })
        test("for valid input followed by whitespaces", () => {
            let expression = new Expression("3+4 ")
            expect(expression.solve()).toBe(7)
        })
        test("in succession", () => {
            let expression = new Expression("( 3 +   4      )  * 5")
            expect(expression.solve()).toBe(35)
        })
        test("for whitespaces followed by malformed expression", () => {
            let expression = new Expression("    +3*4")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
        test("for malformed expression followed by whitespaces", () => {
            let expression = new Expression("3*4+   ")
            expect(() => expression.solve()).toThrow(MalformedExpression)
        })
    })
})