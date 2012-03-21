
var Parser = require('../')
  , include = Parser.include;

describe('include', function(){
  it('should parse the given file', function(){
    Parser()
      .use(include)
      .read('test/fixtures/include.json')
      .should.eql([
        "foo",
        {
          "view videos": "guest",
          "delete videos": "admin"
        },
        ["admin", "guest"]
      ]);
  })
})