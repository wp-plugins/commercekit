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

if (!defined('ABSPATH')) exit; // Exit if accessed directly

$template = get_option('template');

$link = '<a href="' . get_the_permalink() . '">' . get_the_title() . '</a>';

switch( $template ) {

    case 'editor' :
        echo '<header class="entry-header"><h1 class="entry-title">' . $link . '</h1></header>';
        break;

    case 'isola' :
        echo '<header class="entry-header"><h1 class="entry-title">' . $link . '</h1></header>';
        break;

    case 'padhang' :
        echo '<header class="entry-header"><h2 class="entry-title">' . $link . '</h2></header>';
        break;

    case 'ravel' :
        echo '<header class="entry-header"><h2 class="entry-title" itemprop="headline">' . $link . '</h2></header>';
        break;

    case 'twentyeleven' :
        echo '<h1 class="entry-title">' . $link . '</h1>';
        break;

    case 'twentytwelve' :
        echo '<header class="entry-header"><h1 class="entry-title">' . $link . '</h1></header>';
        break;

    case 'twentythirteen' :
        echo '<h1 class="entry-title">' . $link . '</h1>';
        break;

    case 'twentyfourteen' :
        echo '<h3>' . $link . '</h3>';
        break;

    default :
        echo '<header class="entry-header"><h1 class="entry-title">' . $link . '</h1></header>';
        break;

}