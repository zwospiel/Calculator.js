import { add, multiply } from "./Integer.js"
import { InvalidInput } from "./Errors.js"


const operatorsToPrecedence = {
    "+": 1,
    "*": 2,
}

export function isOperator(token) {
    return Object.keys(operatorsToPrecedence).includes(token)
}

/**
 * @param {string} operator1
 * @param {string} operator2
 * @returns {number}
 * A positive value if operator1 has the higher precedence,
 * a negative value if operator2 has the higher precedence,
 * or zero if they have the same precedence.
 */
export function compare(operator1, operator2) {
    operator1 = operator1 ?? 0
    operator2 = operator2 ?? 0

    return operatorsToPrecedence[operator1] - operatorsToPrecedence[operator2]
}

/**
 * Applies the given operator onto the given operands.
 * @param {string} operator
 * @param {number} operand1
 * @param {number} operand2
 * @returns The result of the operation.
 */
export function apply(operator, operand1, operand2) {
    switch (operator) {
        case "+":
            return add(operand1, operand2)
        case "*":
            return multiply(operand1, operand2)
        default:
            throw new InvalidInput(operator)
    }
}