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
                clickable: false
            }
        });
    }
}

function handleSubscriptionForm(_form) {
    _form.addEventListener('submit', function (e) {
        e.preventDefault();

        try {
            e.target.querySelector('[type="submit"]').disabled = true;
            var _data = new FormData(e.target);

            window.grecaptcha.ready(function () {
                window.grecaptcha.execute('6LcflDYjAAAAAGu_5ltutzqa-T-WTeaWPD9M5LQ3', { action: 'submit' })
                    .then(function (token) {
                        window.axios.post('https://eo4sh9r6qfajbb2.m.pipedream.net', {
                            'email': _data.get('email'),
                            'token': token,
                            'href': window.location.href,
                        }).then(function (response) {
                            console.info({ response });
                            window.location = e.target.dataset.success;
                        }).catch(function (error) {
                            console.error({ error });
                            e.target.querySelector('[type="submit"]').disabled = false;
                        });
                    }).catch(function (error) {
                        console.error({ error });
                        e.target.querySelector('[type="submit"]').disabled = false;
                    });
            });
        } catch (error) {
            console.error({ error });
            e.target.querySelector('[type="submit"]').disabled = false;
        }
    })
}

function loadSubscriptionForms() {
    var i = 0, _forms = document.querySelectorAll('[data-form]');

    for (i; i < _forms.length; i++) {
        handleSubscriptionForm(_forms[i]);
    }
}

function listenOpenModalEvents() {
    $('[data-modal]').on('shown.bs.modal', function () {
        $(this).find('input[type="email"]').first().focus();
        console.log($(this).attr('id'))
    })

    $('[data-modal]').on('hidden.bs.modal', function () {
        console.log($(this).attr('id'))
    })
}

document.addEventListener('DOMContentLoaded', function () {
    loadSliders();
    loadSubscriptionForms();
    listenOpenModalEvents();
});
