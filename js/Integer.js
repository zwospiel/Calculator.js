import { InvalidInput } from "./Errors"


// In this file we are manipulating Integers using the Two's Complement binary representation,
// instead of the inbuilt JavaScript Number functionality.
export class Integer {
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