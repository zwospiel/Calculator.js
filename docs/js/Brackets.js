export class Brackets {
    static #closedByOpen = {
        "(": ")",
        "[": "]",
        "{": "}",
    }

    static get #openBrackets() {
        return Object.keys(Brackets.#closedByOpen)
    }

    static get #closedBrackets() {
        return Object.values(Brackets.#closedByOpen)
    }

    static get #validBrackets() {
        return Brackets.#openBrackets.concat(Brackets.#closedBrackets)
    }

    /**
     * @param {string} character
     * @returns {boolean} True if the given character is an open bracket, false if not.
     */
    static isOpen(character) {
        return Brackets.#openBrackets.includes(character)
    }

    /**
     * @param {string} openBracket
     * @returns {string} The matching closed bracket to the given open bracket.
     */
    static getClosed(openBracket) {
        return Brackets.#closedByOpen[openBracket]
    }

    /**
     * @param {string} character
     * @returns {boolean} True if the given character is a valid bracket, false if not.
     */
    static includes(character) {
        return Brackets.#validBrackets.includes(character)
    }
}