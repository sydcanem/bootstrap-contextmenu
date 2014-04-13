$(function () {
	
	module('contextmenus');

	test('contextmenu defined on jquery object', function(){
		ok($(document.body).contextmenu, 'contextmenu method is defined');
	});

	test('returns element', function(){
		var el = $('<div />');
		ok(el.contextmenu()[0] === el[0], 'same element returned');
	});

	test('should not open context-menu if context is disabled', function(){
		var contextHTML = '<div><div id="main" data-toggle="context" data-target="#context-menu" disabled>' +
				'<div id="context-menu">' +
				'<ul class="dropdown-menu">' +
				'<li><a href="#">Action</a></li>' +
				'<li><a href="#">Something else here</a></li>' +
				'<li class="divider"></li>' +
				'<li><a href="#">Another link</a></li>' +
				'<ul>' +
				'</div>' +
				'</div>' +
				'</div>',
			contextmenu = $(contextHTML).find('[data-toggle="context"]').contextmenu().trigger('contextmenu');
		
		ok(!contextmenu.find('#context-menu').hasClass('open'), 'open class added on contextmenu');
	});
});
