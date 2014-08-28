<?php
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

/***********************************************************/
/* Define the `order` custom post type
/***********************************************************/


	add_action('init', 'commercekit_register_the_order_custom_post_type');


	function commercekit_register_the_order_custom_post_type() {

		//Arguments to create post type.
		$args = array(

			'labels' => array(
				'name' 			=> __('Orders', 'commercekit'),
				'singular_name' => __('Order', 'commercekit'),
				'not_found'    	=> __('No Orders found', 'commercekit'),
				'search_items' 	=> __('Search Orders', 'commercekit'),
				'edit_item' => __('Order Details', 'commercekit'),

			),

			'menu_icon' => 'dashicons-calendar',

			'capability_type' => 'post',

			'capabilities' => array(
				'create_posts' => false, // Removes support for the "Add New" function
			),

			'map_meta_cap' => true, // Set to false, if users are not allowed to edit/delete existing posts

			'show_ui'         => true,
			'supports'        => array('')

		);

		//Register type and custom taxonomy for type.
		register_post_type( 'ck_order' , $args );

	}


?>