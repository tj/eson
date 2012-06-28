
var Parser = require('../')
  , env = Parser.env;

describe('env', function(){
  it('should allow setting environment variables', function(){
    env('foo', 'bar').should.equal('bar');
    process.env.FOO = 'baz';
    env('foo', 'bar').should.equal('baz');
    process.env.DEV_UI = 'yes';
    env('dev ui', 'no').should.equal('yes');
  })
})