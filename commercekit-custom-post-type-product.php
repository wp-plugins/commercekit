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
/* Define the `product` custom post type
/***********************************************************/


	add_action('init', 'commercekit_register_the_product_custom_post_type');


	function commercekit_register_the_product_custom_post_type() {

		//Arguments to create post type.
		$args = array(

			'labels' => array(
				'name' => __('Products', 'commercekit'),
				'singular_name'  => __('Product', 'commercekit'),
				'add_new' => __('Add New', 'commercekit'),
				'add_new_item' => __('Add New Product', 'commercekit'),
				'not_found'    => __('No products found', 'commercekit'),
				'search_items' => __('Search Products', 'commercekit'),
				'edit_item' => __('Edit Product', 'commercekit'),
                'view_item'      => __('View Product', 'commercekit')
			),

			'menu_icon' => 'dashicons-products',

			'public'          => true,

			'show_ui'         => true,

			'capability_type' => 'post',

			'hierarchical'    => false,

			'has_archive'     => true,

			'supports'        => array('title', 'editor', 'thumbnail'),

			'rewrite'         => array('slug' => 'products', 'with_front' => true),

		);

		//Register type and custom taxonomy for type.
		register_post_type( 'ck_product' , $args );
		register_taxonomy('ck_product_category',

			array('ck_product'),

			array(
				'hierarchical'   => false,
				'label'          => __('Product Categories', 'commercekit'),
				'singular_label' => __('Category', 'commercekit'),
				'rewrite'        => array('slug' => 'product_cat', 'with_front' => true)
			)

		);
	}


?>