//select headers
const selectHeader = document.querySelector('.select__header');
const selectBody = document.querySelector('.select__body');
const selectItem = document.querySelectorAll('.select__item');
const selectSpan = document.querySelector('.select__title');
const selectImg = document.querySelector('.select__header img');

selectHeader.addEventListener('click', () => {
    if (selectBody.classList.contains('select__body--active')) {
        selectBody.classList.remove('select__body--active');
        selectImg.style.transform = 'rotate(0deg)';
        selectBody.style.maxHeight = null;
    } else {
        selectBody.classList.add('select__body--active');
        selectImg.style.transform = 'rotate(180deg)';
        selectBody.style.maxHeight = selectBody.scrollHeight + 'px';
    }
});

selectItem.forEach((item, i) => {
    item.addEventListener('click', () => {
        selectSpan.textContent = item.textContent;
        selectBody.classList.remove('select__body--active');
        selectImg.style.transform = 'rotate(0deg)';
        selectBody.style.maxHeight = null;
    });
});

//maps
let center = [53.195866938259144, 45.01781295758056];

function init() {
    let map = new ymaps.Map('map-element', {
        center: center,
        zoom: 17
    });

    let playsmark = new ymaps.Placemark(center, {}, {
        iconLayout: 'default#image',
        iconImageHref: '../img/maps/mark-cart.svg',
        iconImageSize: [70, 80],
        iconImageOffset: [-20, -100]
    });

    map.controls.remove('geolocationControl'); // удаляем геолокацию
    map.controls.remove('searchControl'); // удаляем поиск
    map.controls.remove('trafficControl'); // удаляем контроль трафика
    map.controls.remove('typeSelector'); // удаляем тип
    map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
    map.controls.remove('zoomControl'); // удаляем контрол зуммирования
    map.controls.remove('rulerControl'); // удаляем контрол правил
    map.behaviors.disable(['scrollZoom']); // отключаем скролл карты

    map.geoObjects.add(playsmark);
}

ymaps.ready(init);

// mobile menu
const headerMobile = document.querySelector('.header__mobile'),
    burger = document.querySelector('.header__burger'),
    cross = document.querySelector('.header__cross'),
    body = document.querySelector('body');

burger.addEventListener('click', () => {
    headerMobile.classList.toggle('active');
    burger.style.display = 'none';
    cross.style.display = 'block';
    body.classList.add('noscroll');
}); 

cross.addEventListener('click', () => {
    headerMobile.classList.toggle('active');
    burger.style.display = 'block';
    cross.style.display = 'none';
    body.classList.remove('noscroll');
}); 

// modal
const modal = document.querySelector('.modal'),
    modalButtons = document.querySelectorAll('.button__modal');
    
modalButtons.forEach((item) => {
    item.addEventListener('click', () => {
        modal.classList.add('active');
        body.classList.add('noscroll');
    });
});

modal.addEventListener('click', (e) => {
    const isModal = e.target.closest('.modal__inner');

    if (!isModal) {
        modal.classList.remove('active');
        body.classList.add('noscroll');
    }
});

// slider
const swiper = new Swiper('.slider', {
    loop: true,
    pagination: {
      el: '.slider__pagination',
    },
    navigation: {
      nextEl: '.slider__arrow-right',
      prevEl: '.slider__arrow-left',
    },
  });

//   iform send
const form = document.querySelector('.form__elements');

const sendForm = (data) => {
    return fetch('mail.php', {
        method: 'POST', 
        body:   JSON.stringify(data),
        header: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(res => res.json());
};

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const dataForm = new FormData(form);
    const user = {}; 

    dataForm.forEach((val, key) => {
        user[key] = val;
    });

    sentForm(user).then(data => {
        console.log("Письмо успешно ушло!");
    });

    form.reset();

});