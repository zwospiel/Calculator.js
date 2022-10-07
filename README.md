# Calculator.js
## Style Guide
### ESLint
- We use [ESLint](https://eslint.org/) to automate most style rules.
- The list of all used ESLint rules can be found in `.eslintrc.json`.
- A list of all available ESLint rules can be found [here](https://eslint.org/docs/latest/rules/).
- ESLint warnings may never be ignored.
### Naming Conventions
- We use UpperCamelCase for class names and lowerCamelCase for everything else.
- Identifiers should preferably be complete words or phrases. Use abbreviations sparingly and only if you can assume that an arbitrary reader will understand them.
- Class names are always nouns and function names should be phrases containing a verb.
    ```
    class Parser {
        readLine(line) {
            // ..
        }
    }
    ```
- Booleans or functions that return booleans are identified by negatable phrases that contain words like `is`, `are`, `has`, ...
    ```
    // DO:
    function isEmptyOrWhitespace(line) {
        let isEmpty = line.lenght == 0
        let isWhitespace = line.trim().length == 0

        return isEmpty || isWhitespace
    }

    function hasEvenLength(line) {
        return line.length % 2 == 0
    }

    // DON'T:
    function emptyOrWhitespace(line) { ... }
    function even(line) { ... }
    ```
- Booleans are always phrased positively to avoid confusion about double negatives.
    ```
    // DO:
    if (isEnabled()) { ... }

    // DON'T:
    if (!isDisabled()) { ... }
    ```