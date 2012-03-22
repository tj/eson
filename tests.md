 
# dimensions

 should return an object with width/height.

```js
dim('', '200x400').should.eql({ width: 200, height: 400 });
```

# glob

 should perform a sync glob.

```js
glob('', 'glob test/fixtures/*.js').should.eql(
  ['test/fixtures/bar.js',
   'test/fixtures/baz.js',
   'test/fixtures/foo.js']
);

glob('', 'glob test/fixtures/b*.js').should.eql(
  ['test/fixtures/bar.js',
   'test/fixtures/baz.js']
);

glob('', 'glob test/fixtures/{bar,foo}.js').should.eql(
  ['test/fixtures/bar.js',
   'test/fixtures/foo.js']
);
```

# include

 should parse the given file.

```js
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
```

# ms

 should parse string ms representations.

```js
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
```

# Parser
## Parser()

 should return a new Parser.

```js
Parser().should.be.an.instanceof(Parser);
```

## .use(fn)

 should be invoked with both the key and value.

```js
var parser = new Parser;

parser.use(function(key, val){
  key.should.equal('foo');
  val.should.equal('bar');
  done();
});

parser.parse('{ "foo": "bar" }');
```

## .read(path)

 should read the JSON and apply plugins.

```js
var parser = new Parser;
parser.use(function(key, val){ return val.toUpperCase(); });
var obj = parser.read('test/fixtures/config.json');
obj.should.eql({ foo: 'BAR', bar: 'BAZ' });
```

## .parse(str)

 should invoke each plugin.

```js
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
```


 should not modify when undefined is returned.

```js
var parser = new Parser;

parser.use(function(key, val){});

parser.parse('{ "foo": "bar" }')
  .should.eql({ foo: 'bar' });
```


 should modify when a value is returned.

```js
var parser = new Parser;

parser.use(function(key, val){ return 'hey'; });

parser.parse('{ "foo": "bar" }')
  .should.eql({ foo: 'hey' });
```

# replace

 should replace occurrences of a string.

```js
replace('{root}', '/my/path')
  ('', '{root}/foo')
  .should.equal('/my/path/foo');
```

