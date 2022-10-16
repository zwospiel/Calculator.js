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

    let signedBit = 1 << 31
    let negativeResult = false
    if (a & signedBit) {
        a = negateInteger(a)
        negativeResult = !negativeResult
    }
    if (b & signedBit) {
        b = negateInteger(b)
        negativeResult = !negativeResult
    }

    let result = 0
    while (a !== 0) {
        if ((a & 1) === 1) {
            result += b
        }
        a = a >>> 1
        b = b << 1
    }

    if (negativeResult) {
        return negateInteger(result)
    } else { return result }
}

function validateOperators(input) {
    if (typeof(input) !== "number") {
        throw new TypeError("Not a number.")
    }
    if (!(Number.isInteger(input))) {
        throw new InvalidInput("Not an integer.")
    }
}

function negateInteger(integer) {
    let bitflipSummand = -1 >> 32
    return ((integer ^ bitflipSummand) + 1)
}


module.exports = { plus, multiply }