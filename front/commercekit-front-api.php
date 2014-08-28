<?php
/*
CommerceKit, WordPress e-commerce made simple
Copyright (C) 2014 CommerceKit http://wpcommercekit.com http://wpcommercekit.com

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
*/

/********************************
 * Serve the API
 *******************************/


	if (strpos($_SERVER['REQUEST_URI'], '/commercekit_api?') !== false) {

		add_action('wp_loaded', '_commercekit_dispatch_api');

	}

	function _commercekit_dispatch_api() {

		$method = $_SERVER['REQUEST_METHOD'];
		$task = sanitize_text_field($_GET['task']);

		if ($method == 'POST') {
			if ($task == 'save_order') {
				check_ajax_referer( 'wp-commercekit' );
				_commercekit_save_order();
			}
		}

		exit();
	}
