import { Integer } from "./Integer"
import { InvalidInput } from "./Errors"


describe("Integer.add", () => {
    describe("returns correct sum", () => {
        test("for positive summands", () => {
            expect(Integer.add(3, 4)).toBe(7)
            expect(Integer.add(123, 456)).toBe(579)
        })
        test("for negative summands", () => {
            expect(Integer.add(3, -4)).toBe(-1)
            expect(Integer.add(-3, 4)).toBe(1)
            expect(Integer.add(-3, -4)).toBe(-7)
        })
        test("when adding 0", () => {
            expect(Integer.add(0, 4)).toBe(4)
            expect(Integer.add(4, 0)).toBe(4)
            expect(Integer.add(0, 0)).toBe(0)
        })
    })
    describe("throws", () => {
        describe("a TypeError", () => {
            test("for non-number inputs", () => {
                expect(() => Integer.add("4", 3)).toThrow(TypeError)
                expect(() => Integer.add(4, "3")).toThrow(TypeError)
                expect(() => Integer.add([ 4 ], 3)).toThrow(TypeError)
                expect(() => Integer.add(4, [ 3 ])).toThrow(TypeError)
            })
        })
        describe("an InvalidInput error", () => {
            test("for non-integer inputs", () => {
                expect(() => Integer.add(4.1, 3)).toThrow(InvalidInput)
                expect(() => Integer.add(4, 3.9)).toThrow(InvalidInput)
            })
        })
    })
})

describe("Integer.multiply", () => {
    describe("returns correct product", () => {
        test("for positive factors", () => {
            expect(Integer.multiply(3, 4)).toBe(12)
            expect(Integer.multiply(123, 456)).toBe(56088)
        })
        test("for negative factors", () => {
            expect(Integer.multiply(3, -4)).toBe(-12)
            expect(Integer.multiply(-5, 6)).toBe(-30)
            expect(Integer.multiply(-8, -9)).toBe(72)
        })
        test("when multiplying by 0", () => {
            expect(Integer.multiply(0, 4)).toBe(0)
            expect(Integer.multiply(4, 0)).toBe(0)
            expect(Integer.multiply(0, 0)).toBe(0)
        })
        test("when multiplying a negative number by 0", () => {
            expect(Integer.multiply(0, -12)).toBe(0)
            expect(Integer.multiply(0, -7)).toBe(0)
        })
    })
    describe("throws", () => {
        describe("a TypeError", () => {
            test("for non-number inputs", () => {
                expect(() => Integer.multiply("4", 3)).toThrow(TypeError)
                expect(() => Integer.multiply(4, "3")).toThrow(TypeError)
                expect(() => Integer.multiply([ 4 ], 3)).toThrow(TypeError)
                expect(() => Integer.multiply(4, [ 3 ])).toThrow(TypeError)
            })
        })
        describe("an InvalidInput error", () => {
            test("for non-integer inputs", () => {
                expect(() => Integer.multiply(4.1, 3)).toThrow(InvalidInput)
                expect(() => Integer.multiply(4, 3.9)).toThrow(InvalidInput)
            })
        })
    })
})

describe("Integer.negate", () => {
    describe("returns negated input", () => {
        test("for positive numbers", () => {
            expect(Integer.negate(3)).toBe(-3)
            expect(Integer.negate(123)).toBe(-123)
        })
        test("for negative numbers", () => {
            expect(Integer.negate(-4)).toBe(4)
            expect(Integer.negate(-501)).toBe(501)
        })
    })
    describe("does not change input", () => {
        test("for zero", () => {
            expect(Integer.negate(0)).toBe(0)
        })
    })
    describe("throws", () => {
        describe("a TypeError", () => {
            test("for non-number inputs", () => {
                expect(() => Integer.negate("4")).toThrow(TypeError)
                expect(() => Integer.negate([ 4 ])).toThrow(TypeError)
            })
        })
        describe("an InvalidInput error", () => {
            test("for non-integer inputs", () => {
                expect(() => Integer.negate(4.1)).toThrow(InvalidInput)
            })
        })
    })
})