import { InvalidInput } from "../src/js/Errors"
import { add, multiply, negate } from "../src/js/Integer"


describe("add", () => {
    describe("returns correct sum", () => {
        test("for positive summands", () => {
            expect(add(3, 4)).toBe(7)
            expect(add(123, 456)).toBe(579)
        })
        test("for negative summands", () => {
            expect(add(3, -4)).toBe(-1)
            expect(add(-3, 4)).toBe(1)
            expect(add(-3, -4)).toBe(-7)
        })
        test("when adding 0", () => {
            expect(add(0, 4)).toBe(4)
            expect(add(4, 0)).toBe(4)
            expect(add(0, 0)).toBe(0)
        })
    })
    describe("throws", () => {
        describe("a TypeError", () => {
            test("for non-number inputs", () => {
                expect(() => add("4", 3)).toThrow(TypeError)
                expect(() => add(4, "3")).toThrow(TypeError)
                expect(() => add([ 4 ], 3)).toThrow(TypeError)
                expect(() => add(4, [ 3 ])).toThrow(TypeError)
            })
        })
        describe("an InvalidInput error", () => {
            test("for non-integer inputs", () => {
                expect(() => add(4.1, 3)).toThrow(InvalidInput)
                expect(() => add(4, 3.9)).toThrow(InvalidInput)
            })
        })
    })
})

describe("multiply", () => {
    describe("returns correct product", () => {
        test("for positive factors", () => {
            expect(multiply(3, 4)).toBe(12)
            expect(multiply(123, 456)).toBe(56088)
        })
        test("for negative factors", () => {
            expect(multiply(3, -4)).toBe(-12)
            expect(multiply(-5, 6)).toBe(-30)
            expect(multiply(-8, -9)).toBe(72)
        })
        test("when multiplying by 0", () => {
            expect(multiply(0, 4)).toBe(0)
            expect(multiply(4, 0)).toBe(0)
            expect(multiply(0, 0)).toBe(0)
        })
        test("when multiplying a negative number by 0", () => {
            expect(multiply(0, -12)).toBe(0)
            expect(multiply(0, -7)).toBe(0)
        })
    })
    describe("throws", () => {
        describe("a TypeError", () => {
            test("for non-number inputs", () => {
                expect(() => multiply("4", 3)).toThrow(TypeError)
                expect(() => multiply(4, "3")).toThrow(TypeError)
                expect(() => multiply([ 4 ], 3)).toThrow(TypeError)
                expect(() => multiply(4, [ 3 ])).toThrow(TypeError)
            })
        })
        describe("an InvalidInput error", () => {
            test("for non-integer inputs", () => {
                expect(() => multiply(4.1, 3)).toThrow(InvalidInput)
                expect(() => multiply(4, 3.9)).toThrow(InvalidInput)
            })
        })
    })
})

describe("negate", () => {
    describe("returns negated input", () => {
        test("for positive numbers", () => {
            expect(negate(3)).toBe(-3)
            expect(negate(123)).toBe(-123)
        })
        test("for negative numbers", () => {
            expect(negate(-4)).toBe(4)
            expect(negate(-501)).toBe(501)
        })
    })
    describe("does not change input", () => {
        test("for zero", () => {
            expect(negate(0)).toBe(0)
        })
    })
    describe("throws", () => {
        describe("a TypeError", () => {
            test("for non-number inputs", () => {
                expect(() => negate("4")).toThrow(TypeError)
                expect(() => negate([ 4 ])).toThrow(TypeError)
            })
        })
        describe("an InvalidInput error", () => {
            test("for non-integer inputs", () => {
                expect(() => negate(4.1)).toThrow(InvalidInput)
            })
        })
    })
})