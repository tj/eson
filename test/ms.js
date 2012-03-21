
var Parser = require('../')
  , ms = Parser.ms;

describe('ms', function(){
  it('should parse string ms representations', function(){
    ms('', '1000ms').should.equal(1000);
    ms('', '1s').should.equal(1000);
    ms('', '4 seconds').should.equal(4000);
    ms('', '4 seconds').should.equal(4000);
    ms('', '2 minutes').should.equal(2 * 60000);
    ms('', '1 hour').should.equal(3600000);
    ms('', '2 days').should.equal(2 * 86400000);
    ms('', '5y').should.equal(5 * 31557600000);
    ms('', '1 year').should.equal(31557600000);
    ms('', '5 years').should.equal(5 * 31557600000);
  })
})