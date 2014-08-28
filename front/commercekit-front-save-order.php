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
 * Process the order and initiate store to db
 *******************************/


	function _commercekit_save_order() {

		require_once(plugin_dir_path( __FILE__) . '../lib/stripe-php/lib/Stripe.php' );

		$options = get_option( 'commercekit_options' );
		$currency = $options['currency'];
		$amount = sanitize_text_field($_POST['amount']);
		$token = sanitize_text_field($_POST['stripeToken']); // Get the credit card details submitted by the form

		//process payment
		Stripe::setApiKey($options['stipe_api_key_secret']);

		try { // Create the charge on Stripe's servers - this will charge the user's card

			$charge = Stripe_Charge::create(array(
				"amount" => $amount, // amount in cents, again
				"currency" => $currency,
				"card" => $token
			));

			//all fine, save order to db
			$order_id = _commercekit_save_order_to_database($charge->id);

			echo $order_id; exit();

		} catch (Exception $e) { // The card has been declined

			header('HTTP/1.1 500 Internal Server Error');
    		exit(0);

		}
	}


/********************************
 * Store the order to db
 *******************************/


	function _commercekit_save_order_to_database($transaction_id) {

		$order = array(
		    'post_title' => $_POST['buyer_name'],
		    'post_type' => 'ck_order',
		    'post_status' => 'publish',
		    'comment_status' => 'closed',
		    'ping_status' => 'closed'
		);

		$order_id = wp_insert_post( $order );


		$order_post_meta['_order_post_created_on'] = current_time('mysql', 1);
		$order_post_meta['_order_post_products'] = sanitize_text_field($_POST['products']);
		$order_post_meta['_order_post_address'] = sanitize_text_field($_POST['address']);
		$order_post_meta['_order_post_shipping'] = sanitize_text_field($_POST['shipping']);
		$order_post_meta['_order_post_transaction_id'] = $transaction_id;
		$order_post_meta['_order_post_created_by'] = get_current_user_id();
		$order_post_meta['_order_post_total_paid'] = sanitize_text_field($_POST['total_paid']);
		$order_post_meta['_order_post_total_paid_including_shipping'] = sanitize_text_field($_POST['total_paid_including_shipping']);

		foreach ( $order_post_meta as $key => $value ) {

			// if( $post->post_type == 'revision' ) return; // don't store custom data twice

			if ( get_post_meta( $order_id, $key, FALSE ) ) {

				update_post_meta($order_id, $key, $value);

			} else {

				add_post_meta( $order_id, $key, $value );

			}

			if ( !$value ) {

				delete_post_meta( $order_id, $key );

			}
		}


		return $order_id;
	}
