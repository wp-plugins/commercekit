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

jQuery( function( $ ) {


	window.CommerceKit = {};


/***********************************************************/
/* Return the symbol of the passed currency
/***********************************************************/


	CommerceKit.get_symbol_of_currency = function get_symbol_of_currency( currency ) {

		var currencies_array = CommerceKitLib.currencies_array;

		for (var i in currencies_array) {

			if (currencies_array.hasOwnProperty(i)) {

				if (currencies_array[i].code === currency) {
					return currencies_array[i].symbol;
				}

			}
		}
	};


/***********************************************************/
/* Fill CommerceKit.countries array with the countries list
/***********************************************************/


	CommerceKit.countries = CommerceKitLib.countries_array;


/***********************************************************/
/* Correctly transform JSON settings into JS Objects to act on
/***********************************************************/


	for ( var i in commercekit_options ) {

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


/***********************************************************/
/* Decide which options UI to show based on saved settings
/***********************************************************/


	jQuery(document).ready(function() {

		if (commercekit_options.taxes_settings.simple === false) {

			jQuery( '#commercekit-taxes-full' ).removeClass( 'hidden' );
			jQuery( '#commercekit-taxes-simple' ).addClass( 'hidden' );

		} else {

			jQuery( '#commercekit-taxes-full' ).addClass( 'hidden' );
			jQuery( '#commercekit-taxes-simple' ).removeClass( 'hidden' );

		}

	});


/***********************************************************/
/* When the currency changes, set the currency symbol accordingly
/***********************************************************/


	jQuery(document).delegate( '#currency', 'change', function(e) {

		jQuery(CommerceKitLib.currencies_array).filter(function( index, value ) {

			if ( value.code == jQuery('#currency').val() ) {

				jQuery('#currency_symbol').val(value.symbol);

			}

		});

	});


/***********************************************************/
/* Submit the options form
/***********************************************************/


	jQuery(document).delegate( '#commercekit-settings-form', 'submit', function(e) {

		e.preventDefault();

		/***********************************************************/
		/* Build selling countries object
		/***********************************************************/

		if (!commercekit_options.selling_settings) { commercekit_options.selling_settings = {};	}
		if (!commercekit_options.selling_settings.items) { commercekit_options.selling_settings.items = []; }

		jQuery( '#selling_settings' ).val( JSON.stringify( commercekit_options.selling_settings ) );

		/***********************************************************/
		/*
		/***********************************************************/

		jQuery( '#shipping_settings' ).val( JSON.stringify( commercekit_options.shipping_settings ) );
		jQuery( '#taxes_settings' ).val( JSON.stringify( commercekit_options.taxes_settings ) );



		/***********************************************************/
		/* Validate shipping options
		/***********************************************************/

		if (commercekit_options.selling_settings.items.length === 0) {
			alert(commercekit_strings['You must sell to at least 1 country']);
			return;
		}

		if (commercekit_options.shipping_settings.items.length === 0) {
			alert(commercekit_strings['You must have at least one shipping method']);
			return;
		}

		var all_countries_we_sell_to_have_a_shipping_option = true;

		commercekit_options.selling_settings.items.forEach(function(country) {

			var this_country_has_a_shipping_option = false;

			commercekit_options.shipping_settings.items.forEach(function(shipping_option) {
				shipping_option.allowed_countries.forEach(function(allowed_country) {

					if (allowed_country.name === country.country_name || allowed_country.name == 'all') {
						this_country_has_a_shipping_option = true;
					}

				});

			});

			if (!this_country_has_a_shipping_option) {
				all_countries_we_sell_to_have_a_shipping_option = false;
			}

		});

		if (all_countries_we_sell_to_have_a_shipping_option === false) {
			alert(commercekit_strings['Warning: not all countries you sell to have a shipping method assigned. Those countries will have free shipping unless you add a shipping method to them.']);
		}


		/***********************************************************/
		/* Validate tax rates values
		/***********************************************************/

		var all_tax_rate_have_a_value = true;
		var tax_rates = jQuery( 'input.rate' ).toArray();

		tax_rates.forEach(function(tax_rate) {
			if (jQuery( tax_rate ).val() === '') all_tax_rate_have_a_value = false;
		});

		var states_tax_rates = jQuery( 'input.state-rate' ).toArray();

		states_tax_rates.forEach(function(state_tax_rate) {
			if (jQuery( state_tax_rate ).val() === '') all_tax_rate_have_a_value = false;
		});

		if (all_tax_rate_have_a_value === false ) {

			alert(commercekit_strings['All tax rates must have a value']);
			return;

		}


		this.submit();

	});


});