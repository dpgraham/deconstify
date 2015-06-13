var mocha = require("mocha");
var assert = require("assert");
var deconstify = require("deconstify");

describe('remove consts from JS code', function(){
    it('should change const to var', function(){
        assert.equal(deconstify("const answer = 42;"), "var answer = 42;");
        assert.equal(deconstify("const hello = 'abc'; const world = 'def'"), "var hello = 'abc'; var world = 'def'");
        assert.equal(deconstify("const hello = 'abc';\n x = function(){}; const world = 'def'"), "var hello = 'abc';\n x = function(){}; var world = 'def'");
        assert.equal(deconstify("var y = function(){ const goodbye = 'world' }; const hello = 'whirl'"), "var y = function(){ var goodbye = 'world' }; var hello = 'whirl'");
    });
});