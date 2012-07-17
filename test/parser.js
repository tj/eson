
var Parser = require('../');

describe('Parser', function(){
  describe('Parser()', function(){
    it('should return a new Parser', function(){
      Parser().should.be.an.instanceof(Parser);
    })
  })

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

  describe('.read(path)', function(){
    it('should read the JSON and apply plugins', function(){
      var parser = new Parser;
      parser.use(function(key, val){ return val.toUpperCase(); });
      var obj = parser.read('test/fixtures/config.json');
      obj.should.eql({ foo: 'BAR', bar: 'BAZ' });
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

    it('should modify when a value is returned', function(){
      var parser = new Parser;

      parser.use(function(key, val){ return 'hey'; });

      parser.parse('{ "foo": "bar" }')
        .should.eql({ foo: 'hey' });
    })

    it('should also parse objects', function(){
      var parser = new Parser
        , data = { foo: 'bar' };

      parser.parse(data).should.eql(data);
    })
  })
})
