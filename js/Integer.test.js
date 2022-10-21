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
