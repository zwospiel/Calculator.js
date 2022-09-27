# Calculator.js
## Style Guide
### Semicolons
- We omit semicolons wherever possible.
### Braces
- We use [K&R style](https://en.wikipedia.org/wiki/Indentation_style#K&R_style) braces in the 1TBS variant.
    ```
    function compare(i, j) {    // opening curly braces always on the same line ...
        if (i < j) {            // separated by a single whitespace
            return -1
        } else if (i > j) {     // cuddled else
            return 1
        } else {
            return 0
        }                       // closing curly braces always on a new line ...
    }                           // on the same indentation level as the opening statement
    ```
- Curly Braces in single line control flow blocks should never be omitted (see the [goto fail bug](https://en.wikipedia.org/wiki/Unreachable_code#goto_fail_bug)).
    ```
    // DO:
    if (condition) {
        return true
    }

    // DON'T:
    if (condition)
        return true
    ```
- Single line control flow blocks may or may not be written in one line to make the code more concise.
    ```
    // Okay:
    if (thisCondition) { doThis() }
    if (thatCondition) { doThat() }

    // Also okay:
    if (thisCondition) {
        doThis()
    }

    if (thatCondition) {
        doThat()
    }
    ```
### Whitespace
#### Vertical Alignment
- Node module imports and exports are grouped together and separated by two empty lines from the rest of the file.
    ```
    const { someFunction, anotherFunction } = require('./myFunctions')
    const MyClass = require('./myClass')


    function doSomething() {
        // ...
    }


    module.exports = doSomething
    ```
- Functions, classes and class members on the same indentation level are separated from each other by a single empty line.
    ```
    class SomeClass {
        constructor() {     // new indentation level ...
            // ...          // from SomeClass
        }                   // -> no empty line above required

        get property() {    // same indentation level
            // ...          // as constructor
        }                   // -> empty line above required

        doSomething() {     // same indentation level
            // ...          // as property
        }                   // -> empty line above required
    }

    class AnotherClass {    // same indentation level
        // ...              // as SomeClass
    }                       // -> empty line above required
    ```
- Code blocks inside functions may be separated from each other by a single empty line to increase readability. A code block can be any logically coherent code section. What is and is not a code block is somewhat dependend of the developers interpretation, but most control flow statements (`if...else`, `for`, `while`, ...) should be considered to define code blocks.
#### Horizontal Alignment
- Conditions in control flow statements are surrounded by a single whitespace on either side of the parentheses.
    ```
    if (condition) { ... }
      ^           ^
    ```
- Infix operators are surrounded by a single whitespace on either side.
    ```
    let areEqual = someVariable == (anotherVariable + 3)
                ^ ^            ^  ^                ^ ^
    ```
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
### Comments
- Comments are always written in their own line above the code they refer to (unlike in this guide).
    ```
    // Write comments like this.
    let someVariable = someClass.property // and not like this
    ```