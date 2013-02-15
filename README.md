SimpleConsoleJS
===============

A simple javascript console to incorporate into your web page.
This project uses [Pretty Print](http://google-code-prettify.googlecode.com/svn/trunk/README.html).

## Using

**You need includes the javascript**
```html
<script type="text/javascript" src="jquery-simpleConsoleJS/simpleConsole.js"></script>
```
**This file will include:**
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

Another way to call the plugin, is via the SIMPLE_CONSOLE_JS namespace by the Activate function
```html
<script type="text/javascript">
	SIMPLE_CONSOLE_JS.ACTIVATE();
</script>
```
This function will include the console div in the body's end

**You also can disable the link bar to github by using parameter "options"**
```html
<script type="text/javascript">
	$("#console").SimpleConsole({showBadge:false});
</script>
```

## Feedback

**Please provide your feedback!**

Use the sample, raise a Github issue, or fork the project and make suggestions.

**Download, share, promote =). After all, simple is better.**

