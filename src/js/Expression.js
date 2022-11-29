import { InputReader } from "./InputReader.js"
import { Operators } from "./Operators.js"
import { Brackets } from "./Brackets.js"


export class Expression {
    constructor(input) {
        this.#reader = new InputReader(input)

        this.#operands = []
        this.#operators = []
    }

    #reader
    #operands
    #operators

    solve() {
        for (const token of this.#reader.iterateTokens()) {
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