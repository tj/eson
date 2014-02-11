
# eson

  Extended JSON for node.

## Installation

```
$ npm install eson
```

## Parser

  Currently only the parser portion is implemented, useful for configuration files.
  For example a typical configuration file might look something like the following:

```js
{
  "views": "/www/example.com/views",
  "view engine": "jade",
  "poll interval": 5000,
  "canvas size": { "width": 800, "height": 600 }
}
```

 With Extended JSON you can define plugin functions, or use ones
 bundled with eson to transform the input, allowing for more
 declarative configurations as shown here:

```js
{
  "views": "{root}/views",
  "view engine": "jade",
  "poll interval": "5 seconds",
  "canvas size": "800x600"
}
```

### Writing plugins

 Writing a plugin is simple, it's a function which takes the signature `(key, val, parser)`. Let's write one that transforms every value to "foo":

```js
function foo(key, val, parser) {
  return 'foo';
}
```

 Then use the plugin like so:

```js
var eson = require('eson');

var conf = eson()
  .use(foo)
  .read('path/to/config.json');
```

 Now suppose `path/to/config.json` contained `{ "foo": "bar", "bar": "baz" }`,
 the `foo()` plugin would yield `{ "foo": "foo", "bar": "foo" }`. So you get the picture,
 with this we can accept arbitrary strings such as "5 seconds" and transform
 it to the more useful `5000` milliseconds representation.

 Many plugins may of course be used, and _all_ will be executed regardless, so if necessary
 subsequent plugins may still make modifications. Depending on what the plugins the order used _may_ have an effect on the JSON.

```js
eson()
  .use(eson.ms)
  .use(eson.include)
  .use(eson.dimensions)
  .use(eson.replace('{root}', '/www/example.com'))
  .parse('{ "interval": "15 minutes" }');
```
### eson.ms

  The milliseconds plugin supports strings like "5s", "5 seconds", "3 days", etc:
  
```js
eson()
  .use(eson.ms)
  .parse('{ "interval": "15 minutes" }');
```

yields:

```js
{ interval: 900000 }
```

### eson.include

  The include plugin allows you to literally include other JSON files. This works in
  both arrays and object literals, and loads relative to the callee's file. For example:
  
```js
eson()
  .use(eson.include)
  .parse('{ "prod": "include config/production" }');
```

yields:

```js
{ prod: { whatever: 'is', within: 'config/production.json' }}
```

 You can also include multiple files via a glob. This has a special syntax and works in one of three ways.

Consider a config folder containing the following two files:

*database.json:*
```json
{"db", "redis"}
```
*app.json:*
```json
{"listen", 3000}
```

##### Merging multiple files into one:

```js

eson()
  .use(eson.include)
  .parse('{ "prod": "include config/*" }');
```
yields:

```js
{
	prod: {
		db: "redis",
		listen: 3000
	}
}
```

##### Collect files into a map, keyed by filename:

```js

// use curly brackets to collect as a map
eson()
  .use(eson.include)
  .parse('{ "prod": "include { config/* }" }');

```

yields:


```js
{
	prod: {
		database: {
			db: "redis"
		},
		app: {
			listen: 3000
		}
	}
}

```

##### Collect files as an array:


```js

// use square brackets to collect as an array
eson()
  .use(eson.include)
  .parse('{ "prod": "include [ config/* ]" }'); 

```

yields:

```js
{
	prod: [
		{db: "redis"},
		{listen: 3000}
	]
}
```


### eson.bools

  Convert "yes", "no", "on", "off", "enabled", "disabled" into booleans.

### eson.env([prefix])

  Allow environment variables to define config values. If you have the following:

```js
{
  "upload path": "/data/uploads"
}
```

  You could then export `UPLOAD_PATH=/tmp` to change this value. Optionally when
  a `prefix` is given such as "MYAPP_" then you must prefix such as `MYAPP_UPLOAD_PATH=/tmp`.

### eson.replace(str, val)

  The replace plugin allows you to replace arbitrary substrings, useful
  for constants such as the application's root directory etc.
  
```js
eson()
  .use(eson.replace('{root}', '/www/example.com'))
  .parse('{ "upload path": "{root}/tmp" }');
```

yields:

```js
{ "upload path": "/www/example.com/tmp" }
```

### eson.args([args])

  Parse from the given `args` or __ARGV__. For example if you have a setting
  named "dev ui" with a default value of `false`, `--dev-ui` would enable it,
  or `--dev-ui yes` would provide the value "yes" which is of course also truthy.

  To compliment `--NAME` you may also negate this, if "dev ui" is enabled by default
  then you may use `--no-dev-ui` to disable it.

### eson.glob

  The glob plugin allows you to specify glob strings, prefixed by "glob":
  
```js
eson()
  .use(eson.glob)
  .parse('{ "js": "glob public/{js,vendor}/*.js" }');
```

yields:

```js
{ js: ["public/js/app.js", "public/js/user.js", "public/vendor/jquery.js"] }
```

## moar!

  That's it for now, just experimenting with it, feel free to send me a PR
  or open and issue if you have some ideas. I'd like to keep everything
  valid JSON, for example you can use the `include` plugin to include
  env-specific config into package.json, and package.json remains a
  valid JSON document.

  For addition documentation view the [test markdown](https://github.com/visionmedia/eson/blob/master/tests.md).

## Running tests

```
$ npm install
$ make test
```

## License 

(The MIT License)

Copyright (c) 2012 TJ Holowaychuk &lt;tj@vision-media.ca&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.