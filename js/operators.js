import { InvalidInput } from "./Errors"


export function plus(a, b) {
    if (typeof(a) !== "number" | typeof(b) !== "number") {
        throw new TypeError("Not a number.")
    } else if (!(Number.isInteger(a) & Number.isInteger(b))) {
        throw new InvalidInput("Not an integer.")
    }

    let carry = 0
    while (b !== 0) {
        carry = a & b
        a = a ^ b
        b = carry << 1
    }

    return a
}