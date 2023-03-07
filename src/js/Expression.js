import { compare, apply, isOperator } from "./Operators.js"
import { isOpenBracket, isClosedBracket, isBracket, hasBalancedBrackets } from "./Brackets.js"
import { UnbalancedBrackets, MalformedExpression, InvalidInput } from "./Errors.js"


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

        if (!hasBalancedBrackets(input)) {
            throw new UnbalancedBrackets(input)
        }

        this.#input = input.replace(/ /g, "")
        this.#operands = []
        this.#operators = []
        this.#previousToken = undefined
    }

    #input
    #operands
    #operators
    #previousToken

    solve() {
        for (const token of this.#iterateTokens()) {
            if (typeof token === "number") {
                this.#operands.push(token)
            } else if (isOpenBracket(token)) {
                this.#operators.push(token)
            } else if (isClosedBracket(token)) {
                while (!isOpenBracket(this.#peekOperators())) {
                    this.#operateTop()
                }
                this.#operators.pop()
            } else {
                while (compare(this.#peekOperators(), token) >= 0) {
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
                this.#validateTokenOrder(number)
                yield number
            } else if (isOperator(this.#input[i]) || isBracket(this.#input[i])) {
                this.#validateTokenOrder(this.#input[i])
                yield this.#input[i]
            } else {
                throw new InvalidInput(this.#input)
            }
        }
    }

    #operateTop() {
        const operand2 = this.#operands.pop()
        const operand1 = this.#operands.pop()
        const operator = this.#operators.pop()
        const result = apply(operator, operand1, operand2)
        this.#operands.push(result)
    }

    #peekOperators() {
        return this.#operators.slice(-1)[0]
    }

    #parseNumberAt(i) {
        return parseInt(this.#input.slice(i))
    }

    #validateTokenOrder(token) {
        if (this.#previousToken === undefined) {
            if (isOperator(token)) {
                throw new MalformedExpression("Operator at beginning: " + this.#input)
            }
            if (isClosedBracket(token)) {
                throw new MalformedExpression("Closed bracket at beginning: " + this.#input)
            }
            if (isOperator(this.#input[this.#input.length - 1])) {
                throw new MalformedExpression("Operator at end: " + this.#input)
            }
        }

        if (typeof this.#previousToken === "number") {
            if (isOpenBracket(token)) {
                throw new MalformedExpression("Missing operator: " + this.#input)
            }
        }

        if (isOpenBracket(this.#previousToken)) {
            if (isClosedBracket(token)) {
                throw new MalformedExpression("Empty bracket pair: " + this.#input)
            }
            if (isOperator(token)) {
                throw new MalformedExpression("Missing number: " + this.#input)
            }
        }

        if (isClosedBracket(this.#previousToken)) {
            if (typeof token === "number") {
                throw new MalformedExpression("Missing operator: " + this.#input)
            }
        }

        if (isOperator(this.#previousToken)) {
            if (isOperator(token)) {
                throw new MalformedExpression("Consecutive operators: " + this.#input)
            }
            if (isClosedBracket(token)) {
                throw new MalformedExpression("Missing number: " + this.#input)
            }
        }

        this.#previousToken = token
    }
}