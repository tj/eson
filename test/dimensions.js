
var Parser = require('../')
  , dim = Parser.dimensions;

describe('ms', function(){
  it('should return an object with width/height', function(){
    dim('', '200x400').should.eql({ width: 200, height: 400 });
  })
})