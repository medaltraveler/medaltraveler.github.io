var i, _swiper, _swipers = document.querySelectorAll('[data-slider]');
window.swipers = [];

// Load sliders
for (i = 0; i < _swipers.length; i++) {
    _swiper = _swipers[i].dataset.slider;
    window.swipers[_swiper] = new Swiper(`[data-slider="${_swiper}"]`, {
        loop: true,
        speed: 400,
        navigation: {
            nextEl: `[data-slider-next="${_swiper}"]`,
            prevEl: `[data-slider-prev="${_swiper}"]`,
        },
        pagination: {
            el: `[data-slider-pagination="${_swiper}"]`,
            clickable: true
        }
    });
}
