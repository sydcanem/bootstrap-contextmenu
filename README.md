Bootstrap Context Menu
======================

A context menu extension of Twitter Bootstrap made for everyone's convenience.

See a [new Fiddle] [id] showing the javascript parameters
[id]:http://jsfiddle.net/sydcanem/W4rkT/

Change log
----------

24/05/2013
- Added `onItem` argument element where the event was set

13/05/2013
- Added `onItem` option which is called whenever an item is clicked in the context menu
- Added before, target options to javascript usage (`before` and `target`)
- Fixed error with menu appearing off the screen

26/03/2013
- Removed `position: relative` requirement for elements that needs context menu
- Fixed closing bug when using multiple context menu in a single page

Todo
----

- Tests

Usage
-----

### Via data attributes

Add `data-toggle="context"` to any element that needs a custom context menu and via CSS set `position: relative` to the element.

Point `data-target` attribute to your custom context menu.

`<div class="context" data-toggle="context" data-target="#context-menu"></div>`

### Via Javascript

Call the context menu via JavaScript:

    $('.context').contextmenu({
      target:'#context-menu', 
      before: function(e,element) {
        // execute code before context menu if shown
      },
      onItem: function(e, item, element) {
        // execute on menu item selection
      }
    })

`target` is the equivalent of the `data-target` attribute. It identifies the html that will be displayed. 

`before` is a function that is called before the context menu is displayed. If this function returns false, the context menu will not be displayed. It is passed two parameters,

  - `e` - the original event. (You can do an `e.preventDefault()` to cancel the browser event) 
  - `element` - the element where the event was set

`onItem` - function to be called when a menu item in contextmenu is clicked. Useful when you want to execute a specific function when an item is clicked. It is passed two parameters,

  - `e` - the click event.
  - `item` - the element of the menu item
  - `element` - the element where the event was set


Example
-------

Activate and specify selector for context menu

    $('#main').contextmenu({'target':'#context-menu'});

Activate within a div, but not on spans

    $('#main').contextmenu({
        target: '#context-menu2',
        before: function (e, element, target) {
            e.preventDefault();
            if (e.target.tagName == 'SPAN') {
                e.preventDefault();
                this.closemenu();
                return false;
            }
            return true;
        }
    });

Modify the menu dynamically

    $('#main').contextmenu({
      target: "#myMenu",
      before: function(e) { 
        this.getMenu().find("li").eq(2).find('a').html("This was dynamically changed");
      }
    });

Show menu name on selection

    $('#main').contextmenu({
      onItem: function(e, item) {
        alert($(item).text());
      }
    });



See demo.html for a complete example.

Cross-Browser Tested
--------------------

I've tested the context menu plugin on IE8+, Firefox 4+ and Chrome. Let me know if you find any compatibility issues.
