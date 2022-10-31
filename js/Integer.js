import { InvalidInput } from "./Errors"


// In this file we are manipulating Integers using the Two's Complement binary representation,
// instead of the inbuilt JavaScript Number functionality.
export class Integer {
    static MIN = 1 << 31

    static add(a, b) {
        Integer.#validate(a, b)

        let carry = 0
        while (b !== 0) {
            carry = a & b
            a = a ^ b
            b = carry << 1
        }

        return a
    }

    static multiply(a, b) {
        Integer.#validate(a, b)
        let isNegativeResult = false
        if (Integer.#isNegative(a)) {
            a = Integer.#negate(a)
            isNegativeResult = !isNegativeResult
        }
        if (Integer.#isNegative(b)) {
            b = Integer.#negate(b)
            isNegativeResult = !isNegativeResult
        }

        let result = 0
        while (a !== 0) {
            if (Integer.#isEven(a)) {
                result = Integer.add(result, b)
            }
            a = a >>> 1
            b = b << 1
        }

        return isNegativeResult ? Integer.#negate(result) : result
    }

    static negate(integer) {
        Integer.#validate(integer)
        return Integer.#negate(integer)
    }

    static #negate(integer) {
        return Integer.add(Integer.#flipBits(integer), 1)
    }

    static #flipBits(integer) {
        // Flipping bits is equal to an XOR comparison with 1 for every bit of the input.
        return integer ^ (Integer.MIN >> 31)
    }

    static #isNegative(integer) {
        // A bitwise AND operation with 1000... is equivalent to checking negativity.
        return (integer & Integer.MIN) !== 0
    }

    static #isEven(integer) {
        return (integer & 1) === 1
    }

    static #validate(...input) {
        for (const i of input) {
            if (typeof(i) !== "number") {
                throw new TypeError("Not a number.")
            }
            if (!(Number.isInteger(i))) {
                throw new InvalidInput("Not an integer.")
            }
        }
    }
}