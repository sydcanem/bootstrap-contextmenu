$(function () {
	
	module('contextmenus');

	test('contextmenu defined on jquery object', function () {
		ok($(document.body).contextmenu, 'contextmenu method is defined');
	});

	test('returns element', function () {
		var el = $('<div />');
		ok(el.contextmenu()[0] === el[0], 'same element returned');
	});

	test('should not open context-menu if context is disabled', function () {
		var contextHTML = '<div>' +
				'<div id="main" data-toggle="context" data-target="#context-menu" disabled>' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'   <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			contextmenu = $(contextHTML).find('[data-toggle="context"]').contextmenu().trigger('contextmenu');
		
		ok(!contextmenu.find('#context-menu').hasClass('open'), 'open class added on contextmenu');
	});

	test('should add class open to menu if context is right clicked', function () {
		var contextHTML = '<div>' + 
				'<div id="main" data-toggle="context" data-target="#context-menu">' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			contextmenu = $(contextHTML).find('[data-toggle="context"]').contextmenu().trigger('contextmenu');
		
		ok(contextmenu.find('#context-menu').hasClass('open'), 'open class added on contextmenu');
	});

	test('should remove open class if body/document is clicked', function () {
		var contextHTML = '<div>' +
				'<div id="main" data-toggle="context" data-target="#context-menu">' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			contextmenu = $(contextHTML)
				.appendTo('#qunit-fixture')
				.find('[data-toggle="context"]')
				.contextmenu()
				.trigger('contextmenu');

		ok(contextmenu.find('#context-menu').hasClass('open'), 'open class added on right click');
		$('body').click();
		ok(!contextmenu.find('#context-menu').hasClass('open'), 'open class removed');
		contextmenu.remove();
	});

	test('should remove open class if body is right clicked with multiple contextmenus', function () {
		var contextHTML = '<div>' +
				'<div id="main" data-toggle="context" data-target="#context-menu">' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'<div data-toggle="context" data-target="#context-menu2">' +
				'  <div id="context-menu2">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			contextmenus = $(contextHTML).appendTo('#qunit-fixture').find('[data-toggle="context"]'),
			first = contextmenus.first(),
			last = contextmenus.last();

		ok(contextmenus.length === 2, 'Should be two contextmenus');
		// Open first contextmenu
		first.trigger('contextmenu');
		ok(first.find('#context-menu.open').length === 1, 'open class added to first on right click');
		ok($('#qunit-fixture .open').length === 1, 'only one menu is open');
		$('body').click();
		ok($('#qunit-fixture .open').length === 0, 'open class removed');
		// Open last contextmenu
		last.trigger('contextmenu');
		ok(last.find('#context-menu2.open').length === 1, 'open class added to last on right click');
		ok($('#qunit-fixture .open').length === 1, 'only one menu is open');
		$('body').click();
		ok($('#qunit-fixture .open').length === 0, 'open class removed');
		// Open both contextmenus
		first.trigger('contextmenu');
		last.trigger('contextmenu');
		ok($('#qunit-fixture .open').length === 2, 'two menus is open');
		$('body').click();
		ok($('#qunit-fixture .open').length === 0, 'both menus is closed');

		$('#qunit-fixture').html();
	});

	test('should not remove open class from other context menus if menu item is clicked', function () {
				var contextHTML = '<div>' +
				'<div id="main" data-toggle="context" data-target="#context-menu">' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'<div data-toggle="context" data-target="#context-menu2">' +
				'  <div id="context-menu2">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			contextmenus = $(contextHTML).appendTo('#qunit-fixture').find('[data-toggle="context"]'),
			first = contextmenus.first(),
			last = contextmenus.last();

		ok(contextmenus.length === 2, 'Should be two contextmenus');
		// Open both contextmenu
		first.trigger('contextmenu');
		last.trigger('contextmenu');
		ok($('#qunit-fixture .open').length === 2, 'opened two contextmenus');
		
		first.find('ul > li:first a').click();
		ok($('#qunit-fixture .open').length === 1, 'only one contextmenu');

		last.find('ul > li:first a').click();
		ok($('#qunit-fixture .open').length === 0, 'contextmenus closed');

		$('#qunit-fixture').html();
	});

	test('calls before callback', function () {
		var contextHTML = '<div>' + 
				'<div id="main" data-toggle="context" data-target="#context-menu">' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			calls = 0,
			before = function () {
				calls++;
			},
			contextmenu = $(contextHTML)
				.find('[data-toggle="context"]')
				.contextmenu({
					'before': before
				}).trigger('contextmenu');

		ok(calls === 1, 'called before callback');
		contextmenu.remove();
	});

	test('calls onItem callback if an menu item is clicked', function () {
		var contextHTML = '<div>' + 
				'<div id="main" data-toggle="context" data-target="#context-menu">' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			calls = 0,
			onItem = function () {
				calls++;
			},
			contextmenu = $(contextHTML)
				.find('[data-toggle="context"]')
				.contextmenu({
					'onItem': onItem
				})
				.trigger('contextmenu');

		contextmenu.find('ul > li:first a').click();
		ok(calls === 1, 'called onItem callback');
		contextmenu.remove();
	});

	test('should fire show and hide event', function () {
		var contextHTML = '<div>' + 
				'<div id="main" data-toggle="context" data-target="#context-menu">' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			contextmenu = $(contextHTML)
				.appendTo('#qunit-fixture')
				.find('[data-toggle="context"]')
				.contextmenu();
		
		stop();

		contextmenu
			.find('#context-menu')
			.on('show.bs.context', function () {
				ok(true, 'show was called');
			})
			.on('hide.bs.context', function () {
				ok(true, 'hide was called');
				start();
			});

		contextmenu.trigger('contextmenu');
		$(document.body).click();
	});

	test('should fire shown and hidden event', function () {
		var contextHTML = '<div>' + 
				'<div id="main" data-toggle="context" data-target="#context-menu">' +
				'  <div id="context-menu">' +
				'    <ul class="dropdown-menu">' +
				'      <li><a href="#">Action</a></li>' +
				'      <li><a href="#">Something else here</a></li>' +
				'      <li class="divider"></li>' +
				'      <li><a href="#">Another link</a></li>' +
				'    <ul>' +
				'  </div>' +
				'</div>' +
				'</div>',
			contextmenu = $(contextHTML)
				.appendTo('#qunit-fixture')
				.find('[data-toggle="context"]')
				.contextmenu();
		
		stop();

		contextmenu
			.find('#context-menu')
			.on('shown.bs.context', function () {
				ok(true, 'shown was called');
			})
			.on('hidden.bs.context', function () {
				ok(true, 'hidden was called');
				start();
			});

		contextmenu.trigger('contextmenu');
		$(document.body).click();
	});
});
