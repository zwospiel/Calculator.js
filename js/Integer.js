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

        let absA = Integer.#abs(a)
        let absB = Integer.#abs(b)
        let absResult = 0

        while (absA !== 0) {
            if (Integer.#isEven(absA)) {
                absResult = Integer.add(absResult, absB)
            }
            absA = absA >>> 1
            absB = absB << 1
        }

        return Integer.#haveSameSign(a, b) ? absResult : Integer.#negate(absResult)
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

    static #abs(integer) {
        return Integer.#isNegative(integer) ? Integer.#negate(integer) : integer
    }

    static #haveSameSign(a, b) {
        // Since the most significant bit defines the sign of an integer,
        // a XOR b is positive if a and b have the same sign and negative if not.
        return !Integer.#isNegative(a ^ b)
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
