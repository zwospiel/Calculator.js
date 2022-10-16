const InvalidInput = require("./Errors")


function plus(a, b) {
    validateOperators(a), validateOperators(b)

    let carry = 0
    while (b !== 0) {
        carry = a & b
        a = a ^ b
        b = carry << 1
    }

    return a
}

function multiply(a, b) {
    validateOperators(a), validateOperators(b)
    return 0
}

function validateOperators(input) {
    if (typeof(input) !== "number") {
        throw new TypeError("Not a number.")
    }
    if (!(Number.isInteger(input))) {
        throw new InvalidInput("Not an integer.")
    }
}


module.exports = { plus, multiply }