function loadSliders() {
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
}

// Used by recaptcha
function onSuccessfulCaptchaSubmit(token) {
    document.getElementById('#form').submit();
}

function handleSubscriptionForm(selector) {
    var _form = document.querySelector(selector);

    if (_form === null) {
        return;
    }

    _form.addEventListener('submit', function (e) {
        e.preventDefault();

        try {
            e.target.querySelector('[type="submit"]').disabled = true;
            var _data = new FormData(e.target);

            window.axios.post('https://eo4sh9r6qfajbb2.m.pipedream.net', {
                'email': _data.get('email'),
            }).then(function (response) {
                console.info({response});
                window.location = e.target.dataset.success;
            }).catch(function (error) {
                console.error({error});
                e.target.querySelector('[type="submit"]').disabled = false;
            });
        } catch (error) {
            console.error({error});
            e.target.querySelector('[type="submit"]').disabled = false;
        }
    })
}

document.addEventListener('DOMContentLoaded', function () {
    handleSubscriptionForm('#form');
    loadSliders();
});
