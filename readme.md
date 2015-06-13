DECONSTIFY
===================

Replaces all ES6 constant variable declarations with traditional 'var' keyword variable declarations so that you can make use
of the 'const' variable declarations without fully committing to ES6.

USAGE:

    ```javascript

    var deconstify = require("deconstify");
    console.log(deconstify("const hello = 'world'");

    ```

OUTPUT:
var hello = 'world'


Q: How is this beneficial?

A: Two reasons

1. Making use of 'const' variables allows for more robust static code analysis and thus catch more errors before runtime
2. You can make use of UglifyJS's 'squeeze' operation to remove unreachable code. See the example:

    ```javascript
    const test = false;
    if(test){
        console.log("Uglify will remove this code because it is unreachable.");
    }

    var test = false;
    if(test){
        console.log("Uglify will not remove this code because test is not a constant.");
    }
    ```

Q: Are there any risks?

A: The risk is that a variable that was declared as constant in your source code will become variable at runtime.

Q: How does this work?

A: It makes use of the Esprima library which parses the Abstract Syntax Tree for given Javascript code. Deconstify.js
then scrapes out all of the constant variable declarations, gets the range where those declarations are made and then
does a basic string replace to swap 'const' with 'var'.