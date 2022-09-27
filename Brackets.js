class Brackets {
    static #closedByOpeningBrackets = {
        '(': ')',
        '[': ']',
        '{': '}',
    }

    static get #openingBrackets() {
        return Object.keys(this.#closedByOpeningBrackets)
    }

    static get #closingBrackets() {
        return Object.values(this.#closedByOpeningBrackets)
    }

    static get #validBrackets() {
        return this.#openingBrackets.concat(this.#closingBrackets)
    }

    static isOpeningBracket(character) {
        return this.#openingBrackets.includes(character)
    }

    static getClosingBracketFor(openingBracket) {
        return this.#closedByOpeningBrackets[openingBracket]
    }

    static isValidBracket(character) {
        return this.#validBrackets.includes(character)
    }
}


module.exports = Brackets