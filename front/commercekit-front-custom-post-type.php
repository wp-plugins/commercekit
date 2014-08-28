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

/****************************************************
 * Handle the permalink
 ****************************************************/


    add_action('init', 'commercekit_handle_the_permalink_rewrite');

    function commercekit_handle_the_permalink_rewrite() {
        global $wp_rewrite;
        $wp_rewrite->add_permastruct('typename', 'typename/%year%/%postname%/', true, 1);
        add_rewrite_rule('typename/([0-9]{4})/(.+)/?$', 'index.php?typename=$matches[2]', 'top');
        $wp_rewrite->flush_rules(); // !!!
    }


/****************************************************
 * Handle the permalink
 ****************************************************/


    add_filter( 'template_include', 'commercekit_get_the_products_archive_template' );

    function commercekit_get_the_products_archive_template( $template ) {
        //error_log(is_post_type_archive('ck_product')); //1
        //error_log(get_post_type(423)); //products

        if (get_post_type() == 'ck_product') {

            if (is_single()) {
                $template_name = 'single-product.php';
            } elseif (is_archive()) {
                $template_name = 'archive-products.php';
            }

            $theme_files = array('', 'commercekit/' . $template_name);
            $exists_in_theme = locate_template($theme_files, false);
            if ( $exists_in_theme != '' ) {
              return $exists_in_theme;
            } else {
              return plugin_dir_path(__FILE__) . 'templates/' . $template_name;
            }

        }

        return $template;
    }


?>