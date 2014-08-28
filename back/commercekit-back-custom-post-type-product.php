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
/* Add support for the featured image
/***********************************************************/


/***********************************************************/
/* Show our Custom Post Type fields
/***********************************************************/


    add_action("admin_init", "commercekit_product_add_custom_fields");

    function commercekit_product_add_custom_fields(){
        add_meta_box(
            "product-meta",
            __('Product Options', 'commercekit'),
            "commercekit_product_form_display_custom_fields",
            "ck_product",
            "normal",
            "high"
        );
    }

    function commercekit_product_form_display_custom_fields() {
        global $post;
        if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) return $post_id;

        $custom = get_post_custom($post->ID);
        $price = @$custom["price"][0];

        wp_enqueue_script( 'commercekit-js-product-form', plugins_url( 'assets/commercekit-product-form.js', __FILE__ ) );

        ?>

        <style type="text/css">
            <?php include('assets/commercekit-product-form.css'); ?>
        </style>

        <?php
        $options = get_option( 'commercekit_options' );
        $currency_symbol = $options[ 'currency_symbol' ];
        $currency_position = $options[ 'currency_position' ];
        ?>

        <div class="commercekit-product-custom-fields">
            <div><label><?php _e('Price', 'commercekit') ?>:</label>

            <?php if ($currency_position == 'before') : ?>
                <?php echo $currency_symbol ?> <input name="price" value="<?php echo $price; ?>" /></div>
            <?php else : ?>
                <input name="price" value="<?php echo $price; ?>" /> <?php echo $currency_symbol ?></div>
            <?php endif ?>

        </div>



        <?php
    }


/***********************************************************/
/* Manage saving the Custom Post Type data
/***********************************************************/


    add_action('save_post', 'commercekit_product_form_save_custom_fields');

    function commercekit_product_form_save_custom_fields(){
        global $post;

        if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) {
            return $post_id;
        } else {
            update_post_meta(@$post->ID, "price", @$_POST["price"]);
        }
    }


/***********************************************************/
/* Customize the backend products list table columns by adding custom data
/***********************************************************/


    add_filter("manage_edit-ck_product_columns", "commercekit_products_list_custom_columns_names");

    function commercekit_products_list_custom_columns_names($columns){
        $columns = array(
            "cb" => "<input type=\"checkbox\" />",
            "title" => __('Product name', 'commercekit'),
            "description" => __('Description', 'commercekit'),
            "price" => __('Price', 'commercekit'),
            "cat" => __('Category', 'commercekit'),
        );

        return $columns;
    }


    add_action("manage_ck_product_posts_custom_column",  "commercekit_products_list_custom_columns_content");

    function commercekit_products_list_custom_columns_content($column){
        global $post;
        $custom = get_post_custom();
        switch ($column)
        {
            case "description":

                the_excerpt();
                break;

            case "price":

                $options = get_option( 'commercekit_options' );
                $currency_position = $options[ 'currency_position' ];
                $currency_symbol = $options[ 'currency_symbol' ];

                if ($currency_position == 'before') {
                    echo $currency_symbol . ' ' . @$custom[ 'price' ][0];
                } else {
                    echo @$custom[ 'price' ][0] . ' ' . $currency_symbol;
                }

            	break;

            case "cat":

                echo get_the_term_list( $post->ID, 'ck_product_category', '', ', ', '' );
                break;

        }
    }


/***********************************************************/
/*
/***********************************************************/


?>