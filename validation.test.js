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
})

describe('Expect parensAreBalanced to return', () => {
    describe('true ', () => {
        test('for empty input', () => {
            expect(parensAreBalanced('')).toBe(true)
        })
    })
})