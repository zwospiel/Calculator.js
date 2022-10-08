class InvalidInput extends Error {
    constructor(message) {
        super("Invalid input: " + message)
    }
}


module.exports = InvalidInput