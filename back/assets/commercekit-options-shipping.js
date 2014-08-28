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


/***********************************************************/
/* Initialize shipping options
/***********************************************************/


	jQuery(document).ready(function() {

		if (commercekit_options.shipping_settings.items && commercekit_options.shipping_settings.items.length > 0) {

			commercekit_options.shipping_settings.items.forEach(function( item ) {

				var alternate = jQuery( '#commercekit-shipping-options tr' ).length % 2;
				var the_class = '';

				if (!alternate) {
					the_class = 'class="alternate"';
				}

				var checked = '';
				if (item.allowed) {
					checked = 'checked="checked" ';
				}

				var html =  '<tr ' + the_class + '>' +
								'<td class="">' + item.name + '</td>' +
								'<td class="">' + item.rate + ' ' + CommerceKit.get_symbol_of_currency( commercekit_options.currency ) + '</td>' +
								'<td class="">';

				if (item.allowed_countries.length > 0) {
					html += commercekit_strings['Applies to'] + ': ';

					item.allowed_countries.forEach(function(country) {

						if (country.name === 'all') {
							html += '<code>' + commercekit_strings['All countries'] + '</code> ';
						} else {
							html += '<code>' + country.name + '</code> ';
						}

					});
				}

				if (item.disallowed_countries.length > 0) {
					html += '<br><br>' + commercekit_strings['Except'] + ': ';

					item.disallowed_countries.forEach(function(country) {
						html += '<code>' + country.name + '</code> ';
					});
				}

				html += '</td><td><div class="row-actions"><a href="#" class="commercekit-delete-shipping-option-action">' + commercekit_strings['Trash'] + '</a></div></td>' +
							'</tr>';

				jQuery( '#commercekit-shipping-options' ).append( html );

			});

		}

	});


/***********************************************************/
/* Handle deleting a shipping option
/***********************************************************/


	jQuery(document).delegate( '.commercekit-delete-shipping-option-action', 'click' , function() {

		var tr = jQuery(this).closest( 'tr' );

		var index_of_tr = jQuery(tr).prevAll().length;

		commercekit_options.shipping_settings.items.splice( index_of_tr , 1 );

		tr.remove();

	});


/***********************************************************/
/* Show the full options for shipping and taxes
/***********************************************************/

	jQuery(document).delegate( '#commercekit-show-taxes-full', 'click', function() {

		jQuery( '#commercekit-taxes-full' ).removeClass( 'hidden' );
		jQuery( '#commercekit-taxes-simple' ).addClass( 'hidden' );

		commercekit_options.taxes_settings.simple = false;

	});



/***********************************************************/
/* Add a shipping option
/***********************************************************/


	jQuery(document).delegate( '#commercekit-add-shipping-option', 'click', function(e) {

		e.preventDefault();
		add_shipping_option();

	});


	var add_shipping_option = function add_shipping_option() {

		var alternate = jQuery( '#commercekit-shipping-options tr' ).length % 2;
		var the_class = '';

		if (!alternate) {
			the_class = 'class="alternate new"';
		} else {
			the_class = 'class="new"';
		}

		var html =  '<tr ' + the_class + '>' +
						'<td class=""><input type="text" class="name medium-text" /></td>' +
						'<td class=""><input type="text" class="rate small-text" />' + CommerceKit.get_symbol_of_currency(commercekit_options.currency) + '</td>' +
						'<td>' +
							'<div class="shipping-options__allowed-countries-selection"></div>' +
							'<div class="shipping-options__disallowed-countries-selection hidden">Except: </div>' +
							'<a href="#" class="shipping-options-countries__add-new-allowed-country">Add new</a>' +
							'<a href="#" class="shipping-options-countries__add-new-disallowed-country hidden"> | Add exception</a></td>' +
						'<td><div class="row-actions"><span class="trash cursor-pointer"><a class="commercekit-delete-shipping-option-action">' + commercekit_strings['Trash'] + '</a></div></td>' +
					'</tr>';

		jQuery( '#commercekit-shipping-options' ).append(html);
		jQuery( '.shipping-options__allowed-countries-selection' ).append( _commercekit_get_countries_select() );

		/***********************************************************/
		/* Add the newly added shipping option to the JS object
		/***********************************************************/

		if (!commercekit_options.shipping_settings.items) {
			commercekit_options.shipping_settings.items = [];
		}

		//Add new shipping option
		jQuery( '#commercekit-shipping-options tr.new' ).toArray().forEach(function( item ) {

			var allowed_countries = [];

			jQuery('.shipping-options__allowed-countries-selection option:selected' ).each(function( index, value ) {

				var country_name = jQuery( value ).val();
				allowed_countries.push( country_name );

			});

			var name = jQuery(jQuery(item).find( '.name' )[0]).val();
			var rate = jQuery(jQuery(item).find( '.rate' )[0]).val() || 0;

			jQuery(item).removeClass( 'new' );

			commercekit_options.shipping_settings.items.push({'allowed_countries': allowed_countries, 'name': name, 'rate': rate});

		});

	};


/***********************************************************/
/* Populate the  country select
/***********************************************************/


	var _commercekit_get_countries_select = function _commercekit_get_countries_select() {

		var countries_options = '';

		countries_options += '<option name=""></option>';
		countries_options += '<option name="" disabled>-----------</option>';
		countries_options += '<option name="all" value="all" data-type="group">' + commercekit_strings['All countries'] + '</option>';
		countries_options += '<option name="" disabled>-----------</option>';

		var continent = '';
		continent = 'North America';
		countries_options += '<option name="' + continent + '" data-type="group">' + continent + '</option>';
		continent = 'Europe';
		countries_options += '<option name="' + continent + '" data-type="group">' + continent + '</option>';
		continent = 'Oceania';
		countries_options += '<option name="' + continent + '" data-type="group">' + continent + '</option>';
		continent = 'South America';
		countries_options += '<option name="' + continent + '" data-type="group">' + continent + '</option>';
		continent = 'Africa';
		countries_options += '<option name="' + continent + '" data-type="group">' + continent + '</option>';
		continent = 'Asia';
		countries_options += '<option name="' + continent + '" data-type="group">' + continent + '</option>';

		countries_options += '<option name="" disabled>-----------</option>';

		for (var i in CommerceKit.countries) {
			if (CommerceKit.countries.hasOwnProperty(i)) {
				countries_options += '<option name="' + CommerceKit.countries[i].name + '" data-group="' + CommerceKit.countries[i].continent + '">' + CommerceKit.countries[i].name + '</option>';
			}
		}

		return '<select class="country">' + countries_options + '</select>';

	};


/***********************************************************/
/* Add a new allowed/disallowed country to a shipping option
/***********************************************************/


	jQuery(document).delegate( '.shipping-options-countries__add-new-allowed-country', 'click', function(e) {

		jQuery( '.shipping-options__allowed-countries-selection' ).append( _commercekit_get_countries_select() );

	});


	jQuery(document).delegate( '.shipping-options-countries__add-new-disallowed-country', 'click', function(e) {

		jQuery( '.shipping-options__disallowed-countries-selection').removeClass( 'hidden' );
		jQuery( '.shipping-options__disallowed-countries-selection' ).append( _commercekit_get_countries_select() );

	});


/***********************************************************/
/* Handle changing values in a new shipping option
/***********************************************************/


	jQuery(document).delegate( '#commercekit-shipping-options select.country', 'change', function(e) {

		var tr = jQuery( this ).closest( 'tr' );
		var index_of_tr = jQuery(tr).prevAll().length;
		var country_name = jQuery( this ).val();

		var allowed_countries = [];
		var disallowed_countries = [];

		var have_group = false;

		jQuery( '.shipping-options__allowed-countries-selection option:selected' ).each(function( index, value ) {

			var country = {};
			country.name = jQuery( value ).val();

			if (!country.name) return;

			if (jQuery(this).data('type') === 'group') { //The country is a group of countries
				country.type = 'group';
				have_group = true;
			}

			allowed_countries.push( country );

		});

		jQuery( '.shipping-options__disallowed-countries-selection option:selected' ).each(function( index, value ) {

			var country = {};
			country.name = jQuery( value ).val();

			if (!country.name) return;

			if (jQuery(this).data('type') === 'group') { //The country is a group of countries
				country.type = 'group';
			}

			disallowed_countries.push( country );

		});


		if (have_group) {

			jQuery(this).closest( 'td' ).find('.shipping-options-countries__add-new-disallowed-country').removeClass('hidden');

		} else {

			jQuery(this).closest( 'td' ).find('.shipping-options-countries__add-new-disallowed-country').addClass('hidden');

		}

		commercekit_options.shipping_settings.items[ index_of_tr ].allowed_countries = allowed_countries;
		commercekit_options.shipping_settings.items[ index_of_tr ].disallowed_countries = disallowed_countries;

	});

	jQuery(document).delegate( '#commercekit-shipping-options input.name', 'keyup', function(e) {

		var tr = jQuery( this ).closest( 'tr' );
		var index_of_tr = jQuery( tr ).prevAll().length;
		var name = jQuery( this ).val() || 0;
		commercekit_options.shipping_settings.items[ index_of_tr ].name = name;

	});

	jQuery(document).delegate( '#commercekit-shipping-options input.rate', 'keyup', function(e) {

		var tr = jQuery( this ).closest( 'tr' );
		var index_of_tr = jQuery( tr ).prevAll().length;
		var rate = jQuery( this ).val() || 0;
		commercekit_options.shipping_settings.items[ index_of_tr ].rate = rate;

	});


});