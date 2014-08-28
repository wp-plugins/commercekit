<?php
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

/***********************************************************/
/* Show our Custom Post Type fields
/***********************************************************/


	add_action('admin_init', 'commercekit_order_add_custom_fields');

	function commercekit_order_add_custom_fields(){
		add_meta_box(
			"order-meta",
			__('Order Details', 'commercekit'),
			"commercekit_order_form_display_custom_fields",
			"ck_order",
			"normal",
			"high"
		);
	}

	function commercekit_order_form_display_custom_fields() {
		global $post;
		if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) return $post_id;
		?>

		<style type="text/css">
			<?php include('assets/commercekit-order-details.css'); ?>
		</style>

		<?php

			$custom = get_post_custom($post->ID);
			$products = json_decode(@$custom["_order_post_products"][0]);
			$address = json_decode(@$custom["_order_post_address"][0]);
			$shipping = json_decode(@$custom["_order_post_shipping"][0]);
			$transaction_id = @$custom["_order_post_transaction_id"][0];

  	 	    $options = get_option( 'commercekit_options' );
            $currency_symbol = $options[ 'currency_symbol' ];
            $currency_position = $options[ 'currency_position' ];

 		?>

		<div class="commercekit-order-custom-fields">

			<h2><?php _e('Products ordered', 'commercekit') ?></h2>

			<table class="widefat importers">

				<thead>

					<tr>
						<td class=""><strong><?php _e('Name', 'commercekit') ?></strong></td>
						<td class=""><strong><?php _e('Price each', 'commercekit') ?></strong></td>
						<td class=""><strong><?php _e('Quantity', 'commercekit') ?></strong></td>
					</tr>

				</thead>

				<tbody>

					<?php foreach ($products as $product) : ?>

						<tr>

							<td><a href="post.php?post=<?php echo $product->product_id ?>&amp;action=edit" target="_blank"><?php echo $product->product_title; ?></a></td>

							<td>
								<?php if ($currency_position == 'before') : ?>
									<?php echo $currency_symbol ?> <?php echo $product->product_price; ?>
								<?php else : ?>
									<?php echo $product->product_price; ?> <?php echo $currency_symbol ?>
								<?php endif ?>
							</td>

							<td><?php echo $product->product_quantity; ?></td>

						</tr>

					<?php endforeach ?>

				</tbody>

			</table>

			<br>
			<hr>

			<h2><?php _e('Shipping', 'commercekit') ?></h2>


			<?php echo $shipping->name ?>

			<?php if ($currency_position == 'before') : ?>
				(<?php echo $currency_symbol ?> <?php echo $shipping->rate ?>)
			<?php else : ?>
				(<?php echo $shipping->rate ?> <?php echo $currency_symbol ?>)
			<?php endif ?>

			<br>
			<br>
			<hr>

			<?php if ( strpos( $options[ 'stipe_api_key_public' ], '_test_') !== false ) : ?>
				<?php $stripe_url = "https://dashboard.stripe.com/test/payments/$transaction_id"; ?>
			<?php else : ?>
				<?php $stripe_url = "https://dashboard.stripe.com/payments/$transaction_id"; ?>
			<?php endif ?>

			<br>
			<p><?php _e('Total paid for products', 'commercekit') ?>

			<?php if ( ! $options[ 'taxes_included_in_products_prices' ] ) : ?>
				(<?php _e('Including taxes', 'commercekit') ?>)
			<?php endif ?>
			:

			<?php if ($currency_position == 'before') : ?>
				<?php echo $currency_symbol ?> <?php echo @$custom["_order_post_total_paid"][0] ?>
			<?php else : ?>
				<?php echo @$custom["_order_post_total_paid"][0] ?> <?php echo $currency_symbol ?>
			<?php endif ?>

			<p><?php _e('Total paid including shipping', 'commercekit') ?>
			:

			<?php if ($currency_position == 'before') : ?>
				<?php echo $currency_symbol ?> <?php echo @$custom["_order_post_total_paid_including_shipping"][0] ?>
			<?php else : ?>
				<?php echo @$custom["_order_post_total_paid_including_shipping"][0] ?> <?php echo $currency_symbol ?>
			<?php endif ?>

			<br><br>
			<a href="<?php echo $stripe_url ?>" target="_blank"><?php _e('See the order on Stripe', 'commercekit') ?></a>

			<br>
			<br>
			<hr>

			<h2><?php _e('Client address', 'commercekit') ?></h2>

			<table class="widefat importers">

				<tbody>

					<tr>
						<td><strong><?php _e('First Name', 'commercekit') ?></strong></td>
						<td><?php echo $address->firstname ?></td>
					</tr>
					<tr>
						<td><strong><?php _e('Last Name', 'commercekit') ?></strong></td>
						<td><?php echo $address->lastname ?></td>
					</tr>
					<tr>
						<td><strong><?php _e('Email', 'commercekit') ?></strong></td>
						<td><?php echo $address->email ?></td>
					</tr>
					<tr>
						<td><strong><?php _e('Telephone', 'commercekit') ?></strong></td>
						<td><?php echo $address->telephone ?></td>
					</tr>
					<tr>
						<td><strong><?php _e('Address 1', 'commercekit') ?></strong></td>
						<td><?php echo $address->address1 ?></td>
					</tr>
					<tr>
						<td><strong><?php _e('Address 2', 'commercekit') ?></strong></td>
						<td><?php echo $address->address2 ?></td>
					</tr>
					<tr>
						<td><strong><?php _e('City', 'commercekit') ?></strong></td>
						<td><?php echo $address->city ?></td>
					</tr>

					<?php if ($address->country == 'United States') : ?>
						<tr>
							<td><strong><?php _e('ZIP', 'commercekit') ?></strong></td>
							<td><?php echo $address->zip ?></td>
						</tr>
						<tr>
							<td><strong><?php _e('State', 'commercekit') ?></strong></td>
							<td><?php echo $address->state ?></td>
						</tr>
					<?php else : ?>
						<tr>
							<td><strong><?php _e('Postal Code', 'commercekit') ?></strong></td>
							<td><?php echo $address->postalcode ?></td>
						</tr>
						<tr>
							<td><strong><?php _e('Province', 'commercekit') ?></strong></td>
							<td><?php echo $address->province ?></td>
						</tr>
					<?php endif ?>

					<tr>
						<td><strong><?php _e('Country', 'commercekit') ?></strong></td>
						<td><?php echo $address->country ?></td>
					</tr>


				</tbody>

			</table>



		</div>
		<?php
	}


/***********************************************************/
/* Customize the backend products list table columns by adding custom data
/***********************************************************/

	/***********************************************************/
	/* Remove 'quick edit'
	/***********************************************************/


	add_action( 'post_row_actions', 'commercekit_orders_list_row_actions', 10, 2 );


	function commercekit_orders_list_row_actions( $actions, $post ) {

		if ( 'ck_order' == $post->post_type ) {
			unset( $actions['inline hide-if-no-js'] );
			unset( $actions['edit'] );
			unset( $actions['trash'] );
		}

	  	return $actions;

	}


	/***********************************************************/
	/* Remove 'edit' from the bulk actions
	/***********************************************************/


	add_filter( 'bulk_actions-edit-ck_order', 'commercekit_orders_list_bulk_actions' );


    function commercekit_orders_list_bulk_actions( $actions ) {

        unset( $actions[ 'edit' ] );
        return $actions;

    }


	/***********************************************************/
	/* Customize the columns
	/***********************************************************/


	add_filter("manage_edit-ck_order_columns", "commercekit_orders_list_custom_columns_names");

	function commercekit_orders_list_custom_columns_names( $columns ) {
	    $columns = array(
	        "cb" => "<input type=\"checkbox\" />",
	        "title" => __('Ordered by', 'commercekit'),
	        "price" => __('Total amount', 'commercekit'),
	        "shipping" => __('Shipping', 'commercekit'),
	        "date" => __('Date', 'commercekit')
	    );

	    return $columns;
	}


    add_action("manage_ck_order_posts_custom_column",  "commercekit_orders_list_custom_columns_content");

    function commercekit_orders_list_custom_columns_content($column){
        global $post;
        $custom = get_post_custom();

        $options = get_option( 'commercekit_options' );
        $currency_position = $options[ 'currency_position' ];
        $currency_symbol = $options[ 'currency_symbol' ];

        switch ($column)
        {
            case "price":

                if ( $currency_position == 'before' ) {
                    echo $currency_symbol . ' ' . @$custom[ '_order_post_total_paid' ][0];
                } else {
                    echo @$custom[ '_order_post_total_paid' ][0] . ' ' . $currency_symbol;
                }

            	break;

            case "shipping":

            	$shipping = json_decode(@$custom["_order_post_shipping"][0]);

            	if ($shipping) {

					echo @$shipping->name;

					echo ' (';
	                if ( $currency_position == 'before' ) {
	                    echo $currency_symbol . ' ' . $shipping->rate;
	                } else {
	                    echo $shipping->rate . ' ' . $currency_symbol;
	                }
	                echo ')';

				}

            	break;

        }
    }

/***********************************************************/
/*
/***********************************************************/


?>