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
 * Template hooks
 *******************************/

	/* Content wrappers */
	add_action( 'commercekit_before_main_content', 'commercekit_output_content_wrapper', 10 );
	add_action( 'commercekit_after_main_content', 'commercekit_output_content_wrapper_end', 10 );

	/* Sidebar */
	add_action( 'commercekit_sidebar', 'commercekit_get_sidebar', 10 );

	/* product template hooks */
	add_action( 'commercekit_after_item_title', 'commercekit_template_partial_product_price', 10 );
	add_action( 'commercekit_before_item_title', 'commercekit_template_partial_product_thumbnail', 10 );
	add_action( 'commercekit_item_title_archive', 'commercekit_template_partial_product_title_archive', 10 );
	add_action( 'commercekit_item_title_single', 'commercekit_template_partial_product_title_single', 10 );


?>
