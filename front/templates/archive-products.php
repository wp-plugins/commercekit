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
 * This template is used to show the products list.
 * Override it by copying it to yourtheme/commercekit/archive-products.php
 *******************************/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header( 'shop' ); ?>


<?php commercekit_get_template( 'partials/cart.php' ); ?>


<div class="commercekit">

	<?php do_action( 'commercekit_before_main_content' ); //breadcrumb ?>

	<div class="js__commercekit-cart-teaser-container hidden"></div>

	<?php if ( have_posts() ) : ?>

		<ul class="products list">

			<?php while ( have_posts() ) : the_post(); ?>

				<li class="product">

					<article class="post">

						<?php
						/**
						* commercekit_before_item_title hook
						*
						* @hooked commercekit_template_partial_product_thumbnail - 10
						*/
						do_action( 'commercekit_before_item_title' );
						?>


						<?php
						/**
						* commercekit_item_title_archive hook
						*
						* @hooked commercekit_template_partial_product_title_archive - 10
						*/
						do_action( 'commercekit_item_title_archive' );
						?>


					  	<?php
						/**
						 * commercekit_after_item_title hook
						 *
						 * @hooked commercekit_template_partial_product_price - 10
						 */
						do_action('commercekit_after_item_title');
					  	?>


						<?php the_excerpt(); ?>

					</article>

			  	</li>

			<?php endwhile; // end of the loop. ?>

		</ul>

		<nav>
		    <?php previous_posts_link() ?>
		    <?php next_posts_link() ?>
		</nav>

	<?php else : ?>

	  <?php commercekit_get_template( 'utility/no-products-found.php' ); ?>

	<?php endif; ?>

  	<?php do_action( 'commercekit_after_main_content' ); ?>

</div>

<?php do_action('commercekit_sidebar'); ?>

<?php get_footer( 'shop' ); ?>