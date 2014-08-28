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


	/***********************************************************/
	/* Populate the selling countries at page load
	/***********************************************************/


		/***********************************************************/
		/* For allowed countries
		/***********************************************************/

		if (commercekit_options.selling_settings && commercekit_options.selling_settings.items && commercekit_options.selling_settings.items.length > 0) {

			var have_group = false;

			commercekit_options.selling_settings.items.forEach(function( item ) {

				var name_to_show = item.country_name;

				if (item.country_name === 'all') {
					name_to_show = commercekit_strings['All countries'];
				}


				var html = '<code data-country="' + item.country_name + '" class="">' +
								name_to_show +
								' <a data-country="' + item.country_name + '" class="js__delete-selling-country">(' + commercekit_strings['Trash'] + ')</a>' +
							'</code>';

				jQuery('#selling-to-countries-container').append(html);

				if (item.type === 'group') {
					have_group = true;
				}

			});

			if (have_group) {
				jQuery('.add-exception-button-container').removeClass('hidden');
			}

		}


		/***********************************************************/
		/* For exceptions
		/***********************************************************/

		if (commercekit_options.selling_settings && commercekit_options.selling_settings.exceptions && commercekit_options.selling_settings.exceptions.length > 0) {

			commercekit_options.selling_settings.exceptions.forEach(function( item ) {

				var html = '<code data-country="' + item.country_name + '" class="">' +
								item.country_name +
								' <a data-country="' + item.country_name + '" class="js__delete-exception-country">(' + commercekit_strings['Trash'] + ')</a>' +
							'</code>';

				jQuery('#except-those-countries-container').append(html);

			});

			jQuery('#except-container').removeClass('hidden');

		}


	/***********************************************************/
	/* Populate the  selling countries select
	/***********************************************************/


		var countries_options = '';

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


		var prepend = '';
		prepend += '<option name="all" value="all" data-type="group">' + commercekit_strings['All countries'] + '</option>';
		prepend += '<option name="" disabled>-----------</option>';

		jQuery( '#js__want-to-sell__add-new-country__select' ).append('<select>' + prepend + countries_options + '</select>');
		jQuery( '#js__want-to-sell__add-new-exception__select' ).append('<select>' + countries_options + '</select>'); //Don't include 'All' in exceptions select

	});


/***********************************************************/
/* Add a selling country
/***********************************************************/


	jQuery(document).delegate( '#js__want-to-sell__add-new-country', 'click', function(e) {

		if (!commercekit_options.selling_settings) { commercekit_options.selling_settings = {};	}
		if (!commercekit_options.selling_settings.items) { commercekit_options.selling_settings.items = []; }

		var selected_option = jQuery('#add-country-modal select option:selected').first();
		var country_name = selected_option.val();

		if (selected_option.data('type') === 'group') { //The country is a group of countries

			commercekit_options.selling_settings.items.push({'country_name': country_name, 'type': 'group' });
			jQuery('.add-exception-button-container').removeClass('hidden');

		} else { //The country is a single country

			commercekit_options.selling_settings.items.push({'country_name': country_name, 'group': selected_option.data('group') });

		}

		var name_to_show = country_name;

		if (country_name === 'all') {
			name_to_show = commercekit_strings['All countries'];
		}

		var html = '<code data-country="' + country_name + '" class="">' +
						name_to_show +
						' <a data-country="' + country_name + '" class="js__delete-selling-country">(' + commercekit_strings['Trash'] + ')</a>' +
					'</code>';

		jQuery('#selling-to-countries-container').append(html);

		tb_remove();

	});


/***********************************************************/
/* Add a new exception
/***********************************************************/


	jQuery(document).delegate( '#js__want-to-sell__add-new-exception', 'click', function(e) {

		if (!commercekit_options.selling_settings) { commercekit_options.selling_settings = {};	}
		if (!commercekit_options.selling_settings.exceptions) { commercekit_options.selling_settings.exceptions = []; }

		var selected_option = jQuery('#add-exception-modal select option:selected').first();
		var country_name = selected_option.val();


		/***********************************************************/
		/* if it's listed in the allowed countries, I cannot add it to the exceptions
		/***********************************************************/

		var is_in_allowed = false;

		for (i = 0; i < commercekit_options.selling_settings.items.length; i++) {
			if (commercekit_options.selling_settings.items[i].country_name === country_name) {
				is_in_allowed = true;
			}
		}

		if (is_in_allowed) {
			alert(commercekit_strings['This country cannot be added to the exceptions because it is listed in the allowed countries. First, remove it from there.']);
			return;
		}


		/***********************************************************/
		/* Go on
		/***********************************************************/


		if (selected_option.data('type') === 'group') { //The country is a group of countries

			commercekit_options.selling_settings.exceptions.push({'country_name': country_name, 'type': 'group' });
			jQuery('.add-exception-button-container').removeClass('hidden');

		} else { //The country is a single country

			commercekit_options.selling_settings.exceptions.push({'country_name': country_name, 'group': selected_option.data('group') });

		}

		var html = '<code data-country="' + country_name + '" class="">' +
						country_name +
						' <a data-country="' + country_name + '" class="js__delete-exception-country">(' + commercekit_strings['Trash'] + ')</a>' +
					'</code>';

		jQuery('#except-those-countries-container').append(html);

		jQuery('#except-container').removeClass('hidden');

		tb_remove();

	});


/***********************************************************/
/* Handle deleting a selling country
/***********************************************************/


	jQuery(document).delegate( '.js__delete-selling-country', 'click' , function() {

		var country = jQuery(this).data('country');
		var i = 0;

		for (i = 0; i < commercekit_options.selling_settings.items.length; i++) {
			if (commercekit_options.selling_settings.items[i].country_name === country) {
				break;
			}
		}

		var is_a_group = (commercekit_options.selling_settings.items[i].type === 'group');


		commercekit_options.selling_settings.items.splice( i , 1 );


		if (is_a_group) {

			/***********************************************************/
			/* TODO: delete all the 'exception countries' that have that group.
			/***********************************************************/


			/***********************************************************/
			/* if it's the last group, hide the "Add an exception" link
			/***********************************************************/


			var last_group = true;

			for (i = 0; i < commercekit_options.selling_settings.items.length; i++) {
				if (commercekit_options.selling_settings.items[i].type === 'group') {
					last_group = false;
				}
			}


			if (last_group) {
				jQuery('.add-exception-button-container').addClass('hidden');
			}

		}

		jQuery(this).parent().remove();

	});


/***********************************************************/
/* Handle deleting an exception country
/***********************************************************/


	jQuery(document).delegate( '.js__delete-exception-country', 'click' , function() {

		var country = jQuery(this).data('country');
		var i = 0;

		for (i = 0; i < commercekit_options.selling_settings.exceptions.length; i++) {
			if (commercekit_options.selling_settings.exceptions[i].country_name === country) {
				break;
			}
		}

		if (commercekit_options.selling_settings.exceptions[i].type === 'group') {
			//delete all the 'exception countries' that have that group.
		}

		commercekit_options.selling_settings.exceptions.splice( i , 1 );

		if (commercekit_options.selling_settings.exceptions.length === 0) {
			jQuery('#except-container').addClass('hidden');
		}

		jQuery(this).parent().remove();

	});


});