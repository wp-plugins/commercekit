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

include plugin_dir_path( __FILE__ ) . 'commercekit-front-template-utilities.php';
include plugin_dir_path( __FILE__ ) . 'commercekit-front-template-hooks.php';
include plugin_dir_path( __FILE__ ) . 'commercekit-front-custom-post-type.php';
include plugin_dir_path( __FILE__ ) . 'commercekit-front-save-order.php';
include plugin_dir_path( __FILE__ ) . 'commercekit-front-api.php';

/****************************************************
 * Add stylesheet to the page
 ****************************************************/


	add_action( 'wp_enqueue_scripts', 'safely_add_stylesheet_and_scripts' );

	function safely_add_stylesheet_and_scripts() {

		if ( get_post_type() == 'ck_product' ) {

			wp_enqueue_script( 'jquery' );
			wp_enqueue_script( 'commercekit-js-lib-store', plugins_url( '../lib/store.min.js', __FILE__ ) );
			wp_enqueue_script( 'commercekit-js-lib-validate-email', plugins_url( '../lib/verimail.min.js', __FILE__ ) );
			wp_enqueue_script( 'commercekit-js-lib', plugins_url( '../lib/commercekit.lib.js', __FILE__ ) );
			wp_enqueue_script( 'commercekit-js-app', plugins_url( '../front/assets/commercekit-app.js', __FILE__ ) );
			wp_enqueue_script( 'commercekit-js-cart', plugins_url( '../front/assets/commercekit-cart.js', __FILE__ ) );
			wp_enqueue_script( 'commercekit-js-checkout', plugins_url( '../front/assets/commercekit-checkout.js', __FILE__ ) );

			wp_enqueue_script( 'commercekit-js-cart-teaser', plugins_url( '../front/assets/commercekit-cart-teaser.js', __FILE__ ) );
			wp_enqueue_script( 'commercekit-js-dom-script', plugins_url( '../front/assets/commercekit-dom-script.js', __FILE__ ) );

			wp_enqueue_style( 'commercekit-css', plugins_url( '../front/assets/commercekit.css', __FILE__ ) );

			if ( is_single() ) {

				wp_enqueue_style( 'commercekit-css-single-product', plugins_url( '../front/assets/commercekit-single-product.css', __FILE__ ) );

			} elseif ( is_archive() ) {

				wp_enqueue_style( 'commercekit-products-list', plugins_url( '../front/assets/commercekit-products-list.css', __FILE__ ) );

			}

			//Send the CommerceKit options to JS
			$options = get_option( 'commercekit_options' );
			unset($options['stipe_api_key_secret']);

		    $options['save_order_url'] = site_url('/commercekit_api?task=save_order');
		    $options['nonce'] = wp_create_nonce( 'wp-commercekit' );

			wp_localize_script( 'commercekit-js-app', 'commercekit_options', $options );

			wp_localize_script( 'commercekit-js-lib', 'commercekit_strings', array(

				'Order subtotal' => __( 'Order subtotal', 'commercekit' ),
				'View Cart' => __( 'View Cart', 'commercekit' ),
				'item in your cart' => __('item in your cart', 'commercekit'),
				'items in your cart' => __('items in your cart', 'commercekit'),
				'Please fill all the required fields' => __('Please fill all the required fields', 'commercekit'),
				'Item added to cart' => __('Item added to cart', 'commercekit'),
				'Value not acceptable' => __('Value not acceptable', 'commercekit'),
				'Sorry, the email is not valid. Did you mean' => __('Sorry, the email is not valid. Did you mean', 'commercekit'),
				'Sorry, the email is not valid.' => __('Sorry, the email is not valid.', 'commercekit'),
				'Payment not successful. Please retry.' => __('Payment not successful. Please retry.', 'commercekit'),
			) );

		}

	}
