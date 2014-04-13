/*!
 * Bootstrap Context Menu
 * Version: 2.0
 * A small variation of the dropdown plugin by @sydcanem
 * https://github.com/sydcanem/bootstrap-contextmenu
 *
 * New options added by @jeremyhubble for javascript launching
 *  $('#elem').contextmenu({target:'#menu',before:function(e) { return true; } });
 *
 *
 * Twitter Bootstrap (http://twitter.github.com/bootstrap).
 */

/* =========================================================
 * bootstrap-contextmenu.js
 * =========================================================
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

;(function($) {

	'use strict';

	/* CONTEXTMENU CLASS DEFINITION
	 * ============================ */
	var toggle = '[data-toggle="context"]';

	var ContextMenu = function (element, options) {
		this.$elements = $(element);

		this.before = options.before || this.before;
		this.onItem = options.onItem || this.onItem;
		this.scopes = options.scopes || null;

		if (options.target) {
			this.$elements.attr('data-target', options.target);
		}

		this.listen();
	};

	ContextMenu.prototype = {

		constructor: ContextMenu
		,show: function(e) {

			var $this = $(this)
				, $menu
				, evt
				, tp
				, items
				, relatedTarget = { relatedTarget: this };

			if ($this.is('.disabled, :disabled')) return;

			this.closemenu();

			if (!this.before.call(this,e,$(e.currentTarget))) return;

			$menu = this.getMenu();
			$menu.trigger(evt = $.Event('show.bs.context', relatedTarget));

			tp = this.getPosition(e, $menu);
			items = 'li:not(.divider)';
			$menu.attr('style', '')
				.css(tp)
				.addClass('open')
				.on('click.context.data-api', items, this.onItem.bind(this, $(e.currentTarget)))
				.trigger('shown.bs.context', relatedTarget);

			// Delegating the `closemenu` only on the currently opened menu.
			// This prevents other opened menus from closing.
			$('html')
				.on('click.context.data-api', $menu.selector, $.proxy(this.closemenu, this));

			return false;
		}

		,closemenu: function(e) {
			var $menu
				, evt
				, items
				, relatedTarget;

			$menu = this.getMenu();

			if(!$menu.hasClass('open')) return;

			relatedTarget = { relatedTarget: this };
			$menu.trigger(evt = $.Event('hide.bs.context', relatedTarget));

			items = 'li:not(.divider)';
			$menu.removeClass('open')
				.off('click.context.data-api', items)
				.trigger('hidden.bs.context', relatedTarget);

			$('html')
				.off('click.context.data-api', $menu.selector);
			// Don't propagate click event so other currently
			// opened menus won't close.
			return false;
		}

		,before: function(e) {
			return true;
		}

		,onItem: function(e) {
			return true;
		}

		,listen: function () {
			this.$elements.on('contextmenu.context.data-api', this.scopes, $.proxy(this.show, this));
			$('html').on('click.context.data-api', $.proxy(this.closemenu, this));
		}

		,destroy: function() {
			this.$elements.off('.context.data-api').removeData('context');
			$('html').off('.context.data-api');
		}

		,getMenu: function () {
			var selector = this.$elements.attr('data-target')
				, $menu;

			if (!selector) {
				selector = this.$elements.attr('href');
				selector = selector && selector.replace(/.*(?=#[^\s]*$)/, ''); //strip for ie7
			}

			$menu = $(selector);

			return $menu;
		}

		,getPosition: function(e, $menu) {
			var mouseX = e.clientX
				, mouseY = e.clientY
				, boundsX = $(window).width()
				, boundsY = $(window).height()
				, menuWidth = $menu.find('.dropdown-menu').outerWidth()
				, menuHeight = $menu.find('.dropdown-menu').outerHeight()
				, tp = {"position":"absolute","z-index":9999}
				, Y, X;

			if (mouseY + menuHeight > boundsY) {
				Y = {"top": mouseY - menuHeight + $(window).scrollTop()};
			} else {
				Y = {"top": mouseY + $(window).scrollTop()};
			}

			if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
				X = {"left": mouseX - menuWidth + $(window).scrollLeft()};
			} else {
				X = {"left": mouseX + $(window).scrollLeft()};
			}

			return $.extend(tp, Y, X);
		}

	};

	/* CONTEXT MENU PLUGIN DEFINITION
	 * ========================== */

	$.fn.contextmenu = function (option,e) {
		var $this = this;
		return (function () {
			var data = $this.data('context')
				, options = (typeof option == 'object') && option;

			if (!data) $this.data('context', (data = new ContextMenu($this, options)));
			if (typeof option == 'string') data[option].call(data, e);
		})();
	};

	$.fn.contextmenu.Constructor = ContextMenu;

	/* APPLY TO STANDARD CONTEXT MENU ELEMENTS
	 * =================================== */

	$(document)
		.on('contextmenu.context.data-api', toggle, function(e) {
			$(this).contextmenu('show', e);
			e.preventDefault();
		});

}(jQuery));
