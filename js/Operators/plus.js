const { validateOperators } = require("./operatorValidation")

function plus(a, b) {
    validateOperators(a, b)

    let carry = 0
    while (b !== 0) {
        carry = a & b
        a = a ^ b
        b = carry << 1
    }

    return a
}

module.exports = { plus }