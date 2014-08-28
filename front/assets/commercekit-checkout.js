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
/* Go on from the cart to the checkout flow
/***********************************************************/

	CommerceKit.commercekit__recalculate_modal_height_for_scroll = function() {
		setTimeout(function() {

			var outer_element = jQuery('.modal-inner-container');
			var inner_element = jQuery('.modal-content:not(.hidden)');
			outer_element.css('height', function(index, height) {
				return parseInt(inner_element.height(), 10) + parseInt(inner_element.css('padding-top'), 10) + 400;
			});
		}, 300);
	};

	jQuery(document).delegate('#js__proceed-to-checkout', 'click', function(event) {

		jQuery('#modal-cart').addClass('hidden');
		jQuery('#modal-checkout-country').removeClass('hidden');

		commercekit__fill_countries_select_box();
		CommerceKit.commercekit__recalculate_modal_height_for_scroll();
	});


/***********************************************************/
/* Go on from the country form to the address form
/***********************************************************/


	jQuery(document).delegate('#js__proceed-to-address', 'click', function(event) {

		jQuery('#modal-checkout-country').addClass('hidden');
		jQuery('#modal-checkout-address').removeClass('hidden');

		commercekit__store_country();

		commercekit__tweak_address_form_based_on_country();
		CommerceKit.commercekit__recalculate_modal_height_for_scroll();
	});


/***********************************************************/
/* Go on from the address form to the shipping method chooser
/***********************************************************/


	jQuery(document).delegate('#js__proceed-to-shipping', 'click', function(event) {

		commercekit__validate_address_and_store_it(function() {

			commercekit__fill_shipping_methods();
			jQuery('#modal-checkout-address').addClass('hidden');
			jQuery('#modal-checkout-shipping').removeClass('hidden');

			CommerceKit.commercekit__recalculate_modal_height_for_scroll();
		});

	});


/***********************************************************/
/* Go on from the shipping method chooser to the confirm page
/***********************************************************/


	jQuery(document).delegate('#js__proceed-to-confirm', 'click', function(event) {

		commercekit__store_shipping_method();
		commercekit__calculate_and_store_cart_total();

		CommerceKit.render_modal_purchased_content();
		jQuery('#modal-checkout-shipping').addClass('hidden');
		jQuery('#modal-checkout-confirm').removeClass('hidden');

		CommerceKit.commercekit__recalculate_modal_height_for_scroll();
	});


/***********************************************************/
/* Go on from the confirm page to opening the Stripe payment panel
/***********************************************************/


	jQuery(document).delegate('#js__proceed-to-payment', 'click', function(event) {

		CommerceKit.configureStripe(function() {

			jQuery('#modal-checkout-confirm').addClass('hidden');
			jQuery('#modal-checkout-receipt').removeClass('hidden');

			CommerceKit.commercekit__recalculate_modal_height_for_scroll();
		});



		CommerceKit.openStripe();

	});


/***********************************************************/
/* Validate checkout address
/***********************************************************/


	var commercekit__validate_address_and_store_it = function commercekit__validate_address_and_store_it(callback) {

		var address = {
			firstname: jQuery('#js-billing__firstname').val(),
			lastname: jQuery('#js-billing__lastname').val(),
			email: jQuery('#js-billing__email').val(),
			telephone: jQuery('#js-billing__telephone').val(),
			address1: jQuery('#js-billing__address1').val(),
			address2: jQuery('#js-billing__address2').val(),
			city: jQuery('#js-billing__city').val(),
			zip: jQuery('#js-billing__zip').val(),
			postalcode: jQuery('#js-billing__postalcode').val(),
			state: jQuery('#js-billing__state').val(),
			province: jQuery('#js-billing__province').val(),
			country: CommerceKit.shipping_country
		};


		if (!address.firstname || !address.lastname ||
			!address.email || !address.telephone ||
			!address.address1 || !address.city ||
			!(address.zip || address.postalcode)) {

			alert(commercekit_strings['Please fill all the required fields']);
			return;
		}

		var verimail = new Comfirm.AlphaMail.Verimail();

		verimail.verify(address.email, function(status, message, suggestion) {

			if (status === 0) { //valid email

				CommerceKit.shipping_address = address;

				if (callback) callback();

			} else {

				// Incorrect syntax!
				if (suggestion) {
					message = commercekit_strings['Sorry, the email is not valid. Did you mean'] + ' ' + suggestion + '?';
				} else {
					message = commercekit_strings['Sorry, the email is not valid.'];
				}

				alert(message);

			}

		});

	};


/***********************************************************/
/* Store cart total to cookies
/***********************************************************/


	var commercekit__calculate_and_store_cart_total = function commercekit__calculate_and_store_cart_total() {

		//Calculate the order price
		var order_price = 0;
		var tax_rate = 0;

		if (!order_price) {
			var i = 0;
			var cart = CommerceKit.items;

			while (i < cart.length) {
				order_price += cart[i].product_price * cart[i].product_quantity;
				i++;
			}
		}

		commercekit_options.taxes_settings.items.forEach( function( item ) {

			//country rate
			if (item.country_name === CommerceKit.shipping_country) {

				tax_rate = item.rate;

				if (CommerceKit.shipping_country === 'United States') {
					item.states.forEach(function(state) {
						if (state.state_name === CommerceKit.shipping_address.state) {
							tax_rate = state.rate;
						}
					});
				}

				return;

			}

		});

		if (!tax_rate) {

			commercekit_options.taxes_settings.items.forEach( function( item ) {

				var continent = CommerceKitLib.get_continent_of_country(CommerceKit.shipping_country);

				//continent rate
				if (item.country_name === continent) {
					tax_rate = item.rate;
					return;
				}


			});

			if (!tax_rate) {

				commercekit_options.taxes_settings.items.forEach( function( item ) {

					//all countries rate
					if (item.country_name === 'all') {
						tax_rate = item.rate;
						return;
					}

				});

			}

		}


		CommerceKit.cart_total_only_products = order_price;

		CommerceKit.taxes_cost = parseFloat((order_price / 100 ) * tax_rate).toFixed(2);

		CommerceKit.cart_total_only_products_including_taxes = parseFloat(parseFloat(CommerceKit.cart_total_only_products) + parseFloat(CommerceKit.taxes_cost)).toFixed(2);

		CommerceKit.cart_total_including_shipping =	parseFloat(
																		parseFloat(CommerceKit.cart_total_only_products_including_taxes) +
																		parseFloat(CommerceKit.shipping_method.rate)
																	).toFixed(2);
	};


/***********************************************************/
/* Store country to cookies
/***********************************************************/


	var commercekit__store_country = function commercekit__store_country() {

		var country = jQuery('.js__country-select-box option:selected').val();

		CommerceKit.shipping_country = country;

	};


/***********************************************************/
/* Store shipping method to cookies
/***********************************************************/


	var commercekit__store_shipping_method = function commercekit__store_shipping_method() {

		var $shipping_method_chosen = jQuery('input[name=shipping-method]:checked');

		var shipping_method = {
			name: $shipping_method_chosen.data('name'),
			rate: $shipping_method_chosen.data('rate')
		};

		CommerceKit.shipping_method = shipping_method;
	};


/***********************************************************/
/* Go back in the checkout flow
/***********************************************************/


	jQuery(document).delegate('#js__back-to-cart', 'click', function(event) {

		jQuery('#modal-checkout-country').addClass('hidden');
		jQuery('#modal-cart').removeClass('hidden');

		CommerceKit.commercekit__recalculate_modal_height_for_scroll();
	});

	jQuery(document).delegate('#js__back-to-country', 'click', function(event) {

		jQuery('#modal-checkout-address').addClass('hidden');
		jQuery('#modal-checkout-country').removeClass('hidden');

		CommerceKit.commercekit__recalculate_modal_height_for_scroll();
	});

	jQuery(document).delegate('#js__back-to-address', 'click', function(event) {

		jQuery('#modal-checkout-shipping').addClass('hidden');
		jQuery('#modal-checkout-address').removeClass('hidden');

		CommerceKit.commercekit__recalculate_modal_height_for_scroll();
	});

	jQuery(document).delegate('#js__back-to-shipping', 'click', function(event) {

		jQuery('#modal-checkout-confirm').addClass('hidden');
		jQuery('#modal-checkout-shipping').removeClass('hidden');

		CommerceKit.commercekit__recalculate_modal_height_for_scroll();
	});


/***********************************************************/
/* Fill the countries select box during checkout
/***********************************************************/


	var commercekit__fill_countries_select_box = function commercekit__fill_countries_select_box() {

		var content = '';
        var countries_to_show = [];
        var countries_to_exclude = [];

		commercekit_options.selling_settings.items.forEach(function(item) {

			if ( item.type === 'group' ) {

				CommerceKitLib.countries_array.forEach(function(country) {

					if ( item.country_name === 'all' ) {

                        countries_to_show.push( country.name );

					} else {

						if (country.continent === item.country_name) {
							countries_to_show.push( country.name );
						}

					}

				});

			} else {

                countries_to_show.push( item.country_name );

			}

		});
        
		commercekit_options.selling_settings.exceptions.forEach(function(item) {

            countries_to_exclude.push( item.country_name );
        
        });

        //unique values
        countries_to_show = countries_to_show.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);
        countries_to_exclude = countries_to_exclude.reduce(function(a,b){if(a.indexOf(b)<0)a.push(b);return a;},[]);

        //add the country to the select, if not excluded
        countries_to_show.forEach(function(country) {

            if ( countries_to_exclude.indexOf(country) === -1 ) {

                content += '<option>' + country + '</option>';                

            }

        })

		jQuery('.js__country-select-box').html(content);


		/***********************************************************/
		/* Order alphabetically the countries in the select
		/***********************************************************/


		var options = jQuery('.js__country-select-box option');
		var arr = options.map(function(_, o) { return { t: jQuery(o).text(), v: o.value }; }).get();
		arr.sort(function(o1, o2) { return o1.t > o2.t ? 1 : o1.t < o2.t ? -1 : 0; });
		options.each(function(i, o) {
			o.value = arr[i].v;
			jQuery(o).text(arr[i].t);
		});

		/***********************************************************/
		/* Drop duplicates of the countries in the select
		/***********************************************************/

		var found = [];
		options.each(function() {
			if (jQuery.inArray(this.value, found) != -1) jQuery(this).remove();
			found.push(this.value);
		});

	};


/*************************************************************************************/
/* Alter the address form fields based on the country selected
/* For example, US needs a state select and the ZIP. Other countries may have provinces.
/*************************************************************************************/


	var commercekit__tweak_address_form_based_on_country = function commercekit__tweak_address_form_based_on_country() {

		jQuery('.js-billing__state__container').addClass('hidden');
		jQuery('.js-billing__zip__container').addClass('hidden');
		jQuery('.js-billing__postalcode__container').addClass('hidden');
		jQuery('.js-billing__province__container').addClass('hidden');

		if (CommerceKit.shipping_country === 'United States') {


			/***********************************************************/
			/* Fill the USA states select
			/***********************************************************/

			var states = CommerceKitLib.USA_states_array;

			select = document.getElementById('js-billing__state');

			for (var i = 0; i < states.length; i++) {
				select.options[select.options.length] = new Option(states[i].name, states[i].name);
			}


			jQuery('.js-billing__state__container').removeClass('hidden');
			jQuery('.js-billing__zip__container').removeClass('hidden');

		} else {

			jQuery('.js-billing__postalcode__container').removeClass('hidden');
			jQuery('.js-billing__province__container').removeClass('hidden');

		}

	};


/***********************************************************/
/* Fill the shipping methods available to the country chosen
/***********************************************************/


	var commercekit__fill_shipping_methods = function commercekit__fill_shipping_methods() {

		jQuery('.shipping-methods ul').html('');

		var content = '';
		var first = true;



		commercekit_options.shipping_settings.items = commercekit_options.shipping_settings.items.sort( function(a, b) {
			if (parseInt(a.rate, 10) > parseInt(b.rate, 10)) return 1;
			else return -1;
		});

		commercekit_options.shipping_settings.items.forEach(function(item) {

			var country_name = CommerceKit.shipping_country;

			var show_country = false;

			item.allowed_countries.forEach(function(country) {

				if (country.name === 'all') {
					show_country = true;
					return;
				}

				if (country.name === country_name) {
					show_country = true;
					return;
				}

				if (country.type === 'group') {

					CommerceKitLib.countries_array.forEach(function(theCountry) {

						if (theCountry.name === country_name) {
							if (theCountry.continent === country.name) {
								show_country = true;
							}
						}

					});

				}

			});


			if (show_country === true) {

				item.disallowed_countries.forEach(function(country) {
					if (country.name === country_name) {
						show_country = false;
					}
				});

			}

			if (!show_country) return;

			var currency_symbol = commercekit_options.currency_symbol;

			if (commercekit_options.currency_position === 'before') {
				currency_and_subtotal = currency_symbol + ' ' + item.rate;
			} else {
				currency_and_subtotal = item.rate + ' ' + currency_symbol;
			}


			content =  '<li>';

			if (first === true) {
				first = false;
				content += '<input type="radio" name="shipping-method" data-name="' + item.name + '" data-rate="' + item.rate + '" checked />';
			} else {
				content += '<input type="radio" name="shipping-method" data-name="' + item.name + '" data-rate="' + item.rate + '" />';
			}

			content +=		'<span class="shipping-method-name">' + item.name + '</span>' +
							'<br>' +
							'<span class="shipping-method-detail">' + currency_and_subtotal + '</span>' +
						'</li>';

			jQuery('.shipping-methods ul').append(content);

		});

	};


/**************************************************************************/
/* Handle rendering the cart content in the confirm / receipt modal screens
/**************************************************************************/


	CommerceKit.render_modal_purchased_content = function render_modal_purchased_content() {

		var currency_symbol = commercekit_options.currency_symbol;
		var items = CommerceKit.items;

		var $products_bought_confirm = jQuery('#modal-checkout-confirm .products tbody');
		var $products_bought_receipt = jQuery('#modal-checkout-receipt .products tbody');
		var content = '';

		for (var i = 0; i < items.length; i++) {
			var item = items[i];

			content += '<tr class="cart-single-product"><td>' + item.product_title + '</td>';
			content += '<td>' + item.product_quantity + '</td><td>';

			var subtotal = parseFloat(item.product_price * item.product_quantity).toFixed(2);

			if (commercekit_options.currency_position === 'before') {
				currency_and_subtotal = currency_symbol + ' ' + subtotal;
			} else {
				currency_and_subtotal = subtotal + ' ' + currency_symbol;
			}

			content += currency_and_subtotal;
			content += '</td></tr>';
		}

		$products_bought_confirm.html(content);
		$products_bought_receipt.html(content);

		var $cart_taxes_cost = jQuery('td.cart-taxes-cost-content');
		var taxes_cost = 0;

		if ( !commercekit_options.taxes_included_in_products_prices ) {

			taxes_cost = CommerceKit.taxes_cost;

			if (commercekit_options.currency_position === 'before') {
				$cart_taxes_cost.html(currency_symbol + ' ' + taxes_cost);
			} else {
				$cart_taxes_cost.html(taxes_cost + ' ' + currency_symbol);
			}

		}


		var $cart_shipping_cost = jQuery('td.cart-shipping-cost-content');

		var shipping_cost = parseFloat(CommerceKit.shipping_method.rate).toFixed(2);

		if (commercekit_options.currency_position === 'before') {
			$cart_shipping_cost.html(currency_symbol + ' ' + shipping_cost);
		} else {
			$cart_shipping_cost.html(shipping_cost + ' ' + currency_symbol);
		}

		var $cart_total_cost = jQuery('td.cart-total-cost-content');

		var total_cost = parseFloat( CommerceKit.cart_total_including_shipping ).toFixed(2);

		if (commercekit_options.currency_position === 'before') {
			$cart_total_cost.html(currency_symbol + ' ' + total_cost);
		} else {
			$cart_total_cost.html(total_cost + ' ' + currency_symbol);
		}

	};


/***********************************************************/
/* Configure stripe and intruct to call the callback if provided
/***********************************************************/

	CommerceKit.configureStripe = function configureStripe(callback) {
		CommerceKit.stripeHandler = StripeCheckout.configure({
			key: commercekit_options.stipe_api_key_public,
			token: function(token, args) {
				
				CommerceKit.ajax_save_order_in_progress = true;

				var order = {
					products: storejs.get('commercekit-basket-data'),
					address: JSON.stringify(CommerceKit.shipping_address),
					shipping: JSON.stringify(CommerceKit.shipping_method),
					stripeToken: token.id,
					amount: CommerceKit.cart_total_including_shipping.toString().replace('.', ''),
					buyer_name: CommerceKit.shipping_address.firstname + ' ' + CommerceKit.shipping_address.lastname,
					total_paid: CommerceKit.cart_total_only_products_including_taxes,
					total_paid_including_shipping: CommerceKit.cart_total_including_shipping
				};

				order._ajax_nonce = commercekit_options.nonce;
				
				jQuery.ajax({

					url: commercekit_options.save_order_url,
					data: order,
					type: 'POST'

				}).success(function(orderId) {

					//Clear the cart and rerender the teaser
					CommerceKit.clearCart();
					CommerceKit.render_cart_teaser();

					if (callback) {
						callback();
					}

					jQuery('#js__back-to-shipping').removeClass('hidden');
					jQuery('#js__proceed-to-payment').removeClass('hidden');
					jQuery('#js__wait_message').addClass('hidden');

				}).error(function() {

					alert(commercekit_strings['Payment not successful. Please retry.']);

				});

			}
		});
	};


/***********************************************************/
/* This function is called to call Stripe Checkout
/***********************************************************/

	CommerceKit.openStripe = function openStripe() {

		//Disable the buttons

		jQuery('#js__back-to-shipping').addClass('hidden');
		jQuery('#js__proceed-to-payment').addClass('hidden');
		jQuery('#js__wait_message').removeClass('hidden');

		CommerceKit.stripeHandler.open({
			email: CommerceKit.shipping_address.email,
			amount: CommerceKit.cart_total_including_shipping.toString().replace('.', ''),
			currency: commercekit_options.currency,
			allowRememberMe: false,
			closed: function() {
				
				if (!CommerceKit.ajax_save_order_in_progress) {
					jQuery('#js__back-to-shipping').removeClass('hidden');
					jQuery('#js__proceed-to-payment').removeClass('hidden');
					jQuery('#js__wait_message').addClass('hidden');					
				}
			}
        });

	};


});
