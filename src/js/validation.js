import { InvalidInput } from "./Errors"
import { isOpenBracket, getClosedBracket, isBracket } from "./Brackets"


export function bracketsAreBalanced(expression) {
    validate(expression)

    if (expression === "") {
        return true
    }

    let openedBrackets = []
    for (const character of expression) {
        if (isOpenBracket(character)) {
            openedBrackets.push(character)
        } else if (character === getClosedBracket(openedBrackets.slice(-1)[0])) {
            openedBrackets.pop()
        } else {
            return false
        }
    }

    return openedBrackets.length === 0
}

function validate(expression) {
    if (typeof(expression) !== "string") {
        throw new TypeError("Expected input to be a string.")
    }

    for (const character of expression) {
        if (!isBracket(character)) {
            throw new InvalidInput(character)
        }
    }
}