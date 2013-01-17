Bootstrap Context Menu
======================

A context menu extension of Twitter Bootstrap made for everyone's convenience.

See a [JS Fiddle Demo] [id]
[id]:http://jsfiddle.net/msurguy/PG5HU/


Update
------

- Removed `position: relative` requirement for elements that needs context menu
- Fixed closing bug when using two context menu

Usage
-----

### Via data attributes

Add `data-toggle="context"` to any element that needs a custom context menu and via CSS set `position: relative` to the element.

Point `data-target` attribute to your custom context menu.

`<div class="context" data-toggle="context" data-target="#context-menu"></div>`

### Via Javascript

Call the context menu via JavaScript:

`$('.context').contextmenu()`

See demo.html for a complete example.

Cross-Browser Tested
--------------------

I've tested the context menu plugin on IE8+, Firefox 4+ and Chrome. Let me know if you find any compatibility issues.