const Brackets = require("./Brackets")
const InvalidInput = require("./Errors")


function bracketsAreBalanced(formula) {
    validate(formula)

    if (formula === "") {
        return true
    }

    let openedBrackets = []
    for (const character of formula) {
        if (Brackets.isOpeningBracket(character)) {
            openedBrackets.push(character)
        } else if (character === Brackets.getClosingBracketFor(openedBrackets.slice(-1)[0])) {
            openedBrackets.pop()
        } else {
            return false
        }
    }

    return openedBrackets.length === 0
}

function validate(formula) {
    if (typeof(formula) !== "string") {
        throw new TypeError("Expected input to be a string.")
    }

    for (const character of formula) {
        if (!Brackets.isValidBracket(character)) {
            throw new InvalidInput(character)
        }
    }
}


module.exports = bracketsAreBalanced