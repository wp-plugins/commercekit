<?php
/*
	Plugin Name:    CommerceKit
	Plugin URI:     wpcommercekit.com
	Description:    The simplest e-commerce plugin for Wordpress
	Version:		1.0
	Author:			CommerceKit
	Author URI:		http://wpcommercekit.com
	License:		GPLv2
*/

/*
CommerceKit, WordPress e-commerce made simple
Copyright (C) 2014 CommerceKit http://wpcommercekit.com

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

/****************************************************
 * Load translations
 ****************************************************/


	load_plugin_textdomain( 'commercekit', false, 'commercekit/languages' );


/****************************************************
 * Load proper PHP files
 ****************************************************/


	include plugin_dir_path( __FILE__ ) . 'commercekit-custom-post-type-product.php';
	include plugin_dir_path( __FILE__ ) . 'commercekit-custom-post-type-order.php';


	if ( is_admin() ) {

		include plugin_dir_path( __FILE__ ) . 'back/commercekit-back.php';

	} else {

		include plugin_dir_path( __FILE__ ) . 'front/commercekit-front.php';

	}


/****************************************************
 * Create default settings when installing CommerceKit
 ****************************************************/


	register_activation_hook( __FILE__, 'commercekit_install' );

	function commercekit_install() {

		$options = array(
			'currency' => 'USD',
			'currency_position' => 'before',
			'currency_symbol' => '$',
			'stipe_api_key_secret' => 'sk_test_4okloV9Jsu3IiBSc4Y3zHXeZ',
			'stipe_api_key_public' => 'pk_test_8OfS5r77VXHMXE7Nszjlzwc6',
			'taxes_settings' => '{\"items\":[{\"country_name\":\"all\",\"rate\":\"0\",\"type\":\"group\"}]}',
			'shipping_settings' => '{\"items\":[{\"allowed_countries\":[{\"name\":\"all\",\"type\":\"group\"}],\"name\":\"Free shipping\",\"rate\":\"0\",\"disallowed_countries\":[]}]}',
			'selling_settings' => '{\"items\":[{\"country_name\":\"all\",\"type\":\"group\"}],\"exceptions\":[]}',
			'taxes_included_in_products_prices' => 1
		);

		update_option( 'commercekit_options', $options );

		// insert the post and set the category
		$post_id = wp_insert_post(array (
		    'post_type' => 'ck_product',
		    'post_title' => 'Test',
		    'post_content' => 'Test product description',
		    'post_status' => 'publish',
		    'comment_status' => 'closed',
		    'ping_status' => 'closed'
		));

		if ($post_id) {
		    add_post_meta($post_id, 'price', 1);
		}

	}

