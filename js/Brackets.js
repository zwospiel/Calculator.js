const closedByOpen = {
    "(": ")",
    "[": "]",
}

const openBrackets = Object.keys(closedByOpen)
const closedBrackets = Object.values(closedByOpen)
const validBrackets = openBrackets.concat(closedBrackets)

/**
 * @param {string} token
 * @returns {boolean} True if the given token is an open bracket, false if not.
 */
export function isOpenBracket(token) {
    return openBrackets.includes(token)
}

/**
 * @param {string} token
 * @returns {boolean} True if the given token is an closed bracket, false if not.
 */
export function isClosedBracket(token) {
    return closedBrackets.includes(token)
}

/**
 * @param {string} token
 * @returns {boolean} True if the given token is a valid bracket, false if not.
 */
export function isBracket(token) {
    return validBrackets.includes(token)
}

/**
 * @param {string} openBracket
 * @returns {string} The matching closed bracket to the given open bracket.
 */
export function getClosedBracket(openBracket) {
    return closedByOpen[openBracket]
}