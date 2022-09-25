const parensAreBalanced = require('./validation');


describe('Expect parensAreBalanced to throw', () => {
    describe('a TypeError', () => {
        test('for non-string inputs', () => {
            expect(() => parensAreBalanced()).toThrow(TypeError)
            expect(() => parensAreBalanced(4)).toThrow(TypeError)
            expect(() => parensAreBalanced(['(', ')'])).toThrow(TypeError)
        })
    })
    describe('an Error', () => {
        test('for inputs with invalid characters', () => {
            expect(() => parensAreBalanced('4')).toThrow(Error)
            expect(() => parensAreBalanced('(4)')).toThrow(Error)
            expect(() => parensAreBalanced('(4+5)')).toThrow(Error)
        })
    })
    describe('nothing', () => {
        test('for balanced inputs without invalid characters', () => {
            expect(() => parensAreBalanced('()')).not.toThrow()
        })
        test('for unbalanced inputs without invalid characters', () => {
            expect(() => parensAreBalanced(')(')).not.toThrow()
        })
    })
})

describe('Expect parensAreBalanced to return', () => {
    describe('true ', () => {
        test('for empty input', () => {
            expect(parensAreBalanced('')).toBe(true)
        })
        test('for two balanced parens', () => {
            expect(parensAreBalanced('()')).toBe(true)
        })
        test('for a nested pair of balanced parens', () => {
            expect(parensAreBalanced('(())')).toBe(true)
        })
        test('for a sequential pair of balanced parens', () => {
            expect(parensAreBalanced('()()')).toBe(true)
        })
    })
    describe('false', () => {
        test('for an unclosed opening paren', () => {
            expect(parensAreBalanced('(')).toBe(false)
        })
        test('for an even number of unclosed opening parens', () => {
            expect(parensAreBalanced('((')).toBe(false)
        })
        test('for a single unopened closing paren', () => {
            expect(parensAreBalanced(')')).toBe(false)
        })
        test('for an even number of unopened closing parens', () => {
            expect(parensAreBalanced('))')).toBe(false)
        })
        test('for a pair of opening and closed parens in wrong order', () => {
            expect(parensAreBalanced(')(')).toBe(false)
        })
        test('for an extra opening paren', () => {
            expect(parensAreBalanced('()(')).toBe(false)
        })
        test('for an extra closing paren', () => {
            expect(parensAreBalanced('())')).toBe(false)
        })
        test('for a long formula with an unclosed opening paren in the middle', () => {
            expect(parensAreBalanced('(())()()((())')).toBe(false)
        })
        test('for a long formula with an unopened closing paren in the middle', () => {
            expect(parensAreBalanced('(())()())(())')).toBe(false)
        })
    })
})