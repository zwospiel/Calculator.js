class Brackets {
    static #closedByOpeningBrackets = {
        "(": ")",
        "[": "]",
        "{": "}",
    }

    static get #openingBrackets() {
        return Object.keys(Brackets.#closedByOpeningBrackets)
    }

    static get #closingBrackets() {
        return Object.values(Brackets.#closedByOpeningBrackets)
    }

    static get #validBrackets() {
        return Brackets.#openingBrackets.concat(Brackets.#closingBrackets)
    }

    static isOpeningBracket(character) {
        return Brackets.#openingBrackets.includes(character)
    }

    static getClosingBracketFor(openingBracket) {
        return Brackets.#closedByOpeningBrackets[openingBracket]
    }

    static isValidBracket(character) {
        return Brackets.#validBrackets.includes(character)
    }
}


module.exports = Brackets