DECONSTIFY
===================

Replaces all ES6 constant variable declaration with regular 'var' keyword variable declarations

The primary use case is to be able to make use of the 'const' variable declarations without fully committing to ES6. Allows
you to make use of the Uglify squeeze operation whereby any unreachable code is taken out

example)

const test = false;
if(test){
    console.log("Uglify will remove this code because it is definitely unreachable.");
}

var test = false;
if(test){
    console.log("Uglify will not remove this code.");
}


