
$(window).scroll(function () {
    var sticky = $('.header'),
        scroll = $(window).scrollTop();

    if (scroll >= 30) sticky.addClass('scroller');
    else sticky.removeClass('scroller');
});
