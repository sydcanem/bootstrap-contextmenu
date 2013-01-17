/*!
 * Bootstrap Context Menu
 * Version: 2.0
 * A small variation of the dropdown plugin by @sydcanem
 * https://github.com/sydcanem/bootstrap-contextmenu
 *
 * Twitter Bootstrap (http://twitter.github.com/bootstrap).
 */

/* =========================================================
 * bootstrap-dropdown.js
 * http://twitter.github.com/bootstrap/
 * =========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

!(function($) {

  "use strict"; // jshint ;_;

  /* CONTEXTMENU CLASS DEFINITION
   * ============================ */

  var toggle = '[data-toggle=context]'
    , ContextMenu = function (element) {
        var $el = $(element).on('contextmenu.context.data-api', this.toggle);
        var $target = $($el.attr('data-target'));
        $('html').on('click.context.data-api', function (e) {
          if (!e.ctrlKey) {
            $target.removeClass('open');
          }
        });
      }

  ContextMenu.prototype = {

    constructor: ContextMenu
    ,toggle: function(e) {

      var $this = $(this)
        , $menu
        , $contextmenu;

      if ($this.is('.disabled, :disabled')) return;

      $menu = getMenu($this);
      $menu.removeClass('open');

      var tp = getPosition(e, $menu);
      $menu.attr('style', '')
              .css(tp)
              .toggleClass('open');

      return false;
    }

  }

  function getMenu($this) {
    var selector = $this.attr('data-target')
      , $menu;

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    $menu = $(selector);

    return $menu;
  }

  function getPosition(e, $menu) {
    var mouseX = e.pageX
      , mouseY = e.pageY
      , boundsX = $(window).width()
      , boundsY = $(window).height()
      , menuWidth = $menu.find('.dropdown-menu').outerWidth()
      , menuHeight = $menu.find('.dropdown-menu').outerHeight()
      , tp = {"position":"absolute"}
      , Y, X;

    if (mouseY + menuHeight > boundsY) {
      Y = {"top": mouseY - menuHeight};
    } else {
      Y = {"top": mouseY};
    }

    if (mouseX + menuWidth > boundsX) {
      X = {"left": mouseX - menuWidth};
    } else {
      X = {"left": mouseX};
    }

    return $.extend(tp, Y, X);
  }

  function clearMenus(e) {
    if (!e.ctrlKey) {
      $(toggle).each(function() {
        getMenu($(this))
          .removeClass('open');
      });
    }
  }

  /* CONTEXT MENU PLUGIN DEFINITION
   * ========================== */

  $.fn.contextmenu = function (option) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('context');
      if (!data) $this.data('context', (data = new ContextMenu(this)));
      if (typeof option == 'string') data[option].call($this);
    });
  }

  $.fn.contextmenu.Constructor = ContextMenu;

  /* APPLY TO STANDARD CONTEXT MENU ELEMENTS
   * =================================== */

  $(function () {
    $('html')
      .on('click.context.data-api', clearMenus)
    $('body')
      .on('contextmenu.context.data-api', toggle, ContextMenu.prototype.toggle);
  });

}(window.jQuery));
