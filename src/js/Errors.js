export class InvalidInput extends Error {
    constructor(input) {
        super("Invalid input: " + input)
    }
}

export class UnbalancedBrackets extends Error {
    constructor(input) {
        super("Unbalanced Brackets: " + input)
    }
}