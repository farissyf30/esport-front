import $ from 'jquery';
// window.$ = $;
window.$ = window.jQuery = $;
// window.jQuery = jQuery;
// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

// Import our custom CSS
import '../scss/styles.scss'
// import '~bracket/dist/jquery.bracket.min.js';

import './header';
import './tournament-detail';
import './profile';
import './bracket';
// import './bracket-data';


$('.filter-btn').click(function (e) {
    e.preventDefault();
    $('.order-nav').addClass('show');
    $('body').append('<div class="overlay"></div>');
})

$(document).on('click', '.filter-close', function (e) {
    e.preventDefault();
    $('.order-nav').removeClass('show');
    $('.overlay').remove();
})

$(document).on('click', '.overlay', function (e) {
    e.preventDefault();
    $('.order-nav').removeClass('show');
    $(this).remove();
})


