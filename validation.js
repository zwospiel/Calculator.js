function bracketsAreBalanced(formula) {
    validate(formula)

    if (formula === "") {
        return true
    }

    let openedBrackets = []
    for (const character of formula) {
        if (isOpenBracket(character)) {
           openedBrackets.push(character)
        } else if (openedBrackets[openedBrackets.length - 1] == openedBracketBy(character)) {
            openedBrackets.pop()
        } else {
            return false
        }
    }

    return openedBrackets.length == 0
}

function isOpenBracket(character) {
    return [ '{', '[', '(' ].includes(character)
}

function isClosedBracket(character) {
    return [ '}', ']', ')' ].includes(character)
}

function openedBracketBy(closedBracket) {
    if (closedBracket === '}') {
        return '{'
    } else if (closedBracket === ']') {
        return '['
    } else if (closedBracket === ')') {
        return '('
    } else { 
        throw new Error("Invalid closed Bracket")
    }
}

function validate(formula) {
    if (typeof(formula) !== "string") {
        throw new TypeError("Expected input to be a string.")
    }

    for (const character of formula) {
        if (character != '(' && character != ')' && character != '[' && character != ']' 
        && character != '{' && character != '}') {
            throw new Error("Invalid input.")
        }
    }
}


module.exports = bracketsAreBalanced