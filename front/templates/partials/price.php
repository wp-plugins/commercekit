<?php
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

/********************************
 * This template prints the product price
 * Override it by copying it to yourtheme/commercekit/product/price.php
 *******************************/

if (!defined('ABSPATH')) exit(); // Exit if accessed directly
?>

<?php global $post; ?>

<?php $commercekit_options = get_option( 'commercekit_options' ); ?>

<?php if ($price_html = $post->price) : ?>

	<span class="price">

		<?php $currency_symbol = $commercekit_options['currency_symbol'] ?>

		<?php if ($commercekit_options['currency_position'] == 'before') : ?>
			<?php echo $currency_and_subtotal = $currency_symbol . ' ' . $price_html; ?>
		<?php else : ?>
			<?php echo $currency_and_subtotal = $price_html . ' ' . $currency_symbol ?>
		<?php endif ?>

		<?php

		$options = get_option( 'commercekit_options' );
		if ( !$options[ 'taxes_included_in_products_prices' ] ) {
			echo _e('Excluding taxes', 'commercekit');
		}

		?>

	</span>

<?php endif; ?>