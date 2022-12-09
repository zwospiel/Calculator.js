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
 * Verify whether the expression has balanced brackets.
 *
 * An expression has balanced brackets when
 * each opening bracket is followed by a corresponding closing bracket of the same type
 * and each closing bracket is preceded by a corresponding opening bracket of the same type.
 * @param {string} expression
 * @returns {boolean} True if the expression has balanced brackets, false otherwise.
 */
export function hasBalancedBrackets(expression) {
    let openBrackets = []
    for (const character of expression) {
        if (isOpenBracket(character)) {
            openBrackets.push(character)
        }

        if (isClosedBracket(character)) {
            if (character === getClosedBracket(openBrackets.slice(-1)[0])) {
                openBrackets.pop()
            } else {
                return false
            }
        }
    }

    return openBrackets.length === 0
}

/**
 * @param {string} openBracket
 * @returns {string} The matching closed bracket to the given open bracket.
 */
function getClosedBracket(openBracket) {
    return closedByOpen[openBracket]
}