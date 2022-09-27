function parensAreBalanced(formula) {
    validate(formula)

    if (formula === "") {
        return true
    }

    let count = 0
    for (const character of formula) {
        if (character == '(') {
            count++
        } else if (--count < 0) {
            return false
        }
    }

    return count == 0
}

function validate(formula) {
    if (typeof(formula) !== "string") {
        throw new TypeError("Expected input to be a string.")
    }

    for (const character of formula) {
        if (character != '(' && character != ')') {
            throw new Error("Invalid input.")
        }
    }
}


module.exports = parensAreBalanced