export class Brackets {
    static #closedByOpen = {
        "(": ")",
        "[": "]",
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
     * @param {string} token
     * @returns {boolean} True if the given token is an open bracket, false if not.
     */
    static isOpen(token) {
        return Brackets.#openBrackets.includes(token)
    }

    /**
     * @param {string} token
     * @returns {boolean} True if the given token is an closed bracket, false if not.
     */
    static isClosed(token) {
        return Brackets.#closedBrackets.includes(token)
    }

    /**
     * @param {string} openBracket
     * @returns {string} The matching closed bracket to the given open bracket.
     */
    static getClosed(openBracket) {
        return Brackets.#closedByOpen[openBracket]
    }

    /**
     * @param {string} token
     * @returns {boolean} True if the given token is a valid bracket, false if not.
     */
    static includes(token) {
        return Brackets.#validBrackets.includes(token)
    }
}