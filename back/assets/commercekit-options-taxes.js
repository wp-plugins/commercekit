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
/* Render the taxes table. Called on init and if the checkbox is checked
/***********************************************************/


	var commercekit_render_taxes_table = function commercekit_render_taxes_table() {

		jQuery('#commercekit-taxes-footer').removeClass('hidden');

		if (commercekit_options.taxes_settings.items && commercekit_options.taxes_settings.items.length > 0) {

            var html = '';
            
			commercekit_options.taxes_settings.items.forEach(function( item ) {

				var alternate = jQuery( '#commercekit-taxes-options tr' ).length % 2;
				var the_class = '';

				if (!alternate) {
					the_class = 'class="alternate"';
				}

				var checked = '';
				if (item.allowed) {
					checked = 'checked="checked" ';
				}

				var name_to_show = item.country_name;

				if (item.country_name === 'all') {
					name_to_show = commercekit_strings['All countries'];
				}

				var the_html = item.rate + '%';

				if (item.country_name === 'United States') {


					the_html = '<table id="js__state-rules">';

					item.states.forEach(function(state) {

						if (state.state_name === 'all') {

							the_html += 	'<tr>';

							if (item.states.length > 1) {
								the_html += 		'<td class="all-states">All other states</td>';
							} else {
								the_html += 		'<td class="all-states">All states</td>';
							}

							the_html += 		'<td>' + state.rate + '%</td>';
							the_html += 	'</tr>';

						} else {

							the_html += 	'<tr>';
							the_html += 		'<td>' + state.state_name + '</td>';
							the_html += 		'<td>' + state.rate + '%</td>';
							the_html += 	'</tr>';

						}

					});



					the_html += '</table>';
				}


				html +=  '<tr ' + the_class + '>' +
								'<td class="country">' + name_to_show + '</td>' +
								'<td class="rate">' + the_html + '</td>' +
								'<td><div class="row-actions"><span class="trash"><a href="#" class="commercekit-delete-tax-rate-action">' + commercekit_strings['Trash'] + '</a></div></td>' +
							'</tr>';


			});
            
			jQuery( '#commercekit-tax-rules' ).html( html );
			
            jQuery( '#commercekit-tax-rules' ).removeClass( 'hidden' );
			jQuery('#commercekit-taxes-heading').removeClass('hidden');
            

		}
	};
	
	
	var commercekit_hide_taxes_table = function commercekit_hide_taxes_table() {

		jQuery( '#commercekit-taxes-footer' ).addClass( 'hidden' );

		jQuery( '#commercekit-taxes-heading' ).addClass( 'hidden' );

		jQuery( '#commercekit-tax-rules' ).addClass( 'hidden' );
		
	};
	

/***********************************************************/
/* Initialize taxes options
/***********************************************************/


	jQuery(document).ready(function() {

		if (!commercekit_options.taxes_included_in_products_prices) {

			commercekit_render_taxes_table();
			
		}

	});


/***********************************************************/
/* Handle change taxes included/excluded
/***********************************************************/


	jQuery(document).delegate( '#taxes_included_in_products_prices', 'click' , function() {


		if (!jQuery(this).is( ':checked' )) {
			
			commercekit_render_taxes_table();
			
		} else {

			commercekit_hide_taxes_table();
			
		}

	});


/***********************************************************/
/* Handle deleting a tax rate
/***********************************************************/


	jQuery(document).delegate( '.commercekit-delete-tax-rate-action', 'click' , function() {

		var tr = jQuery(this).closest( 'tr' );

		var index_of_tr = jQuery(tr).prevAll().length;

		commercekit_options.taxes_settings.items.splice( index_of_tr , 1 );

		tr.remove();

		if (commercekit_options.taxes_settings.items.length === 0) {
			jQuery('#commercekit-taxes-heading').addClass('hidden');
		}

	});


/***********************************************************/
/* Add a tax rate
/***********************************************************/


	jQuery(document).delegate( '#commercekit-add-tax-rule', 'click', function(e) {

		e.preventDefault();

		add_tax_rule();

	});


	var add_tax_rule = function add_tax_rule() {

		var alternate = jQuery( '#commercekit-tax-rules tr' ).length % 2;
		var the_class = '';

		if (!alternate) {
			the_class = 'class="alternate new"';
		} else {
			the_class = 'class="new"';
		}

		var countries_options = '';

		var check_if_not_existing_otherwise_add = function check_if_not_existing_otherwise_add( country, is_group ) {

			var found = false;

			for (var i in commercekit_options.taxes_settings.items) {

				if (commercekit_options.taxes_settings.items.hasOwnProperty(i)) {

					if (commercekit_options.taxes_settings.items[i].country_name === country) {
						found = true;
					}

				}

			}

			if (!found) {

				if (is_group) {

					if (country === 'all') {
						countries_options += '<option name="all" value="all" data-type="group">' + commercekit_strings['All countries'] + '</option>';
					} else {
						countries_options += '<option name="' + country + '" data-type="group">' + country + '</option>';
					}

				} else {
					countries_options += '<option name="' + country + '">' + country + '</option>';
				}

				return true;
			}

			return false;
		};

		var is_group = true;

		var added_worldwide_option = check_if_not_existing_otherwise_add( 'all', is_group );
		if (added_worldwide_option) {
			countries_options += '<option name="" disabled>-----------</option>';
		}

		var added_continent_option = false;
		tmp_added_continent_option = check_if_not_existing_otherwise_add( 'North America', is_group );
		if (tmp_added_continent_option === true) added_continent_option = true;
		tmp_added_continent_option = check_if_not_existing_otherwise_add( 'Europe', is_group );
		if (tmp_added_continent_option === true) added_continent_option = true;
		tmp_added_continent_option = check_if_not_existing_otherwise_add( 'Oceania', is_group );
		if (tmp_added_continent_option === true) added_continent_option = true;
		tmp_added_continent_option = check_if_not_existing_otherwise_add( 'South America', is_group );
		if (tmp_added_continent_option === true) added_continent_option = true;
		tmp_added_continent_option = check_if_not_existing_otherwise_add( 'Africa', is_group );
		if (tmp_added_continent_option === true) added_continent_option = true;
		tmp_added_continent_option = check_if_not_existing_otherwise_add( 'Asia', is_group );
		if (tmp_added_continent_option === true) added_continent_option = true;

		if (added_continent_option === true) {
			countries_options += '<option name="" disabled>-----------</option>';
		}


		for (var i in CommerceKit.countries) {

			if (CommerceKit.countries.hasOwnProperty(i)) {

				check_if_not_existing_otherwise_add(CommerceKit.countries[i].name);

			}

		}


		var html =  '<tr ' + the_class + '>' +
						'<td class="country"><select class="country">' + countries_options + '</select></td>' +
						'<td class="rate"><input type="text" class="rate small-text" />%</td>' +
						'<td><div class="row-actions"><span class="trash cursor-pointer"><a class="commercekit-delete-tax-rate-action">' + commercekit_strings['Trash'] + '</a></div></td>' +
					'</tr>';


		jQuery( '#commercekit-tax-rules' ).append(html);



		/***********************************************************/
		/* Add the newly added shipping option to the JS object
		/***********************************************************/

		if (!commercekit_options.taxes_settings.items) {
			commercekit_options.taxes_settings.items = [];
		}

		//Add new tax rate to commercekit_options.taxes_settings

		jQuery( '#commercekit-tax-rules tr.new' ).toArray().forEach(function(item) {
			var country_name = jQuery(jQuery(item).find( '.country option:selected' )[0]).val();
			//var state_or_province = jQuery(jQuery(item).find( '.allowed' )[0]).is( ':checked' );
			var rate = jQuery(jQuery(item).find( '.rate' )[0]).val() || 0;
			jQuery(item).removeClass( 'new' );

			var tax_rule = {
				'country_name': country_name,
				'rate': rate
			};

			if (jQuery(jQuery(item).find( '.country option:selected' )[0]).data('type') === 'group') {
				tax_rule.type = 'group';
			}

			commercekit_options.taxes_settings.items.push( tax_rule	);

		});


		jQuery('#commercekit-taxes-heading').removeClass('hidden');
		jQuery('#commercekit-tax-rules').removeClass('hidden');
	};


/***********************************************************/
/* Handle changing country in a new tax rate
/***********************************************************/


	jQuery(document).delegate( '#commercekit-tax-rules select.country', 'change', function(e) {

		var tr = jQuery( this ).closest( 'tr' );
		var index_of_tr = jQuery(tr).prevAll().length;
		var country_name = jQuery( this ).val();
		var type = jQuery(tr.find( '.country option:selected' )[0]).data('type');

		CommerceKit.country_being_added = commercekit_options.taxes_settings.items[ index_of_tr ];
		CommerceKit.country_being_added.country_name = country_name;

		if (type === 'group') {
			CommerceKit.country_being_added.type = type;
		}

		//If the user choose the US, show the states option

		if (country_name === 'United States') {
			var the_val = jQuery(tr).find( 'input.rate' ).val();

			var the_html = '';

			the_html += '<table id="js__state-rules">';
			the_html += 	'<tr>';
			the_html += 		'<td class="all-states">All states</td>';
			the_html += 		'<td><input type="text" class="state-rate small-text" value="' + the_val + '" />%</td>';
			the_html += 	'</tr>';
			the_html += 	'<tr>';
			the_html += 		'<td><a href="#" id="js__add-state-rule">Add state rule</a></td>';
			the_html += 		'<td></td>';
			the_html += 	'</tr>';
			the_html += '</table>';

			jQuery(tr).find( 'td.rate' ).html( the_html );

			if ( !CommerceKit.country_being_added.states ) {
				CommerceKit.country_being_added.states = [{ 'state_name': 'all' }];
			}

		}


	});


	jQuery(document).delegate( '#commercekit-tax-rules select.state', 'change', function(e) {

		var tr = jQuery( this ).closest( 'tr' );
		var index_of_tr = jQuery(tr).prevAll().length;
		var state_name = jQuery( this ).val();

		CommerceKit.country_being_added.states[index_of_tr].state_name = state_name;

	});


	jQuery(document).delegate( '#js__add-state-rule', 'click', function(e) {

		var states_options = '';

		var check_if_state_not_existing_otherwise_add = function check_if_state_not_existing_otherwise_add( state ) {

			var found = false;

			for (var i in CommerceKit.country_being_added.states) {

				if (CommerceKit.country_being_added.states.hasOwnProperty(i)) {

					if (CommerceKit.country_being_added.states[i] === state) {
						found = true;
					}

				}

			}

			if ( !found ) {
				states_options += '<option name="' + state + '">' + state + '</option>';
			}

		};


		for (var i in CommerceKitLib.USA_states_array) {

			if (CommerceKitLib.USA_states_array.hasOwnProperty(i)) {

				check_if_state_not_existing_otherwise_add(CommerceKitLib.USA_states_array[i].name);

			}

		}


		var the_html = '';
		the_html += '<tr>';
		the_html += 	'<td class="state"><select class="state">' + states_options + '</select></td>';
		the_html += 	'<td><input type="text" class="state-rate small-text" />%</td>';
		the_html += '</tr>';


		jQuery('#js__state-rules').prepend(the_html)
		jQuery('.all-states').html('All other states');


		if ( !CommerceKit.country_being_added.states ) {
			CommerceKit.country_being_added.states = [];
		}


		var state_name = jQuery(jQuery( '#commercekit-tax-rules select.state option:selected' )[0]).val();
		CommerceKit.country_being_added.states.unshift({ 'state_name': state_name  });

	});





/***********************************************************/
/* Handle changing rate in a new tax rate
/***********************************************************/


	jQuery(document).delegate( '#commercekit-tax-rules input.rate', 'keyup', function(e) {

		var tr = jQuery( this ).closest( 'tr' );
		var index_of_tr = jQuery( tr ).prevAll().length;
		var rate = jQuery( this ).val() || 0;
		commercekit_options.taxes_settings.items[ index_of_tr ].rate = rate;

	});


/***********************************************************/
/* Handle changing rate in a new state tax rate
/***********************************************************/


	jQuery(document).delegate( '#commercekit-tax-rules input.state-rate', 'keyup', function(e) {

		var tr = jQuery( this ).closest( 'tr' );
		var index_of_tr = jQuery( tr ).prevAll().length;
		var rate = jQuery( this ).val() || 0;
		CommerceKit.country_being_added.states[ index_of_tr ].rate = rate;

	});


});