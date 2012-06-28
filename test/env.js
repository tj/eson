
var Parser = require('../')
  , env = Parser.env;

describe('env(prefix)', function(){
  it('should allow setting environment variables', function(){
    var fn = env();
    fn('foo', 'bar').should.equal('bar');
    process.env.FOO = 'baz';
    fn('foo', 'bar').should.equal('baz');
    process.env.DEV_UI = 'yes';
    fn('dev ui', 'no').should.equal('yes');
  })

  it('should accept a prefix', function(){
    var fn = env('NB_');
    fn('dev ui', 'no').should.equal('no');
    process.env.DEV_UI = 'yes';
    fn('dev ui', 'no').should.equal('no');
    process.env.NB_DEV_UI = 'yes';
    fn('dev ui', 'no').should.equal('yes');
  })
})