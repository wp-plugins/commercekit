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
/* Run when uninstalling the plugin
/***********************************************************/

if ( !defined( 'WP_UNINSTALL_PLUGIN' ) ) {
	exit();
}

delete_option( 'commercekit_options' );

$products = get_posts( array( 'post_type' => 'ck_product') );

foreach( $products as $product ) {
 	wp_delete_post( $product->ID, true);
}

$taxonomy = 'ck_product_category';

$terms = get_terms($taxonomy);

$count = count($terms);
if ( $count > 0 ){
 	foreach ( $terms as $term ) {
    	wp_delete_term( $term->term_id, $taxonomy );
 	}
}