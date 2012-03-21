
var Parser = require('../')
  , include = Parser.include;

describe('include', function(){
  it('should parse the given file', function(){
    Parser()
      .use(include)
      .read('test/fixtures/include.json')
      .should.eql({
        permissions: { foo: 'bar', bar: 'baz' }
      });
  })
})