import { InvalidInput } from "./Errors.js"


// This module manipulates Integers using the Two's Complement binary representation,
// instead of the inbuilt JavaScript Number functionality.

const MIN = 1 << 31

export function add(a, b) {
    validate(a, b)

    let carry = 0
    while (b !== 0) {
        carry = a & b
        a = a ^ b
        b = carry << 1
    }

    return a
}

export function multiply(a, b) {
    validate(a, b)

    let absA = abs(a)
    let absB = abs(b)
    let absResult = 0

    while (absA !== 0) {
        if (isEven(absA)) {
            absResult = add(absResult, absB)
        }
        absA = absA >>> 1
        absB = absB << 1
    }

    return haveSameSign(a, b) ? absResult : _negate(absResult)
}

export function negate(integer) {
    validate(integer)
    return _negate(integer)
}

function _negate(integer) {
    return add(flipBits(integer), 1)
}

function flipBits(integer) {
    // Flipping bits is equal to an XOR comparison with 1 for every bit of the input.
    return integer ^ (MIN >> 31)
}

function abs(integer) {
    return isNegative(integer) ? _negate(integer) : integer
}

function haveSameSign(a, b) {
    // Since the most significant bit defines the sign of an integer,
    // a XOR b is positive if a and b have the same sign and negative if not.
    return !isNegative(a ^ b)
}

function isNegative(integer) {
    // A bitwise AND operation with 1000... is equivalent to checking negativity.
    return (integer & MIN) !== 0
}

function isEven(integer) {
    return (integer & 1) === 1
}

function validate(...input) {
    for (const i of input) {
        if (typeof(i) !== "number") {
            throw new TypeError("Not a number.")
        }
        if (!(Number.isInteger(i))) {
            throw new InvalidInput("Not an integer.")
        }
    }
}