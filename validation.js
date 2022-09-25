function parensAreBalanced(formula) {
    if (typeof(formula) !== "string") {
        throw new TypeError("Expected input to be a string.")
    }
}


module.exports = parensAreBalanced