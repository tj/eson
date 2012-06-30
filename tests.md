1341024169358
1341024169000
# TOC
   - [args](#args)
   - [bools](#bools)
   - [date](#date)
   - [dimensions](#dimensions)
   - [env(prefix)](#envprefix)
   - [glob](#glob)
   - [include](#include)
   - [ms](#ms)
   - [Parser](#parser)
     - [Parser()](#parser-parser)
     - [.use(fn)](#parser-usefn)
     - [.read(path)](#parser-readpath)
     - [.parse(str)](#parser-parsestr)
   - [replace](#replace)
<a name="" />
 
<a name="args" />
# args
should support --NAME.

```js
var fn = args(['foo', 'bar']);
fn('dev ui', false).should.be.false;

fn = args(['foo', '--dev-ui']);
fn('dev ui', false).should.be.true;
```

should support --no-NAME.

```js
var fn = args(['foo', '--no-dev-ui']);
fn('dev ui', true).should.be.false;
```

should support --NAME val.

```js
var fn = args(['foo', '--dev-ui', 'yes']);
fn('dev ui', false).should.equal('yes');
```

<a name="bools" />
# bools
should parse string bool representations.

```js
bools('', 'yes').should.be.true;
bools('', 'enabled').should.be.true;
bools('', 'no').should.be.false;
bools('', 'disabled').should.be.false;
bools('', true).should.be.true;
bools('', 'other').should.be.equal('other');
```

<a name="date" />
# date
<a name="dimensions" />
# dimensions
<a name="envprefix" />
# env(prefix)
<a name="glob" />
# glob
<a name="include" />
# include
<a name="ms" />
# ms
<a name="parser" />
# Parser
<a name="parser-parser" />
## Parser()
<a name="parser-usefn" />
## .use(fn)
<a name="parser-readpath" />
## .read(path)
<a name="parser-parsestr" />
## .parse(str)
<a name="replace" />
# replace
