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
/* Ensure product price is > 0 when saving the product
/***********************************************************/


	jQuery(document).delegate( 'form#post', 'submit', function(e) {

		e.preventDefault();

		var price = jQuery( 'input[name=price]' ).val();

		if ( !jQuery.isNumeric(price) || price <= 0 ) {

			alert(commercekit_strings['Product price must be an amount > 0']);
			jQuery('#publishing-action .spinner').hide();
			jQuery('#publish').removeClass('disabled')
			return;

		}

		this.submit();

	});


});