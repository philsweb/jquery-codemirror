# jQuery Codemirror Plugin

http://codemirror.net/

### Install

`bower install jquery.codemirror --save`

`bower install philsweb.jquery-codemirror --save`

### Usage

In order to make CodeMirror work correctly, do not forget to start your HTML page with `<!doctype html>`

##### Initialize

`codemirrorOptions` can be `null` (ignored) or contain original CodeMirror settings

`jqueryCodemirrorOptions` can be `null` (ignored)

```
 $(...).codemirrorInit(codemirrorOptions, jqueryCodemirrorOptions);
```

`codemirrorDefaults` are:

```
mode: "text/html",
lineNumbers: true,
lineWrapping: true
```

`NB!` Do not forget to add required CodeMirror mode `mode/xml/xml.js`

`jqueryCodemirrorDefaults` are:

```
height: "auto"; (Set in CSS)
```

Height options are `auto` and `inherit`

When `auto`, CodeMirror container is auto resized. (Container's CSS parameter `height` value should be `auto`! May have `min-height`, should not have `max-height`)

When `inherit`, CodeMirror container is not resized, scroll-bar appears. (Container's CSS `height` value should not be `auto`! )


You can set CodeMirror configs in DOM element attribute `codemirror-config` or `codemirror` in JSON format. Last one is preferred when both used.

``` 
<div codemirror='{"autofocus": true, "value": "Hello world"}'></div>
```

You can set plugin configs in DOM element attribute `jquery-codemirror-config` or `jquery-codemirror` in JSON format. Last one is preferred when both used.

``` 
<div jquery-codemirror='{"height": "inherit"}'></div>
```

##### CodeMirror methods

CodeMirror object is initialized and saved for each element via `$.data(element, 'codemirror')`

You can access it and use as specified in CodeMirror manual

```
$.data($(...)][0], 'codemirror').getValue()
```

Plugin itself adds `setValue(string), getValue(), setOption(option, value), setOptions(optionsObject)`. You can access them after initialization is done.

``` 
$(...).codemirrorInit();
$(...).codemirror().getValue();
```

`NB!` Plugin's options (height) cannot be set outside initialization (yet). 
