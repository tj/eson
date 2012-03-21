
var Parser = require('../');

describe('Parser', function(){
  describe('.use(fn)', function(){
    it('should be invoked with both the key and value', function(done){
      var parser = new Parser;

      parser.use(function(key, val){
        key.should.equal('foo');
        val.should.equal('bar');
        done();
      });

      parser.parse('{ "foo": "bar" }');
    })
  })
})