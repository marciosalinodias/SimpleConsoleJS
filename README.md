SimpleConsoleJS
===============

A simple javascript console to incorporate into your web page.
This project uses [Pretty Print](http://google-code-prettify.googlecode.com/svn/trunk/README.html).

## Using

**You need includes the javascript**
```html
<script type="text/javascript" src="jquery-simpleConsoleJS/simpleConsole.js"></script>
```
This file will include:
* [simpleConsole.css](https://github.com/marciosalinodias/SimpleConsoleJS/blob/master/jquery-simpleConsoleJS/_css/simpleConsole.css)
* [prettify.js](https://github.com/marciosalinodias/SimpleConsoleJS/blob/master/jquery-simpleConsoleJS/_js/prettify.js)
* [prettify.css](https://github.com/marciosalinodias/SimpleConsoleJS/blob/master/jquery-simpleConsoleJS/_css/prettify.css)

**After that, just call the plugin in a container element**
```html
<div id="console" style="width: 800px; height: 500px;"></div>

<script type="text/javascript">
	$("#console").SimpleConsole();
</script>
```

Another way to call the plugin, is via the SIMPLE_CONSOLE_JS namespace by the Activate function:
```html
<script type="text/javascript">
	SIMPLE_CONSOLE_JS.ACTIVATE();
</script>
```
This function will include the console div in the body's end.

## Options

**You also can setup `options` in the plugin**
```html
<script type="text/javascript">
	$("#console").SimpleConsole({cssPath:"../my-css-path/"});
</script>
```
```html
<script type="text/javascript">
	SIMPLE_CONSOLE_JS.ACTIVATE({jsPath:"../my-js-path/"});
</script>
```

**The options are:**
* `options` Object
  * `showBadge` Boolean. Show/Hide the link bar to github.
  * `cssPath` String. Path to intern css files of the plugin. The cssPath is relative path to simpleConsole.js file.
  * `jsPath` String. Path to intern js files of the plugin. The jsPath is relative path to simpleConsole.js file.

## Feedback

**Please provide your feedback!**

Use the sample, raise a Github issue, or fork the project and make suggestions.

**Download, share, promote =). After all, simple is better.**

