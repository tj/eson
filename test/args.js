
var Parser = require('../')
  , args = Parser.args;

describe('args', function(){
  it('should support --NAME', function(){
    var fn = args(['foo', 'bar']);
    fn('dev ui', false).should.be.false;

    fn = args(['foo', '--dev-ui']);
    fn('dev ui', false).should.be.true;
  })

  it('should support --no-NAME', function(){
    var fn = args(['foo', '--no-dev-ui']);
    fn('dev ui', true).should.be.false;
  })

  it('should support --NAME val', function(){
    var fn = args(['foo', '--dev-ui', 'yes']);
    fn('dev ui', false).should.equal('yes');
  })
})