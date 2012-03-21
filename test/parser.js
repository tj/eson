
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

  describe('.parse(str)', function(){
    it('should invoke each plugin', function(done){
      var parser = new Parser
        , calls = [];

      parser.use(function(key, val){
        key.should.equal('foo');
        val.should.equal('bar');
        calls.push('a');
      });

      parser.use(function(key, val){
        key.should.equal('foo');
        val.should.equal('bar');
        calls.push('b');
        calls.should.eql(['a', 'b']);
        done();
      });

      parser.parse('{ "foo": "bar" }');
    })

    it('should not modify when undefined is returned', function(){
      var parser = new Parser;

      parser.use(function(key, val){});

      parser.parse('{ "foo": "bar" }')
        .should.eql({ foo: 'bar' });
    })
  })
})