const bracketsAreBalanced = require('./validation');


describe('Expect bracketsAreBalanced to throw', () => {
    describe('a TypeError', () => {
        test('for non-string inputs', () => {
            expect(() => bracketsAreBalanced()).toThrow(TypeError)
            expect(() => bracketsAreBalanced(4)).toThrow(TypeError)
            expect(() => bracketsAreBalanced(['(', ')'])).toThrow(TypeError)
        })
    })
    describe('an Error', () => {
        test('for inputs with invalid characters', () => {
            expect(() => bracketsAreBalanced('4')).toThrow(Error)
            expect(() => bracketsAreBalanced('(4)')).toThrow(Error)
            expect(() => bracketsAreBalanced('(4+5)')).toThrow(Error)
        })
    })
    describe('nothing', () => {
        test('for balanced inputs without invalid characters', () => {
            expect(() => bracketsAreBalanced('()')).not.toThrow()
        })
        test('for unbalanced inputs without invalid characters', () => {
            expect(() => bracketsAreBalanced(')(')).not.toThrow()
        })
    })
})

describe('Expect bracketsAreBalanced to return', () => {
    describe('true ', () => {
        test('for empty input', () => {
            expect(bracketsAreBalanced('')).toBe(true)
        })
        test('for two balanced brackets', () => {
            expect(bracketsAreBalanced('()')).toBe(true)
        })
        test('for a nested pair of balanced brackets', () => {
            expect(bracketsAreBalanced('(())')).toBe(true)
        })
        test('for a sequential pair of balanced brackets', () => {
            expect(bracketsAreBalanced('()()')).toBe(true)
        })
    })
    describe('false', () => {
        test('for an unclosed opening bracket', () => {
            expect(bracketsAreBalanced('(')).toBe(false)
        })
        test('for an even number of unclosed opening brackets', () => {
            expect(bracketsAreBalanced('((')).toBe(false)
        })
        test('for a single unopened closing bracket', () => {
            expect(bracketsAreBalanced(')')).toBe(false)
        })
        test('for an even number of unopened closing brackets', () => {
            expect(bracketsAreBalanced('))')).toBe(false)
        })
        test('for a pair of opening and closed brackets in wrong order', () => {
            expect(bracketsAreBalanced(')(')).toBe(false)
        })
        test('for an extra opening bracket', () => {
            expect(bracketsAreBalanced('()(')).toBe(false)
        })
        test('for an extra closing bracket', () => {
            expect(bracketsAreBalanced('())')).toBe(false)
        })
        test('for a long formula with an unclosed opening bracket in the middle', () => {
            expect(bracketsAreBalanced('(())()()((())')).toBe(false)
        })
        test('for a long formula with an unopened closing bracket in the middle', () => {
            expect(bracketsAreBalanced('(())()())(())')).toBe(false)
        })
    })
})