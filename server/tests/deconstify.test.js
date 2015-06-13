var mocha = require("mocha");
var assert = require("assert");
var constify = require("../deconstify");

describe('remove consts from JS code', function(){
    it('should change const to var', function(){
        assert.equal(constify("const answer = 42;"), "var answer = 42;");
        assert.equal(constify("const hello = 'abc'; const world = 'def'"), "var hello = 'abc'; var world = 'def'");
        assert.equal(constify("const hello = 'abc';\n x = function(){}; const world = 'def'"), "var hello = 'abc';\n x = function(){}; var world = 'def'");
        assert.equal(constify("var y = function(){ const goodbye = 'world' }; const hello = 'whirl'"), "var y = function(){ var goodbye = 'world' }; var hello = 'whirl'");
    });
});