export class InvalidInput extends Error {
    constructor(input) {
        super("Invalid input: " + input)
    }
}

export class UnknownOperator extends Error {
    constructor(operator) {
        super("Unknown operator: " + operator)
    }
}