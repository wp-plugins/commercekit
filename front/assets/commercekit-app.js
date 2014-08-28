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

(function() {


	var CommerceKit = {};
	CommerceKit.items = [];


/***********************************************************/
/* Correctly transform JSON settings into JS Objects to act on
/***********************************************************/


	jQuery(document).ready(function() {

		for ( var i in window.commercekit_options ) {

			if ( commercekit_options.hasOwnProperty( i ) ) {

				try {
					commercekit_options[ i ] = JSON.parse( commercekit_options[i].replace(/(\\\")/g, '\"' ) );
				} catch(e) {
					//not JSON, do nothing
				}

				if (commercekit_options[ i ] === "{}") {
					commercekit_options[ i ] = {};
				}

			}

		}

	});


/***********************************************************/
/* Handle clicking on + or - in the single product quantity form, and in the cart
/***********************************************************/


	jQuery(document).delegate('.add-one, .remove-one', 'click', function() {

		// Get values
		var $qty = jQuery( this ).closest( '.quantity' ).find( '.js__commercekit__quantity-box-cart' );
		var currentVal = parseFloat( $qty.val() );
		var max = parseFloat( $qty.attr( 'max' ) );
		var min = parseFloat( $qty.attr( 'min' ) );

		// Format values
		if ( ! currentVal || currentVal === '' || currentVal === 'NaN' ) currentVal = 0;
		if ( max === '' || max === 'NaN' ) max = '';
		if ( min === '' || min === 'NaN' ) min = 0;

		// Change the value
		if ( jQuery( this ).is( '.add-one' ) ) {

			if ( max && ( max == currentVal || currentVal > max ) ) {
				$qty.val( max );
			} else {
				$qty.val( currentVal + 1 );
			}

		} else {

			if ( min && ( min == currentVal || currentVal < min ) ) {
				$qty.val( min );
			} else if ( currentVal > 0 ) {
				$qty.val( currentVal - 1 );
			}

		}

		// Trigger change event
		$qty.trigger( 'change' );
	});


/***********************************************************/
/* Count the number of items in the cart
/***********************************************************/


	CommerceKit.numberOfItemsInCart = function numberOfItemsInCart(item) {
		var items_number = 0;
		var i = 0;

		while (i < CommerceKit.items.length) {
			items_number += parseInt(CommerceKit.items[i].product_quantity, 10);
			i++;
		}

		return parseInt(items_number, 10);
	};


/***********************************************************/
/* Calculate the cart total price
/***********************************************************/


	CommerceKit.cartTotalPrice = function cartTotalPrice(item) {
		var orderPrice = 0;
		var i = 0;

		while (i < CommerceKit.items.length) {
			orderPrice += CommerceKit.items[i].product_price * CommerceKit.items[i].product_quantity;
			i++;
		}

		orderPrice = parseFloat(orderPrice).toFixed(2);
		return orderPrice;
	};


/***********************************************************/
/* Add a product to the cart
/***********************************************************/


	CommerceKit.addProduct = function addProduct(product_id, product_title, product_price, product_quantity) {

		var existing_products = jQuery( CommerceKit.items ).filter( function( index, item ) { if ( product_id == item.product_id ) return true; }).toArray();

		var existing_product_in_cart = existing_products[ 0 ];

		if (!existing_product_in_cart) {

			CommerceKit.items.push({
				product_id: product_id,
				product_title: product_title,
				product_price: product_price,
				product_quantity: product_quantity
			});

		} else {

			existing_product_in_cart.product_quantity = parseInt( existing_product_in_cart.product_quantity, 10 ) + parseInt( product_quantity, 10 );

		}

		CommerceKit._saveCartToLocalstorage();
		CommerceKit.render_cart_teaser();

		if (typeof CommerceKit.render_modal_cart_content !== 'undefined') {
			CommerceKit.render_modal_cart_content();
		}

	};


/***********************************************************/
/* Save the cart contents to local storage
/***********************************************************/


	CommerceKit._saveCartToLocalstorage = function _saveCartToLocalstorage() {
		storejs.set('commercekit-basket-data', JSON.stringify(CommerceKit.items));
		storejs.set('commercekit-basket-data-updatetime', new Date().getTime());
	};


/***********************************************************/
/* Remove a product from the cart
/***********************************************************/


	CommerceKit.removeProduct = function removeProduct(cartContent) {
		CommerceKit.items.splice(jQuery.inArray(cartContent, CommerceKit.items), 1); //TODO: test se va
		CommerceKit._saveCartToLocalstorage();
	};


/***********************************************************/
/* Clear the cart
/***********************************************************/


	CommerceKit.clearCart = function clearCart() {
		CommerceKit.items = [];
		storejs.remove('commercekit-basket-data');

		var interval = setInterval(function() {
			if (CommerceKit.settings !== null && typeof CommerceKit.settings !== 'undefined') {
				clearInterval(interval);
				if (!CommerceKit.settings.general.storeClientInformation) {
					storejs.remove('commercekit-person-address');
				}
			}
		}, 50);

		CommerceKit._saveCartToLocalstorage();
	};


	CommerceKit.getUSAStates = CommerceKitLib.USA_states_array;

	CommerceKit.currencies = CommerceKitLib.currencies_array;

	window.CommerceKit = CommerceKit;


}());
