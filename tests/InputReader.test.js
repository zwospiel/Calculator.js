import { InputReader } from "../src/js/InputReader"


describe("InputReader.constructor", () => {
    describe("throws a TypeError", () => {
        test("for non-string inputs", () => {
            expect(() => new InputReader()).toThrow(TypeError)
            expect(() => new InputReader(4)).toThrow(TypeError)
            expect(() => new InputReader([ 4 ])).toThrow(TypeError)
        })
    })
})

describe("InputReader.iterateTokens", () => {
    describe("returns correct tokens", () => {
        test("for empty input", () => {
            let reader = new InputReader("")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([])
        })
        test("for single-digit input", () => {
            let reader = new InputReader("4")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([ 4 ])
        })
        test("for multi-digit input", () => {
            let reader = new InputReader("42")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([ 42 ])
        })
        test("for a single addition", () => {
            let reader = new InputReader("3+4")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([ 3, "+", 4 ])
        })
        test("for a single multiplication", () => {
            let reader = new InputReader("3*4")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([ 3, "*", 4 ])
        })
        test("for mixed operations", () => {
            let reader = new InputReader("3*4+5")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([ 3, "*", 4, "+", 5 ])
        })
        test("for mixed operations with mixed brackets", () => {
            let reader = new InputReader("3*([4+5]*2)")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([ 3, "*", "(", "[", 4, "+", 5, "]", "*", 2, ")" ])
        })
        test("for mixed operations with multi-digit numbers", () => {
            let reader = new InputReader("12*34+56")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([ 12, "*", 34, "+", 56 ])
        })
        test("for mixed operations with mixed brackets and multi-digit numbers", () => {
            let reader = new InputReader("1*([23+45]*6)")
            let tokens = Array.from(reader.iterateTokens())
            expect(tokens).toEqual([ 1, "*", "(", "[", 23, "+", 45, "]", "*", 6, ")" ])
        })
    })
    describe("ignores whitespace", () => {
        test("in empty input", () => {
            let reader = new InputReader(" ")
            expect(Array.from(reader.iterateTokens())).toEqual([])
        })
        test("inbetween tokens", () => {
            let reader = new InputReader("3 + 4")
            expect(Array.from(reader.iterateTokens())).toEqual([ 3, "+", 4 ])
        })
        test("at beginning of input", () => {
            let reader = new InputReader(" 3+4")
            expect(Array.from(reader.iterateTokens())).toEqual([ 3, "+", 4 ])
        })
        test("at end of input", () => {
            let reader = new InputReader("3+4 ")
            expect(Array.from(reader.iterateTokens())).toEqual([ 3, "+", 4 ])
        })
    })
})