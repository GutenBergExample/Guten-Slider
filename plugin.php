<?php
/**
 * Plugin Name: Guten Slider
 * Plugin URI: https://github.com/ahmadawais/create-guten-block/
 * Description: A simple Gutenberg implemntation of a slideshow based on glide.js
 * Author: rhysclay (gubbi gubbi)
 * Author URI: https://breezydesigns.com.au
 * Version: 1.0.0
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
