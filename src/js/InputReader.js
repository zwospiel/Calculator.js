export class InputReader {
    #input

    constructor(input) {
        if (typeof(input) !== "string") {
            throw new TypeError("Expected input to be a string.")
        }

        this.#input = input
    }

    /**
     * Iterates through the input string and yields all contained tokens.
     *
     * A token is either a Number representing an operand,
     * or a string representing an operator or a bracket.
     * E.g. the input "(3+45)" yields: "(", 3, "+", 45, ")"
     */
    *iterateTokens() {
        for (let i = 0; i < this.#input.length; i++) {
            if (InputReader.#isDigit(this.#input[i])) {
                let number = this.#parseNumberAt(i)
                i += InputReader.#lengthOf(number) - 1
                yield number
            } else if (this.#input[i] === " ") {
                continue
            } else {
                yield this.#input[i]
            }
        }
    }

    static #isDigit(character) {
        return /\d/.test(character)
    }

    #parseNumberAt(i) {
        return parseInt(this.#input.slice(i))
    }

    static #lengthOf(number) {
        return number.toString().length
    }
}