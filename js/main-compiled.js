/*
* eventos MENÚ
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

$('#js-menu').on('click', function (e) {
	e.stopPropagation();
	$('#js-menu').toggleClass('active');
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

$('.menu_item').on('click', function (e) {
	if (!$(this).hasClass('menu_item-left')) {
		var id = $(this).attr('id');
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
		if ('none' != $('#js-menu').css('display')) {
			$('#js-menu').trigger('click');
		}
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
		zoom: 14,
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

$(document).ready(function () {});
