const { plus } = require("./operators")
const { multiply } = require("./operators")
const InvalidInput = require("./Errors")


describe("Plus", () => {
    describe("returns correct sum", () => {
        test("for positive summands", () => {
            expect(plus(3, 4)).toBe(7)
            expect(plus(123, 456)).toBe(579)
        })
        test("for negative summands", () => {
            expect(plus(3, -4)).toBe(-1)
            expect(plus(-3, 4)).toBe(1)
            expect(plus(-3, -4)).toBe(-7)
        })
        test("when adding 0", () => {
            expect(plus(0, 4)).toBe(4)
            expect(plus(4, 0)).toBe(4)
            expect(plus(0, 0)).toBe(0)
        })
    })
    describe("throws", () => {
        describe("a TypeError", () => {
            test("for non-number inputs", () => {
                expect(() => plus("4", 3)).toThrow(TypeError)
                expect(() => plus(4, "3")).toThrow(TypeError)
                expect(() => plus([ 4 ], 3)).toThrow(TypeError)
                expect(() => plus(4, [ 3 ])).toThrow(TypeError)
            })
        })
        describe("an InvalidInput error", () => {
            test("for non-integer inputs", () => {
                expect(() => plus(4.1, 3)).toThrow(InvalidInput)
                expect(() => plus(4, 3.9)).toThrow(InvalidInput)
            })
        })
    })
})

describe("Multiply", () => {
    describe("returns correct sum", () => {
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