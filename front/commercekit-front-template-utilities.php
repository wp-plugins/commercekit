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

if ( !function_exists( 'commercekit_output_content_wrapper' ) ) {
    function commercekit_output_content_wrapper() {
        commercekit_get_template( 'global/wrapper-start.php' );
    }
}

if ( !function_exists( 'commercekit_output_content_wrapper_end' ) ) {
    function commercekit_output_content_wrapper_end() {
        commercekit_get_template( 'global/wrapper-end.php' );
    }
}

function commercekit_get_template( $template_name ) {
    $located = commercekit_locate_template( $template_name );
    include $located;
}

function commercekit_locate_template( $template_name ) {
    $default_path = commercekit_plugin_path() . '/templates/';

    // Look within passed path within the theme - this is priority
    $template = locate_template(
        array(
            trailingslashit( 'commercekit' ) . $template_name,
            $template_name
        )
    );

    // Get default template
    if ( !$template ) {
        $template = $default_path . $template_name;
    }

    return $template;
}

function commercekit_plugin_path() {
    return untrailingslashit( plugin_dir_path( __FILE__ ) );
}

function commercekit_template_partial_product_price() {
    commercekit_get_template( 'partials/price.php' );
}

function commercekit_get_sidebar() {
    commercekit_get_template( 'global/sidebar.php' );
}

function commercekit_template_partial_product_thumbnail() {
    echo commercekit_get_product_thumbnail();
}

function commercekit_template_partial_product_title_archive() {
    commercekit_get_template( 'partials/title-archive.php' );
}


function commercekit_template_partial_product_title_single() {
    commercekit_get_template( 'partials/title-single.php' );
}


function commercekit_placeholder_img() {
    echo '<img src="' . plugins_url( 'assets/commercekit-placeholder.png', __FILE__ ) . '" class="attachment-storefront wp-post-image" />';
}

function commercekit_get_product_thumbnail( $size = 'thumbnail', $placeholder_width = 0, $placeholder_height = 0  ) {
    global $post;

    if ( has_post_thumbnail() )
        return get_the_post_thumbnail( $post->ID, $size );
    elseif ( commercekit_placeholder_img() )
        return commercekit_placeholder_img();
}
