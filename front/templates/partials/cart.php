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
?>

<script src="https://checkout.stripe.com/checkout.js"></script>

<link rel='stylesheet' href='<?php echo plugins_url() ?>/commercekit/front/assets/commercekit-cart.css'></script>

<div class="reset modal-container commercekit_shopping_cart hidden">

	<div class="modal-inner-container">

		<div class="modal-content clearfix hidden" id="modal-cart">

			<div class="modal-header">
				<h3 class="modal-title"><?php _e('Cart', 'commercekit') ?></h3>
			</div>

			<div class="modal-body">
				<div>
					<div class="clearfix">
						<div>
							<div>
								<table class="products">
									<thead>
										<tr>
											<th><?php _e('Product', 'commercekit') ?></th>
											<th><?php _e('Quantity', 'commercekit') ?></th>
											<th><?php _e('Amount', 'commercekit') ?></th>
											<th></th>
										</tr>
									</thead>
									<tbody>

									</tbody>


									<tfoot>
										<tr>
											<td><?php _e('Subtotal', 'commercekit') ?>

											<?php
											$options = get_option( 'commercekit_options' );
											if ( !$options[ 'taxes_included_in_products_prices' ] ) {
												echo '(' . __('Excluding taxes', 'commercekit') . ')';
											}
											?>

											</td>
											<td></td>
											<td class="cart-subtotal"></td>
											<td></td>
										</tr>
									</tfoot>
								</table>
							</div>

						</div>
					</div>
				</div>
			</div>


			<div class="modal-footer">
				<div class="">
					<div class="">
						<div class="btn-group">
							<button class="btn float-left" id="js__back-to-site">
								<?php _e('Back', 'commercekit') ?>
							</button>
							<button class="btn float-right" id="js__proceed-to-checkout">
								<?php _e('Proceed to checkout', 'commercekit') ?>
							</button>
						</div>
					</div>
				</div>
			</div>


		</div>





		<div class="modal-content clearfix hidden" id="modal-checkout-country">

			<div class="modal-header">
				<h3 class="modal-title">Checkout</h3>
			</div>

			<div class="modal-body">
				<div>
					<div class="clearfix">
						<div>
							<div>
								<ul class="checkout-navigation">

									<li class="active"><?php _e('Country', 'commercekit') ?></li>
									<li><?php _e('Address', 'commercekit') ?></li>
									<li><?php _e('Shipping', 'commercekit') ?></li>
									<li><?php _e('Confirm', 'commercekit') ?></li>
									<li><?php _e('Receipt', 'commercekit') ?></li>

								</ul>


								<div class="checkout-content align-center">

									<?php _e('Choose your country', 'commercekit') ?>

									<br />
									<br />

									<select class="js__country-select-box"></select>

								</div>

							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="modal-footer">
				<div class="">
					<div class="">
						<div class="btn-group">
							<button class="btn float-left" id="js__back-to-cart">
								<?php _e('Back', 'commercekit') ?>
							</button>
							<button class="btn float-right" id="js__proceed-to-address">
								<?php _e('Next', 'commercekit') ?>
							</button>
						</div>
					</div>
				</div>
			</div>

		</div>





		<div class="modal-content clearfix hidden" id="modal-checkout-address">

			<div class="modal-header">
				<h3 class="modal-title"><?php _e('Checkout', 'commercekit') ?></h3>
			</div>

			<div class="modal-body">
				<div>
					<div class="clearfix">
						<div>
							<div>
								<ul class="checkout-navigation">

									<li><?php _e('Country', 'commercekit') ?></li>
									<li class="active"><?php _e('Address', 'commercekit') ?></li>
									<li><?php _e('Shipping', 'commercekit') ?></li>
									<li><?php _e('Confirm', 'commercekit') ?></li>
									<li><?php _e('Receipt', 'commercekit') ?></li>

								</ul>


								<div class="checkout-content align-center">

									<?php _e('Set your address', 'commercekit') ?>

									<br />
									<br />

									<div class="address-form">
										<span><?php _e('First Name', 'commercekit') ?>*</span>
										<input id="js-billing__firstname" />
										<span><?php _e('Last Name', 'commercekit') ?>*</span>
										<input id="js-billing__lastname" />
										<span><?php _e('Telephone', 'commercekit') ?>*</span>
										<input id="js-billing__telephone" />
										<span><?php _e('Email', 'commercekit') ?>*</span>
										<input id="js-billing__email" />
										<span><?php _e('Address 1', 'commercekit') ?>*</span>
										<input id="js-billing__address1" />
										<span><?php _e('Address 2', 'commercekit') ?></span>
										<input id="js-billing__address2" />
										<span><?php _e('City', 'commercekit') ?>*</span>
										<input id="js-billing__city" />

										<div class="js-billing__state__container hidden">
											<span><?php _e('State', 'commercekit') ?>*</span>
											<select id="js-billing__state"></select>
										</div>

										<div class="js-billing__zip__container hidden">
											<span><?php _e('ZIP', 'commercekit') ?>*</span>
											<input id="js-billing__zip" />
										</div>

										<div class="js-billing__postalcode__container hidden">
											<span><?php _e('Postal Code', 'commercekit') ?>*</span>
											<input id="js-billing__postalcode" />
										</div>

										<div class="js-billing__province__container hidden">
											<span><?php _e('Province', 'commercekit') ?>*</span>
											<input id="js-billing__province" />
										</div>

									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="modal-footer">
				<div class="">
					<div class="">
						<div class="btn-group">
							<button class="btn float-left" id="js__back-to-country">
								<?php _e('Back', 'commercekit') ?>
							</button>
							<button class="btn float-right" id="js__proceed-to-shipping">
								<?php _e('Next', 'commercekit') ?>
							</button>
						</div>
					</div>
				</div>
			</div>

		</div>



		<div class="modal-content clearfix hidden" id="modal-checkout-shipping">

			<div class="modal-header">
				<h3 class="modal-title"><?php _e('Checkout', 'commercekit') ?></h3>
			</div>

			<div class="modal-body">
				<div>
					<div class="clearfix">
						<div>
							<div>
								<ul class="checkout-navigation">

									<li><?php _e('Country', 'commercekit') ?></li>
									<li><?php _e('Address', 'commercekit') ?></li>
									<li class="active"><?php _e('Shipping', 'commercekit') ?></li>
									<li><?php _e('Confirm', 'commercekit') ?></li>
									<li><?php _e('Receipt', 'commercekit') ?></li>

								</ul>


								<div class="checkout-content align-center">

									<?php _e('Choose the shipping method', 'commercekit') ?>

									<br />
									<br />

									<div class="shipping-methods">
										<ul></ul>
									</div>
								</div>

							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="modal-footer">
				<div class="">
					<div class="">
						<div class="btn-group">
							<button class="btn float-left" id="js__back-to-address">
								<?php _e('Back', 'commercekit') ?>
							</button>
							<button class="btn float-right" id="js__proceed-to-confirm">
								<?php _e('Next', 'commercekit') ?>
							</button>
						</div>
					</div>
				</div>
			</div>

		</div>





		<div class="modal-content clearfix hidden " id="modal-checkout-confirm">

			<div class="modal-header">
				<h3 class="modal-title"><?php _e('Checkout', 'commercekit') ?></h3>
			</div>

			<div class="modal-body">
				<div>
					<div class="clearfix">
						<div>
							<div>
								<ul class="checkout-navigation">

									<li><?php _e('Country', 'commercekit') ?></li>
									<li><?php _e('Address', 'commercekit') ?></li>
									<li><?php _e('Shipping', 'commercekit') ?></li>
									<li class="active"><?php _e('Confirm', 'commercekit') ?></li>
									<li><?php _e('Receipt', 'commercekit') ?></li>

								</ul>


								<div class="checkout-content align-center">

									<?php _e('You are purchasing', 'commercekit') ?>

									<br />
									<br />

									<table class="products">
										<thead>
											<tr>
												<th><?php _e('Product', 'commercekit') ?></th>
												<th><?php _e('Quantity', 'commercekit') ?></th>
												<th><?php _e('Amount', 'commercekit') ?></th>
											</tr>
										</thead>
										<tbody>

										</tbody>


										<tfoot>


											<?php $options = get_option( 'commercekit_options' ); ?>

											<?php if ( !$options[ 'taxes_included_in_products_prices' ] ) : ?>
												<tr class="cart-taxes-cost">
													<td><?php _e('Taxes', 'commercekit') ?></td>
													<td></td>
													<td class="cart-taxes-cost-content"></td>
												</tr>
											<?php endif ?>

											<tr class="cart-shipping-cost">
												<td><?php _e('Shipping', 'commercekit') ?></td>
												<td></td>
												<td class="cart-shipping-cost-content"></td>
											</tr>
											<tr class="cart-total-cost">
												<td><?php _e('Total', 'commercekit') ?></td>
												<td></td>
												<td class="cart-total-cost-content"></td>
											</tr>
										</tfoot>
									</table>

								</div>

							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="modal-footer">
				<div class="">
					<div class="">
						<div class="btn-group">
							<button class="btn float-left" id="js__back-to-shipping">
								<?php _e('Back', 'commercekit') ?>
							</button>
							<p id="js__wait_message" class="css__wait_message hidden"><?php _e('Please wait..', 'commercekit') ?></p>
							<button class="btn float-right" id="js__proceed-to-payment">
								<?php _e('Proceed to payment', 'commercekit') ?>
							</button>
						</div>
					</div>
				</div>
			</div>

		</div>




		<div class="modal-content clearfix hidden" id="modal-checkout-receipt">

			<div class="modal-header">
				<h3 class="modal-title"><?php _e('Checkout', 'commercekit') ?></h3>
			</div>

			<div class="modal-body">
				<div>
					<div class="clearfix">
						<div>
							<div>
								<ul class="checkout-navigation">

									<li><?php _e('Country', 'commercekit') ?></li>
									<li><?php _e('Address', 'commercekit') ?></li>
									<li><?php _e('Shipping', 'commercekit') ?></li>
									<li><?php _e('Confirm', 'commercekit') ?></li>
									<li class="active"><?php _e('Receipt', 'commercekit') ?></li>

								</ul>


								<div class="checkout-content align-center">

									<?php _e('You purchased', 'commercekit') ?>

									<br />
									<br />

									<table class="products">
										<thead>
											<tr>
												<th><?php _e('Product', 'commercekit') ?></th>
												<th><?php _e('Quantity', 'commercekit') ?></th>
												<th><?php _e('Amount', 'commercekit') ?></th>
											</tr>
										</thead>
										<tbody>

										</tbody>


										<tfoot>
											<tr class="cart-taxes-cost hidden">
												<td><?php _e('Taxes', 'commercekit') ?></td>
												<td></td>
												<td class="cart-taxes-cost-content"></td>
											</tr>
											<tr class="cart-shipping-cost">
												<td><?php _e('Shipping', 'commercekit') ?></td>
												<td></td>
												<td class="cart-shipping-cost-content"></td>
											</tr>
											<tr class="cart-total-cost">
												<td><?php _e('Total', 'commercekit') ?></td>
												<td></td>
												<td class="cart-total-cost-content"></td>
											</tr>
										</tfoot>
									</table>

								</div>

							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="modal-footer">
				<div class="">
					<div class="">
						<div class="btn-group">
							<button class="btn float-right" id="js__back-to-site">
								<?php _e('Back to the site', 'commercekit') ?>
							</button>
						</div>
					</div>
				</div>
			</div>

		</div>
	</div>
</div>
