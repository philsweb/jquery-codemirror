# jQuery Codemirror Plugin

http://codemirror.net/

### Install

`bower install jquery.codemirror --save`
`bower install philsweb.jquery-codemirror --save`

### Usage

In order to make CodeMirror work correctly, do not forget to start your HTML page with `<!doctype html>`

##### Initialize

`options` can be `null` or contain original CodeMirror settings

```
 $(...).codemirrorInit(options);
```

`defaults` are:

```
mode: "text/html",
lineNumbers: true,
lineWrapping: true
```

`NB!` Do not forget to add required mode `mode/xml/xml.js`

You can set configs in DOM element attribute `codemirror-config`

``` 
<div codemirror-config='{"autofocus": true, "value": "Hello world"}'></div>
```

##### CodeMirror methods

CodeMirror object is initialized and saved for each element via `$.data(element, 'codemirror)`

You can access it and use as specified in CodeMirror manual

```
$.data($(...)][0], 'codemirror').getValue()
```

Plugin itself adds `setValue(string), getValue(), setOption(option, value), setOptions(optionsObject)`

``` 
$(...).codemirror().getValue()
```
