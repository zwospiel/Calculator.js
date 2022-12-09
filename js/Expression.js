import { Operators } from "./Operators.js"
import { Brackets } from "./Brackets.js"


export class Expression {
    static #isDigit(character) {
        return /\d/.test(character)
    }

    static #lengthOf(number) {
        return number.toString().length
    }

    constructor(input) {
        if (typeof(input) !== "string") {
            throw new TypeError("Expected input to be a string.")
        }

        this.#input = input
        this.#operands = []
        this.#operators = []
    }

    #input
    #operands
    #operators

    solve() {
        for (const token of this.#iterateTokens()) {
            if (typeof token === "number") {
                this.#operands.push(token)
            } else if (Brackets.isOpen(token)) {
                this.#operators.push(token)
            } else if (Brackets.isClosed(token)) {
                while (!Brackets.isOpen(this.#peekOperators())) {
                    this.#operateTop()
                }
                this.#operators.pop()
            } else {
                while (Operators.compare(this.#peekOperators(), token) >= 0) {
                    this.#operateTop()
                }
                this.#operators.push(token)
            }
        }

        while (this.#operators.length !== 0) {
            this.#operateTop()
        }

        return this.#operands[0]
    }

    /**
     * Iterates through the input string and yields all contained tokens.
     *
     * A token is either a Number representing an operand,
     * or a string representing an operator or a bracket.
     * E.g. the input "(3+45)" yields: "(", 3, "+", 45, ")"
     */
    * #iterateTokens() {
        for (let i = 0; i < this.#input.length; i++) {
            if (Expression.#isDigit(this.#input[i])) {
                let number = this.#parseNumberAt(i)
                i += Expression.#lengthOf(number) - 1
                yield number
            } else if (this.#input[i] === " ") {
                continue
            } else {
                yield this.#input[i]
            }
        }
    }

    #parseNumberAt(i) {
        return parseInt(this.#input.slice(i))
    }

    #operateTop() {
        const operand2 = this.#operands.pop()
        const operand1 = this.#operands.pop()
        const operator = this.#operators.pop()
        const result = Operators.apply(operator, operand1, operand2)
        this.#operands.push(result)
    }

    #peekOperators() {
        return this.#operators.slice(-1)[0]
    }
}