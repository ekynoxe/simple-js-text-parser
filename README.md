simple-js-text-parser
=====================

This text parser is very simple. It reads text line by line and creates HTML tags from the following markup.

* [b] creates a &lt; b &gt; tag
* [i] creates an &lt; i &gt; tag
* [u] creates an &lt; u &gt; tag
* [nl/] creates a line break (&lt; br /&gt;)
* [h url] creates an &lt; a &gt;anchor tag&lt; /a &gt;
* '[[' is how you escape the '[' character
* [/] is a close tag. You can also write a close tag as [/b], but the text inside is ignored
* You can also nest tags if you wish. [b]This [u]will [i]produce[/] the following[/][/]: <b>This <u>will <i>produce</i> the following</u></b>


Do let me know if this isn't working for you!
