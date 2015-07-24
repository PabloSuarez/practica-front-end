// babel -w main.js --out-file ../../js/main.compiled.js

/*
* eventos MENÚ mobile
*/
'use strict';

function menu_activar(id) {
	$(id).toggleClass('js-active');
}

function menu_desplegar(id) {
	if ($(id).hasClass('js-active')) {
		$(id).css('display', 'list-item');
	} else {
		menu_ocultar(id);
	}
}

function menu_ocultar(id) {
	$(id).fadeOut(200);
}

$('.js-menu-mobile').on('click', function (e) {
	e.stopPropagation();
	$('.js-menu-mobile').toggleClass('active');
	menu_activar('#js-menu-items');
	menu_desplegar('#js-menu-items');
});
/* final MENÚ */

/*
* items MENÚ
*/
function ocultarSectionContent() {
	$('.section_content').css('display', 'none');
}

function mostrarSectionContent(id) {
	ocultarSectionContent();
	$(id).fadeIn(200);
}

$('.js-menu').on('click', function (e) {
	var id = e.target.id;
	var element = $('#' + id);
	if (id == 'session') {
		changeSessionCookie();
	} else {
		var main = '#js-main';
		// Si llamo a index
		if (id == 'index') {
			$('.aside_title').show();
			if (!$(main).hasClass('flex_container-flex-center')) {
				$(main).addClass('flex_container-flex-center');
				$(main).removeClass('flex_container-flex-start');
			}
		} else {
			$('.aside_title').hide();
			if ($(main).hasClass('flex_container-flex-center')) {
				$(main).removeClass('flex_container-flex-center');
				$(main).addClass('flex_container-flex-start');
			}
		}
		mostrarSectionContent('#' + id + '_content');
		if (id == 'js') {
			loadMap();
		}
	}
	// para saber si estoy en mobile
	if ('none' != $('.js-menu-mobile').css('display')) {
		$('.js-menu-mobile').trigger('click');
	}
});
/* final ITEMS MENÚ */

/*
* COOKIE
*/
function setCookie(cname, cvalue, exdays) {
	var d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	var expires = 'expires=' + d.toUTCString();
	document.cookie = cname + '=' + cvalue + '; ' + expires;
}

function getCookie(cname) {
	var name = cname + '=';
	var ca = document.cookie.split(';');
	for (var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
	}
	return '';
}

function changeSessionCookie() {
	var name = getCookie('username');
	if (!name) {
		checkSessionCookie();
	} else {
		cleanSessionCookie();
	}
}

function cleanSessionCookie() {
	document.cookie = 'username=;0';
	$('#session').text($('#session').attr('data-text-default'));
}

function checkSessionCookie() {
	var user = getCookie('username');
	if (!user) {
		user = prompt('Por favor ingrese su nombre: ', '');
		if (user != '' && user != null) {
			setCookie('username', user, 365);
		}
	}

	if (!user) {
		$('#session').text($('#session').attr('data-text-default'));
	} else {
		$('#session').text($('#session').attr('data-text-active'));
	}
}
/* final COOKIE */

/*
* GoogleMaps
*/
function loadMap() {
	var estadio = new google.maps.LatLng(-34.8945376, -56.1528289);

	var ubicaciones = [['Estadio Centenario', -34.8945376, -56.1528289, 1], ['Obelisco', -33.923036, 151.259052, 5], ['Pocitos', -34.9102703, -56.1426473, 3], ['Casino Carrasco', -34.8906959, -56.0553118, 4], ['Cerro Montevideo', -34.8886106, -56.2580556, 2], ['London', 51.5286416, -0.1015987, 6], ['Paris', 48.8588589, 2.3470599, 7], ['Curitiba', -25.4951519, -49.2874025, 8], ['Miami', 25.782324, -80.2310801, 9], ['Port Elizabeth', -33.953514, 25.612974, 10]];

	var marker;
	var map;

	function toggleBounce() {
		if (marker.getAnimation() != null) {
			marker.setAnimation(null);
		} else {
			marker.setAnimation(google.maps.Animation.BOUNCE);
		}
	}

	var mapOptions = {
		zoom: 10,
		center: estadio
	};

	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

	for (var i = 0; i < ubicaciones.length; i++) {
		var ub = ubicaciones[i];
		var pos = new google.maps.LatLng(ub[1], ub[2]);
		var marker = new google.maps.Marker({
			position: pos,
			map: map,
			title: ub[0],
			animation: google.maps.Animation.DROP,
			zIndex: ub[3]
		});
		google.maps.event.addListener(marker, 'click', toggleBounce);
	}
}
/* final GoogleMaps */

/*
*	funciones para manejar PROMISES
*/
function getPromise(url) {
	return Promise.resolve($.get(url));
}
/* fin PROMISES */

/*
* cargo REPOS desde GITHUB
*/
function leoRepositorios(url) {
	!url ? url = 'https://api.github.com/users/pablosuarez/repos' : false;
	getPromise(url).then(function (data) {
		cargoRepositorios(data);
	});
}

function cargoRepositorios(data) {
	var repositorio = '\n\t<li class="list_item">\n\t\t<div class="list_item_head">\n\t\t\t<div class="list_item_head_title">BRANCH-NAME</div>\n\t\t\t<div class="list_item_head_page"><a class="list_item_head_page_link" href="BRANCH-HOMEPAGE" target="_blank">BRANCH-HOMEPAGE</a></div>\n\t\t</div>\n\t\t<div class="list_item_body">\n\t\t\t<div class="">BRANCH-DESCRIPTION</div>\n\t\t\t<div class="">BRANCH-LANGUAGE</div>\n\t\t\t<div class="">BRANCH-UPDATE</div>\n\t\t\t<div class="">BRANCH-CLONE</div>\n\t\t\t<div class="">BRANCH-URL</div>\n\t\t</div>\n\t</li>';

	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var repo = _step.value;

			// console.log(repo)
			repositorio = repositorio.replace('BRANCH-URL', repo.html_url);
			repositorio = repositorio.replace('BRANCH-NAME', repo.name);
			repositorio = repositorio.replace('BRANCH-HOMEPAGE', repo.homepage);
			repositorio = repositorio.replace('BRANCH-HOMEPAGE', repo.homepage);
			repositorio = repositorio.replace('BRANCH-DESCRIPTION', repo.description);
			repositorio = repositorio.replace('BRANCH-LANGUAGE', repo.language);
			repositorio = repositorio.replace('BRANCH-UPDATE', repo.updated_at);
			repositorio = repositorio.replace('BRANCH-CLONE', repo.clone_url);
			// console.log(repositorio)
			$('#list_repositories_item').append(repositorio);
			return;
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator['return']) {
				_iterator['return']();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}
}
/* final REPOS desde GITHUB */

$(document).ready(function () {
	leoRepositorios();
});
