import Swiper from 'swiper/bundle';


if ($('#gallery').length > 0) {
    $('#gallery').on('show.bs.modal', event => {
        var swiper
        swiper = new Swiper(".gallery-slider", {
            slidesPerView: 1,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
        });
    })
}

