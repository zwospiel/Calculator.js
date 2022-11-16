import { Brackets } from "./Brackets"
import { InvalidInput } from "./Errors"


export function bracketsAreBalanced(expression) {
    validate(expression)

    if (expression === "") {
        return true
    }

    let openedBrackets = []
    for (const character of expression) {
        if (Brackets.isOpen(character)) {
            openedBrackets.push(character)
        } else if (character === Brackets.getClosed(openedBrackets.slice(-1)[0])) {
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
        if (!Brackets.includes(character)) {
            throw new InvalidInput(character)
        }
    }
}