import { Integer } from "./Integer"
import { UnknownOperator } from "./Errors"


export class Operators {
    static #toPrecedence = {
        "+": 1,
        "×": 2,
    }

    static isOperator(token) {
        return Object.keys(Operators.#toPrecedence).includes(token)
    }

    /**
     * @param {string} operator1
     * @param {string} operator2
     * @returns {number}
     * A positive value if operator1 has the higher precedence,
     * a negative value if operator2 has the higher precedence,
     * or zero if they have the same precedence.
     */
    static compare(operator1, operator2) {
        operator1 = operator1 ?? 0
        operator2 = operator2 ?? 0

        return Operators.#toPrecedence[operator1] - Operators.#toPrecedence[operator2]
    }

    /**
     * Applies the given operator onto the given operands.
     * @param {string} operator
     * @param {number} operand1
     * @param {number} operand2
     * @returns The result of the operation.
     */
    static apply(operator, operand1, operand2) {
        switch (operator) {
            case "+":
                return Integer.add(operand1, operand2)
            case "×":
                return Integer.multiply(operand1, operand2)
            default:
                throw new UnknownOperator(operator)
        }
    }
}