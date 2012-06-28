
var Parser = require('../')
  , bools = Parser.bools;

describe('ms', function(){
  it('should parse string bool representations', function(){
    bools('', 'yes').should.be.true;
    bools('', 'enabled').should.be.true;
    bools('', 'no').should.be.false;
    bools('', 'disabled').should.be.false;
    bools('', true).should.be.true;
    bools('', 'other').should.be.equal('other');
  })
})