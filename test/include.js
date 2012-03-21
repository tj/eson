
var Parser = require('../')
  , include = Parser.include;

describe('include', function(){
  it('should parse the given file', function(){
    Parser()
      .use(include)
      .read('test/fixtures/include.json')
      .should.eql([
        "foo",
        { foo: 'bar', bar: 'baz' },
        "bar",
        { foo: 'bar', bar: 'baz' }
      ]);
  })
})