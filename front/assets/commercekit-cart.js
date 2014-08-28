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
/* Take care of showing the modal on startup
/***********************************************************/


	var interval = setInterval(function() {
		if (CommerceKit.render_modal_cart_content) {
			setTimeout(function() {
				CommerceKit.render_modal_cart_content();
				clearInterval(interval);
			}, 300);
		}
	}, 200);


/***********************************************************/
/* Handle removing totally a product from the cart (all quantities)
/***********************************************************/


	jQuery(document).delegate('.remove-all', 'click', function() {

		CommerceKit._saveCartToLocalstorage();
		CommerceKit.render_cart_teaser();
		CommerceKit.render_modal_cart_content(); //Update cart modal content
		var items = CommerceKit.items;

		var tr = jQuery(this).closest( 'tr' );
		var index_of_tr = jQuery(tr).prevAll().length;

		items.splice( index_of_tr , 1 );

	});


/***********************************************************/
/* Handle rendering the modal cart content
/***********************************************************/


	CommerceKit.render_modal_cart_content = function render_modal_cart_content() {
		var currency_symbol = commercekit_options.currency_symbol;
		var items = CommerceKit.items;

		if (items.length === 0) {
			jQuery('#modal-cart .products thead').addClass('hidden');
			jQuery('#modal-cart .products tfoot').addClass('hidden');
			jQuery('#js__proceed-to-checkout').addClass('hidden');
			jQuery('#modal-cart .products tbody').html('The cart is empty');

			return;
		} else {
			jQuery('#modal-cart .products thead').removeClass('hidden');
			jQuery('#modal-cart .products tfoot').removeClass('hidden');
			jQuery('#js__proceed-to-checkout').removeClass('hidden');
		}

		var $cart = jQuery('#modal-cart .products tbody');
		var content = '';

		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			content += '<tr class="cart-single-product"><td>' + item.product_title + '</td>';

			var quantity_chooser = '<div class="quantity commercekit-quantity-chooser buttons_added">';
			quantity_chooser += '<input type="button" value="-" class="remove-one">';
			quantity_chooser += '<input type="text" class="product-quantity js__commercekit__quantity-box-cart" data-id="' + i + '" name="quantity" value="' + item.product_quantity + '" title="Qty" class="input-text qty text commercekit-quantity-input-box" size="4" min="1">';
			quantity_chooser += '<input type="button" value="+" class="add-one">';
			quantity_chooser += '</div>';

			content += '<td>' + quantity_chooser + '</td><td>';

			var subtotal = parseFloat(item.product_price * item.product_quantity).toFixed(2);

			if (commercekit_options.currency_position === 'before') {
				currency_and_subtotal = currency_symbol + ' ' + subtotal;
			} else {
				currency_and_subtotal = subtotal + ' ' + currency_symbol;
			}

			content += currency_and_subtotal;

			content += '</td><td><input type="button" value="x" class="remove-all"></td></tr>';
		}

		$cart.html(content);

		var $subtotal = jQuery('td.cart-subtotal');

		if (commercekit_options.currency_position === 'before') {
			$subtotal.html(currency_symbol + ' ' + CommerceKit.cartTotalPrice());
		} else {
			$subtotal.html(CommerceKit.cartTotalPrice() + ' ' + currency_symbol);
		}

	};


/***********************************************************/
/* Handle change the quantity box in the cart
/***********************************************************/

	var commercekit_update_subtotal_for_single_product = function commercekit_update_subtotal_for_single_product(that) {

		var element_id = jQuery(that).data('id');
		var new_quantity = jQuery(that).val();
		var isInt = function isInt(n) {
			return n % 1 === 0;
		};

		if (!isInt(new_quantity) || new_quantity.indexOf('.') !== -1) {
			alert(commercekit_strings['Value not acceptable']);
			jQuery(that).val(CommerceKit.items[element_id].product_quantity);
			return;
		}

		CommerceKit.items[element_id].product_quantity = new_quantity;
		CommerceKit._saveCartToLocalstorage();
		CommerceKit.render_cart_teaser();
		CommerceKit.render_modal_cart_content();

		jQuery(".js__commercekit__quantity-box-cart[data-id='" + element_id + "']").focus().val(jQuery(".js__commercekit__quantity-box-cart[data-id='" + element_id + "']").val()); //this is to avoid browser auto-selecting text

	};


/***********************************************************/
/* Handle changing the product quantity in the cart by clicking the buttons
/***********************************************************/


	jQuery(document).on('change', '.js__commercekit__quantity-box-cart', function() {
		commercekit_update_subtotal_for_single_product(this);
	});


/***********************************************************/
/* Handle changing the product quantity in the cart by editing the input box
/***********************************************************/


	jQuery(document).on('keyup', '.product-quantity', function() {
		commercekit_update_subtotal_for_single_product(this);
	});


/***********************************************************/
/* Show the shopping cart modal (remove the hidden class)
/***********************************************************/

	CommerceKit.commercekit__show_shopping_cart = function commercekit_show_shopping_cart() {
		jQuery('#modal-cart').removeClass('hidden');
		jQuery('body').css('overflow','hidden');

		var interval = setInterval(function() {
			if (CommerceKit.commercekit__recalculate_modal_height_for_scroll) {
				setTimeout(function() {
					CommerceKit.commercekit__recalculate_modal_height_for_scroll();
					clearInterval(interval);
				}, 300);
			}
		}, 200);


	};


/***********************************************************/
/* Go back to the site (hide the modal)
/***********************************************************/

	jQuery(document).delegate('#js__back-to-site', 'click', function(event) {
		jQuery('.commercekit_shopping_cart').addClass('hidden');
		jQuery('.modal-content').addClass('hidden');
		jQuery('body').css('overflow','auto');
	});

});