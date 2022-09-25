function parensAreBalanced(formula) {
    if (typeof(formula) !== "string") {
        throw new TypeError("Expected input to be a string.")
    }

    for (const character of formula) {
        if (character != '(' && character != ')') {
            throw new Error("Invalid input.")
        }
    }

    if (formula === "") {
        return true
    }
}


module.exports = parensAreBalanced