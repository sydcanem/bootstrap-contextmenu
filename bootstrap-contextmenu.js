/*!
 * Bootstrap Context Menu
 * Version: 2.1
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

!(function($) {

	"use strict"; // jshint ;_;

	/* CONTEXTMENU CLASS DEFINITION
	 * ============================ */

	var ContextMenu = function (elements, options) {
			this.$elements = $(elements)
			this.options = options
			this.before = this.options.before || this.before
			this.onItem = this.options.onItem || this.onItem
			if (this.options.target)
				this.$elements.attr('data-target',this.options.target)

			this.listen()
		}

	ContextMenu.prototype = {

		constructor: ContextMenu
		,show: function(e) {

			var $this = $(this)
				, $menu
				, $contextmenu
				, evt;


			if ($this.is('.disabled, :disabled')) return;

			evt = $.Event('context');
			if (!this.before.call(this,e,$(e.currentTarget))) return;
			this.$elements.trigger(evt);

			$menu = this.getMenu();

			var tp = this.getPosition(e, $menu);
			$menu.attr('style', '')
				.css(tp)
				.data('_context_this_ref', this)
				.addClass('open');


			return false;
		}

		,closemenu: function(e) {
			this.getMenu().removeClass('open');
		}

		,before: function(e) {
			return true;
		}

		,onItem: function(e, context) {
			return true;
		}

		,listen: function () {
			var _this = this;
			this.$elements
					.on('contextmenu.context.data-api', $.proxy(this.show, this));
			$('html')
					.on('click.context.data-api', $.proxy(this.closemenu, this));

			var $target = $(this.$elements.attr('data-target'));

			$target.on('click.context.data-api', function (e) {
				if($(this).data('_context_this_ref') == _this) {
					_this.onItem.call(this,e,$(e.target));
				}
			});

			$('html').on('click.context.data-api', function (e) {
				if (!e.ctrlKey) {
					$target.removeClass('open');
				}
			});
		}

		,destroy: function() {
			this.$elements.off('.context.data-api').removeData('context');
			$('html').off('.context.data-api');

			var $target = $(this.$elements.attr('data-target'));
			$target.off('.context.data-api');
		}

		,getMenu: function () {
			var selector = this.$elements.attr('data-target')
				, $menu;

			if (!selector) {
				selector = this.$elements.attr('href')
				selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
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
				, tp = {"position":"fixed"}
				, Y, X;

			if (mouseY + menuHeight > boundsY) {
				Y = {"top": mouseY - menuHeight};
			} else {
				Y = {"top": mouseY};
			}

			if ((mouseX + menuWidth > boundsX) && ((mouseX - menuWidth) > 0)) {
				X = {"left": mouseX - menuWidth};
			} else {
				X = {"left": mouseX};
			}

			return $.extend(tp, Y, X);
		}

		,clearMenus: function(e) {
			if (!e.ctrlKey) {
				$('[data-toggle=context]').each(function() {
					this.getMenu()
						.removeClass('open');
				});
			}
		}
	}

	/* CONTEXT MENU PLUGIN DEFINITION
	 * ========================== */

	$.fn.contextmenu = function (option,e) {
		var $this = this;
		return (function () {
			var data = $this.data('context')
				, options = typeof option == 'object' && option

			if (!data) $this.data('context', (data = new ContextMenu($this, options)));
			// "show" method must also be passed the event for positioning
			if (typeof option == 'string') data[option].call(data,e);
		})();
	}

	$.fn.contextmenu.Constructor = ContextMenu;

	/* APPLY TO STANDARD CONTEXT MENU ELEMENTS
	 * =================================== */

	$(document)
		.on('contextmenu.context.data-api', '[data-toggle=context]', function(e) {
				$(this).contextmenu('show',e);
				e.preventDefault();
		});

}(window.jQuery));
