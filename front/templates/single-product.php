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
 * Override it by copying it to yourtheme/commercekit/single-product.php
 *******************************/

if ( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

get_header( 'shop' ); ?>


<?php commercekit_get_template( 'partials/cart.php' ); ?>


<div class="commercekit">

	<?php do_action( 'commercekit_before_main_content' ); //breadcrumb ?>

	<div class="js__commercekit-cart-teaser-container hidden"></div>

	<?php if ( have_posts() ) : ?>

		<?php while ( have_posts() ) : the_post(); ?>


			<script>
			(function() {

			  jQuery(document).ready(function() {

			    CommerceKit.currentProduct = {
			      	id: "<?php echo addslashes($post->ID) ?>",
			      	title: "<?php echo addslashes(the_title()) ?>",
					price: "<?php echo $post->price ?>"
			    };

			  });

			}());
			</script>

		  	<div class="product">


				<div class="images">

					<?php
					/**
					 * commercekit_before_item_title hook
					 *
					 * @hooked commercekit_template_partial_product_thumbnail - 10
					 */
					do_action( 'commercekit_before_item_title' );
					?>

				</div>


				<div class="summary entry-summary">

					<?php
					/**
					* commercekit_item_title_single hook
					*
					* @hooked commercekit_template_partial_product_title_single - 10
					*/
					do_action( 'commercekit_item_title_single' );
					?>

					<div>

						<p class="price">
							<span class="amount">
								<?php
								/**
								 * commercekit_after_item_title hook
								 *
								 * @hooked commercekit_template_partial_product_price - 10
								 */
								do_action('commercekit_after_item_title');
								?>
							</span>
						</p>

					</div>

					<div class="commercekit-add-to-cart">

						<div class="quantity commercekit-quantity-chooser buttons_added">

							<input type="button" value="-" class="remove-one">

							<input type="text" id="quantity" name="quantity" value="1" title="Qty" class="input-text qty text commercekit-quantity-input-box js__commercekit__quantity-box-cart" size="4" min="1">

							<input type="button" value="+" class="add-one">

						</div>

						<button type="submit" class="commercekit-add-to-cart-button button js-button__add-to-cart"><?php _e('Add to cart', 'commercekit') ?></button>

					</div>
				</div>

				<div class="panel entry-content" id="tab-description">

					<?php the_content(); ?>

				</div>

		  </div>

		<?php endwhile; // end of the loop. ?>

	<?php else : ?>

	  <?php commercekit_get_template( 'loop/no-products-found.php' ); ?>

	<?php endif; ?>

	<?php do_action( 'commercekit_after_main_content' ); ?>

</div>

<?php do_action('commercekit_sidebar'); ?>

<?php get_footer( 'shop' ); ?>
