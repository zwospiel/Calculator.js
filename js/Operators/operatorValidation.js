const InvalidInput = require("../Errors")

function validateOperators(...input) {
    for (const i of input) {
        if (typeof(i) !== "number") {
            throw new TypeError("Not a number.")
        }
        if (!(Number.isInteger(i))) {
            throw new InvalidInput("Not an integer.")
        }
    }
}

module.exports = { validateOperators }