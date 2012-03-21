
var Parser = require('../')
  , replace = Parser.replace;

describe('replace', function(){
  it('should replace occurrences of a string', function(){
    replace('{root}', '/my/path')
      ('', '{root}/foo')
      .should.equal('/my/path/foo');
  })
})