var esprima = require("esprima");
var _ = require("lodash");

/**
 * Does an inline traversal of the node and grabs all VariableDeclarations
 *
 * @param node
 * @returns {Array}
 */
var scrapeVariableDeclarations = function(node){
    var output = [];
    if(_.isObject(node)){
        if(node.type === "VariableDeclaration" && node.kind === 'const'){
            output = [node];
        }
        var keys = _.keys(node);
        _.forEach(keys, function(key){
            output = output.concat(scrapeVariableDeclarations(node[key]));
        });
    } else if(_.isArray(node)){
        _(node).forEach(function(subNode){
            output.concat(scrapeVariableDeclarations(subNode));
        });
    }

    return output;
};

/**
 * Function that translates Javascript code
 * @param jsStr
 * @returns {*}
 */
module.exports = function(jsStr){
    // Parse the abstract syntax tree
    var ast = esprima.parse(jsStr, {range: true});

    // Get all CONST variable declarations in descending order of range
    var constVariableDeclarations = scrapeVariableDeclarations(ast);
    constVariableDeclarations = constVariableDeclarations.sort(function(declarationOne, declarationTwo){
        return declarationOne.range[0] < declarationTwo.range[0];
    });

    // Iterate through these declarations and swap out CONST with VAR
    _.forEach(constVariableDeclarations, function(item){
        var range_start = item.range[0];
        _.forEach(item.declarations, function(declaration){
            var range_end = declaration.range[0];
            jsStr = jsStr.substr(0, range_start) + "var " + jsStr.substring(range_end);
        });
    });

    // Return the modified string
    return jsStr;
};