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
/* Add a product to the cart (from the product page)
/***********************************************************/


	jQuery(document).delegate('.js-button__add-to-cart', 'click', function(event) {

		var $quantity = jQuery('#quantity').val();
		var button = jQuery(this);
		button.attr('disabled', 'disabled');

		CommerceKit.addProduct( CommerceKit.currentProduct.id, CommerceKit.currentProduct.title, CommerceKit.currentProduct.price, $quantity );

		setTimeout(function() {
			button.attr('disabled', null);
		}, 2000);

		CommerceKit.render_teaser_item_added_to_cart();

	});


/***********************************************************/
/* Show the shopping cart
/***********************************************************/


	jQuery(document).delegate('.js__commercekit__show-the-cart', 'click', function(event) {

		var that = this;
		event.preventDefault();

		jQuery('.commercekit_shopping_cart').removeClass('hidden');

		var interval = setInterval(function() {
			if (CommerceKit.commercekit__show_shopping_cart) {
				setTimeout(function() {
					CommerceKit.commercekit__show_shopping_cart();
					clearInterval(interval);
				}, 300);
			}
		}, 200);

	});


}());
