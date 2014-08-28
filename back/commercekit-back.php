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

/****************************************************
 * This file includes functionalities just needed for
 * the backend
 ****************************************************/


/***********************************************************/
/* Load some utilities files
/***********************************************************/


include plugin_dir_path( __FILE__ ) . 'commercekit-back-utilities.php';
include plugin_dir_path( __FILE__ ) . 'commercekit-back-custom-post-type-product.php';
include plugin_dir_path( __FILE__ ) . 'commercekit-back-custom-post-type-order.php';


/***********************************************************/
/* Add stylesheet to the page
/***********************************************************/


	add_action( 'admin_enqueue_scripts', 'commercekit_safely_add_stylesheet_and_scripts_in_options' );


	function commercekit_safely_add_stylesheet_and_scripts_in_options() {

		wp_enqueue_script( 'jquery' );

		wp_enqueue_script( 'commercekit-js-lib', plugins_url( '../lib/commercekit.lib.js', __FILE__ ) );
		wp_enqueue_script( 'commercekit-js-options', plugins_url( 'assets/commercekit-options.js', __FILE__ ) );
		wp_enqueue_script( 'commercekit-js-options-selling', plugins_url( 'assets/commercekit-options-selling.js', __FILE__ ) );
		wp_enqueue_script( 'commercekit-js-options-shipping', plugins_url( 'assets/commercekit-options-shipping.js', __FILE__ ) );
		wp_enqueue_script( 'commercekit-js-options-taxes', plugins_url( 'assets/commercekit-options-taxes.js', __FILE__ ) );

		//Send the CommerceKit options to JS too, to be used by commercekit-options.js
		$options = get_option( 'commercekit_options' );
		wp_localize_script( 'commercekit-js-options', 'commercekit_options', $options );



		wp_localize_script( 'commercekit-js-lib', 'commercekit_strings', array(

			'Trash' => __( 'Trash', 'commercekit' ),
			'All countries' => __( 'All countries', 'commercekit' ),
			'You must sell to at least 1 country' => __( 'You must sell to at least 1 country', 'commercekit' ),
			'You must have at least one shipping method' => __( 'You must have at least one shipping method', 'commercekit' ),
			'Warning: not all countries you sell to have a shipping method assigned. Those countries will have free shipping unless you add a shipping method to them.' => __( 'Warning: not all countries you sell to have a shipping method assigned. Those countries will have free shipping unless you add a shipping method to them.', 'commercekit' ),
			'Except' => __( 'Except', 'commercekit' ),
			'Applies to' => __( 'Applies to', 'commercekit' ),
			'All countries' => __( 'All countries', 'commercekit' ),
			'This country cannot be added to the exceptions because it is listed in the allowed countries. First, remove it from there.' => __( 'This country cannot be added to the exceptions because it is listed in the allowed countries. First, remove it from there.', 'commercekit' ),
			'Product price must be an amount > 0' => __( 'Product price must be an amount > 0', 'commercekit' ),
			'All tax rates must have a value' => __( 'All tax rates must have a value', 'commercekit' )
		) );


	}



/***********************************************************/
/* Add orders and settings sidebar menu items
/***********************************************************/


	add_action( 'admin_menu', 'commercekit_add_orders_and_settings_sidebar_menu', 60 );


	function commercekit_add_orders_and_settings_sidebar_menu() {

		$options_page = add_options_page(
			'CommerceKit',
			'CommerceKit',
			'manage_options',
			'commercekit_config',
			'commercekit_config_page'
		);

		if ( $options_page ) {
			add_action( 'load-' . $options_page, 'commercekit_render_help' );
       	}

	}


/***********************************************************/
/* The CommerceKit inline help
/***********************************************************/

	function custom_help() {

		global $post_ID;

		if ( isset($_GET['post_type']) ) {
			$post_type = $_GET['post_type'];
		} else {
			$post_type = get_post_type( $post_ID );
		}

		if ( $post_type == 'ck_product' || $post_type == 'ck_order' ) {
			commercekit_render_help();
		}

	}


	add_action('admin_head', 'custom_help');


	function commercekit_render_help() {

		$screen = get_current_screen();

		$screen->add_help_tab( array(
	        'id'       => 'commercekit_help_documentation',
	        'title'    => 'Documentation',
	        'callback' => 'commercekit_help_documentation'
		) );

		$screen->add_help_tab( array(
	        'id'       => 'commercekit_help_support',
	        'title'    => 'Support',
	        'callback' => 'commercekit_help_support',
		) );

		$screen->add_help_tab( array(
	        'id'       => 'commercekit_help_setup',
	        'title'    => 'Setup CommerceKit',
	        'callback' => 'commercekit_help_setup',
		) );

		$screen->set_help_sidebar( '<p><strong>For more information:</strong></p><p><a href="http://wpcommercekit.com" target="_blank">CommerceKit website</a></p><p><a href="http://wordpress.org/extend/plugins/commercekit/" target="_blank">WordPress.org page</a></p><p><a href="mailto:support@wpcommercekit.com" target="_blank">Email us for help</a></p>' );
	}


	function commercekit_help_documentation() { ?>
	    <p>The CommerceKit documentation can be found <a href="http://wpcommercekit.com/docs" target="_blank">on our site</a>.</p>
	    <p>If you need something more or you're just confused, email us at <a href="mailto:support@wpcommercekit.com" target="_blank">support@wpcommercekit.com</a></p>
    <?php }


    function commercekit_help_support() { ?>
        <p>Read the <a href="http://wpcommercekit.com/installation-guide/" target="_blank">installation guide</a></p>
        <p>The CommerceKit development team provides support and related services and can be reached at <a href="mailto:support@wpcommercekit.com" target="_blank">support@wpcommercekit.com</a></p>
	    <p>We only use email for support. No support is provided on the WordPress.org forum. If you post there, we'll kindly ask you to email us.</p>
    <?php }


    function commercekit_help_setup() { ?>
        <p>Read the <a href="http://wpcommercekit.com/installation-guide/" target="_blank">installation guide</a></p>
    <?php }


/***********************************************************/
/* Handle opening the CommerceKit settings
/***********************************************************/


	function commercekit_config_page() {

		wp_enqueue_style( 'commercekit-css-options', plugins_url( 'assets/commercekit-options.css', __FILE__ ) );

		// Retrieve plugin configuration options from database
		$options = get_option( 'commercekit_options' );

		$currency = esc_html( @$options['currency'] );
		$currencies = commercekit_get_currencies();
		$currency_symbol = commercekit_get_symbol_of_currency($currency);
		$currency_position = esc_html( @$options['currency_position'] );


		/***********************************************************/
		/* Add message to footer
		/***********************************************************/


			add_filter('admin_footer_text', 'commercekit_dashboard_footer');

			function commercekit_dashboard_footer () {
				echo 'If you need help with CommerceKit, <a href="mailto:support@wpcommercekit.com">email us</a>';
			}

		?>

		<div class="wrap">
			<h2><?php _e('CommerceKit Settings', 'commercekit') ?></h2>

	        <?php if ( isset( $_GET['message'] ) && $_GET['message'] == '1' ) { ?>
	        	<div id='message' class='updated fade'><p><strong><?php _e('Settings Saved', 'commercekit') ?></strong></p></div>
			<?php } ?>

			<form method="post" action="admin-post.php" id="commercekit-settings-form">

				<!-- Adding security through hidden referrer field -->
				<?php wp_nonce_field( 'commercekit' ); ?>
				<input type="hidden" name="action" value="save_commercekit_options">

				<!-- JSON-encoded settings -->
				<input type="hidden" id="selling_settings" name="selling_settings" value="{}">
				<input type="hidden" id="shipping_settings" name="shipping_settings" value="{}">
				<input type="hidden" id="taxes_settings" name="taxes_settings" value="{}">

				<table class="form-table">
					<tbody>

						<tr>
							<th scope="row"><label for="currency"><?php _e('Currency', 'commercekit') ?></label></th>
							<td>

								<select name="currency" id="currency">

									<?php foreach ($currencies as $key => $value) : ?>
										<option
										<?php if ($key == $currency) echo 'selected="selected"' ?>
										value="<?php echo $key ?>"><?php echo $key ?></option>
									<?php endforeach; ?>

								</select>


								<select name="currency_position" id="currency_position">
									<option <?php if ($currency_position == 'before') echo 'selected="selected"' ?> value="before"><?php _e('Show it before the price', 'commercekit') ?></option>
									<option <?php if ($currency_position == 'after') echo 'selected="selected"' ?> value="after"><?php _e('Show it after the price', 'commercekit') ?></option>
								</select>

								<input type="hidden" id="currency_symbol" name="currency_symbol" value="<?php echo esc_html( @$options['currency_symbol'] ); ?>" />

							</td>
						</tr>

						<tr>
							<th scope="row"><label for="stipe_api_key_secret"><?php _e('Stripe API Keys', 'commercekit') ?></label></th>
							<td>

								<?php _e('Secret key', 'commercekit') ?>: <input type="text" name="stipe_api_key_secret" id="stipe_api_key_secret" value="<?php echo esc_html( @$options['stipe_api_key_secret'] ); ?>"/>
								<br />

								<?php _e('Public key', 'commercekit') ?>: <input type="text" name="stipe_api_key_public" value="<?php echo esc_html( @$options['stipe_api_key_public'] ); ?>"/>

							</td>
						</tr>

						<tr>
							<th scope="row"><label><?php _e('Selling', 'commercekit') ?></label></th>
							<td>

								<div id="commercekit-sell-to">
									<?php _e('I want to sell to clients that live in those countries:', 'commercekit') ?>

									<div id="selling-to-countries-container"></div>

									<div id="except-container" class="hidden">
										<br> <?php _e('Except', 'commercekit') ?> <div id="except-those-countries-container"></div>

									</div>

									<br><br>
									<a href="#TB_inline?width=300&height=250&inlineId=add-new-country" class="thickbox"><?php _e('Add new', 'commercekit') ?></a>
									<span class="add-exception-button-container hidden">
										 |
										<a href="#TB_inline?width=300&height=250&inlineId=add-new-exception" class="thickbox"><?php _e('Add an exception', 'commercekit') ?></a>
									</span>

									<br />

									<?php add_thickbox(); ?>
									<div id="add-new-country" class="hidden">

										<div id="add-country-modal">
											<p>
											  <?php _e('Add a country', 'commercekit') ?>.
											</p>

											<div id="js__want-to-sell__add-new-country__select"></div>

											<br >
											<button id="js__want-to-sell__add-new-country"><?php _e('Add', 'commercekit') ?></button>
										</div>
									</div>

									<div id="add-new-exception" class="hidden">

										<div id="add-exception-modal">
											<p>
												<?php _e('Add an exception', 'commercekit') ?>.
											</p>

											<p class="description">
												<?php _e('Useful if you want to enable all countries except a few, or for example an entire continent except one or two countries.', 'commercekit') ?>
											</p>

											<div id="js__want-to-sell__add-new-exception__select"></div>

											<br >
											<button id="js__want-to-sell__add-new-exception"><?php _e('Add', 'commercekit') ?></button>
										</div>
									</div>

								</div>
							</td>
						</tr>

						<tr>
							<th scope="row"><label><?php _e('Shipping', 'commercekit') ?></label></th>
							<td>

								<div id="commercekit-shipping-full">
									<table class="widefat importers">

										<thead>

											<tr>
												<td class=""><strong><?php _e('Option name', 'commercekit') ?></strong></td>
												<td class=""><strong><?php _e('Cost', 'commercekit') ?></strong></td>
												<td class=""><strong><?php _e('Countries', 'commercekit') ?></strong></td>
												<td></td>
											</tr>

										</thead>

										<tfoot>

											<tr>
												<td colspan="3" class="commercekit-center-text">
													<button class="button-secondary" id="commercekit-add-shipping-option"><?php _e('Add shipping option', 'commercekit') ?></button>
												</td>
											</tr>

										</tfoot>

										<tbody id="commercekit-shipping-options"></tbody>

									</table>
								</div>

							</td>
						</tr>

						<tr>
							<th scope="row"><label for="taxes">Taxes</label></th>
							<td>

								<div id="commercekit-taxes">

									<input type="checkbox" id="taxes_included_in_products_prices" name="taxes_included_in_products_prices" <?php checked(1, $options[ 'taxes_included_in_products_prices' ]); ?> /> <?php _e('All taxes are included in the products prices', 'commercekit') ?>

									<br><br>


									<table class="widefat importers">

										<thead id="commercekit-taxes-heading" class="hidden">

											<tr>
												<td class=""><strong><?php _e('Country', 'commercekit') ?></strong></td>
												<td class=""><strong><?php _e('Rate', 'commercekit') ?></strong></td>
											</tr>

										</thead>

										<tfoot id="commercekit-taxes-footer" class="hidden">

											<tr>
												<td colspan="3" class="commercekit-center-text">
													<button class="button-secondary" id="commercekit-add-tax-rule"><?php _e('Add tax rule', 'commercekit') ?></button>
												</td>
											</tr>

										</tfoot>

										<tbody id="commercekit-tax-rules"></tbody>

									</table>

								</div>

							</td>
						</tr>



					</tbody>
				</table>

				<br />
				<input type="submit" value="<?php _e('Save Changes', 'commercekit') ?>" class="button-primary"/>

			</form>
		</div>

		<?php
	}


/***********************************************************/
/* Handle saving the settings
/***********************************************************/


	function commercekit_admin_init() {
		add_action( 'admin_post_save_commercekit_options', 'commercekit_process_options' );
	}

	function commercekit_process_options() {

		// Check that user has proper security level
		if ( !current_user_can( 'manage_options' ) ) {
			wp_die( 'Not allowed' );
		}

		// Check that nonce field created in configuration form is present
		check_admin_referer( 'commercekit' );

	    // Retrieve original plugin options array
	    $options = get_option( 'commercekit_options' );

	    // Cycle through all text form fields and store their values in the options array
	    foreach ( array(
	    	'currency',
	    	'currency_position',
	    	'currency_symbol',
	    	'stipe_api_key_secret',
	    	'stipe_api_key_public',
	    	'taxes_settings',
	    	'shipping_settings',
	    	'selling_settings' ) as $option_name ) {
	        if ( isset( $_POST[$option_name] ) ) {
	            $options[$option_name] = sanitize_text_field( $_POST[$option_name] );
			}
		}

 	    // Cycle through all check box form fields and set the options
 	    // array to true or false values based on presence of
 	    // variables
 	    foreach ( array( 'taxes_included_in_products_prices' ) as $option_name ) {
 	        if ( isset( $_POST[$option_name] ) ) {
 	        	$options[$option_name] = true;
 	    	} else {
 	        	$options[$option_name] = false;
 	    	}
 		}

		// Store updated options array to database
		update_option( 'commercekit_options', $options );

		// Redirect the page to the configuration form that was processed
		wp_redirect( add_query_arg( array( 'page' => 'commercekit_config', 'message' => '1' ), admin_url( 'options-general.php' ) ) );

		exit;
	}

	//Make sure this is at the end of the file, or at least after the functions definition
	add_action( 'admin_init', 'commercekit_admin_init' );
