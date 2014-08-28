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

jQuery(document).ready(function() {


/***********************************************************/
/* Initialize the cart
/***********************************************************/


	if (new Date().getTime() - storejs.get('commercekit-basket-data-updatetime') > 1000 * 60 * 60 * 24) { //the cart lasts 24 hours
		storejs.remove('commercekit-basket-data');
	}

	if (typeof storejs.get('commercekit-basket-data') !== 'undefined') {
		CommerceKit.items = JSON.parse(storejs.get('commercekit-basket-data'));
	}


/***********************************************************/
/* Initialize the cart teaser content on startup
/***********************************************************/


	var cartContent = CommerceKit.items;

	var interval = setInterval(function() {
		if (CommerceKit.items) {
			setTimeout(function() {
				CommerceKit.render_cart_teaser();
				clearInterval(interval);
			}, 300);
		}
	}, 200);


/***********************************************************/
/* Render the cart teaser when adding an item
/***********************************************************/


	CommerceKit.render_teaser_item_added_to_cart = function render_teaser_item_added_to_cart() {

		var $cart_teaser = jQuery('.js__commercekit-cart-teaser-container');

		var content = '<div class="cart-teaser-item-added">';
		content += '<span class="headline">' + commercekit_strings['Item added to cart'] + '</span>';
		content += '<button class="btn btn-success js__commercekit__show-the-cart">' + commercekit_strings['View Cart'] + '</button>';

		content += '</div>';

		$cart_teaser.html(content);

		setTimeout(function() {
			CommerceKit.render_cart_teaser();
		}, 2000);

	};


/***********************************************************/
/* Render the cart teaser content
/***********************************************************/


	CommerceKit.render_cart_teaser = function render_cart_teaser() {

		var $cart_teaser = jQuery('.js__commercekit-cart-teaser-container');

		var currency_symbol = commercekit_options.currency_symbol;

		var number_of_items = CommerceKit.numberOfItemsInCart();
		var content = '';

		if (number_of_items === 0) {
			$cart_teaser.html(content);

			jQuery('.js__commercekit-cart-teaser-container').addClass('hidden');
			return;
		}

		jQuery('.js__commercekit-cart-teaser-container').removeClass('hidden');

		var subtotal = CommerceKit.cartTotalPrice();

		if (commercekit_options.currency_position === 'before') {
			currency_and_subtotal = currency_symbol + ' ' + subtotal;
		} else {
			currency_and_subtotal = subtotal + ' ' + currency_symbol;
		}

		content = '<div class="cart-teaser-cart-content">';
		content += '<span class="headline">' + commercekit_strings['Order subtotal'] + '</span>';
		content += '<span class="total_price">' + currency_and_subtotal + '</span>';
		content += '<span class="items_count">' + number_of_items + ' ';

		if (number_of_items > 1) {
			content += commercekit_strings['items in your cart'];
		} else {
			content += commercekit_strings['item in your cart'];
		}

		content += '</span>';

		content += '<button class="btn btn-success js__commercekit__show-the-cart">' + commercekit_strings['View Cart'] + '</button>';
		content += '</div>';

		$cart_teaser.html(content);

	};

});
