'use strict'

//MENU HAMBURGUESA PARA MOBILE
let desplegar = document.querySelector('.desplegar');
let cerrar = document.querySelector('.cerrar');
let menu = document.querySelector('.navegacion__lista');

cerrar.style.display = 'none'

desplegar.addEventListener('click', () => {
    console.log('Haz dado click');
    menu.style.display = 'block';
    desplegar.style.display = 'none';
    cerrar.style.display = 'block'
});

cerrar.addEventListener('click', () => {
    menu.style.display = 'none';
    desplegar.style.display = 'block';
    cerrar.style.display = 'none';
});

// PORCENTAJE SCROLL
let percent = document.querySelector('.percent');
let scrollPercent = 0;

window.addEventListener('scroll',() => {
    //Calcular el porcentaje que el usuario ha scrolleado y mostrarlo
    let scrollTop = document.documentElement['scrollTop'] || document.body['scrollTop'];
    let scrollBottom = (document.documentElement['scrollHeight'] || document.body['scrollHeight']) - document.documentElement.clientHeight;
    scrollPercent = parseFloat((scrollTop / scrollBottom * 100).toFixed(0));

    percent.innerHTML = `${scrollPercent}%`;
});

// BOTON RETURN TO THE TOP
let returnTop = document.querySelector('.btn__return');


returnTop.addEventListener('click', () => {
    setTimeout(function() {
        window.scrollTo(0, 0)
    }, 200);
});

// VALIDAR FORMULARIO, RECOGER DATOS Y ENVIAR
let name = document.querySelector('#name');
let email = document.querySelector('#email');
let check = document.querySelector('#check');
let form = document.querySelector('#form');
let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

form.addEventListener('submit', (e) => {
    let contact = {
        name,
        email,
    }

    if(name.value.length < 2 || name.value.length > 100 && !isNaN(name.value)) {
        e.preventDefault();
        name.style.border = '1px solid red';
    } else {
        contact.name = name.value;

        if(!email.value.match(regex)) {
            e.preventDefault();
            email.style.border = '1px solid red';
        } else {
            contact.email = email.value;

            if (!check.checked) {
                e.preventDefault();
                document.querySelector('.checkbox__container').style.border = '1px solid red';
            } else {
                fetch('https://jsonplaceholder.typicode.com/posts/1', {
                    method: 'PUT',
                    body: JSON.stringify({
                        name: contact.name,
                        email: contact.email
                    }),
                    headers: {
                        'Content-type': 'application/json; charset=UTF-8',
                    },
                    })
                    .then((response) => response.json())
                    .then((json) => console.log(json));

                    form.reset();
            }

        }
    }
});

// VALIDAR POPUP, RECOGER DATOS Y ENVIAR
let emailPopup = document.querySelector('.popup__input');
let formPopup = document.querySelector('.form__popup');

formPopup.addEventListener('submit', (e) => {
    let contactPopup;

    if(!emailPopup.value.match(regex)) {
        e.preventDefault();
        emailPopup.style.border = '2px solid red';
    } else {
        contactPopup = emailPopup.value;

        fetch('https://jsonplaceholder.typicode.com/posts/1', {
            method: 'PUT',
            body: JSON.stringify({
                email: contactPopup
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            })
            .then((response) => response.json())
            .then((json) => console.log(json));
    
            formPopup.reset();
    }
});

// SLIDER DE IMAGENES
class Slider {
    constructor(sliderSelector) {
        this.slider = document.querySelector(sliderSelector);
        this.slidesImg = document.querySelectorAll('.slider__container img')
        this.sliderContainer = document.querySelector('.slider__container');
        this.nextBtn = document.querySelector('.next');
        this.prevBtn = document.querySelector('.prev');
        this.slideSize = this.slider.offsetWidth;
        this.countSlide = 0;

        this.setEventListeners();
        this.generateDots();
    };

    setEventListeners(){
        this.nextBtn.addEventListener('click', () => {
            if(this.countSlide != this.slidesImg.length - 1){
                this.countSlide = this.countSlide >= this.slidesImg -1 ? 0 : this.countSlide + 1;
                this.sliderContainer.style.transform = `translateX(-${this.countSlide * this.slideSize}px)`;
            };
        });
    
        this.prevBtn.addEventListener('click', () => {
            
            if(this.countSlide != 0){
                this.countSlide = this.countSlide <= 0 ? this.slidesImg - 1 : this.countSlide - 1;
                this.sliderContainer.style.transform = `translateX(-${this.countSlide * this.slideSize}px)`;
            };
        });
    };

    generateDots() {
        const dots = document.createElement('div');
        dots.classList.add('dots');

        for(let i = 0; i < this.slidesImg.length; i++) {

            const dot = document.createElement('span');

            dot.addEventListener('click', () => {
                this.countSlide = i;
                this.sliderContainer.style.transform = `translateX(-${this.countSlide * this.slideSize}px)`;
            });

            dot.classList.add('dot');
            dots.appendChild(dot);
        };

        this.slider.appendChild(dots);
        this.dots = dots;
    };
};

new Slider('#slider');

// CONVERTIDOR DE MONEDA
let amounts = document.querySelectorAll('.prices__text p');
let input = document.querySelector('.coin__select');
let prof = document.querySelector('.result_prof');
let prem = document.querySelector('.result_prem');
let selectInput = 'eur';
let prices = new Array();

for(let i = 0; i < amounts.length; i++){
    let price = amounts[i].outerText.replace('$', '');

    if(price != 0 && price > 0){
        prices.push(price);
    }

    prof.innerHTML = `$ ${prices[0]}`;
    prem.innerHTML = `$ ${prices[1]}`;
}

input.addEventListener('change', () => {
    selectInput = input.options[input.selectedIndex].value;

    fetch('https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json')
    .then(response => {
        if(response.ok){
            return response.json()
        }
    })
    .then(data => {
        let gbp = data.eur.gbp;
        let usd = data.eur.usd;

        if (selectInput === 'gbp') {
            let gbpProf = prices[0] / gbp;
            let gbpPrem = prices[1] / gbp;

            prof.innerHTML = `£ ${gbpProf.toFixed(2)}`;
            prem.innerHTML = `£ ${gbpPrem.toFixed(2)}`;
        } else if (selectInput ==='usd') {
            let usdProf = prices[0] / usd;
            let usdPrem = prices[1] / usd;

            prof.innerHTML = `USD ${usdProf.toFixed(2)}`;
            prem.innerHTML = `USD ${usdPrem.toFixed(2)}`;
        } else if (selectInput ==='eur') {
            prof.innerHTML = `$ ${prices[0]}`;
            prem.innerHTML = `$ ${prices[1]}`;
        }

    })
    .catch((error) => console.log(error));
});

// POPUP "SUBSCRIBE TO OUR NEWSLETTER"
let popup = document.querySelector('.popup');
let cerrarPopup = document.querySelector('.popup__icon');

if (typeof(Storage) !== "undefined") {
    sessionStorage.setItem('popup', 'block')
} else {
    console.log('Error LocalStoge');
}
setTimeout(function() {
    popup.style.display = sessionStorage.getItem('popup');
}, 5000)

window.addEventListener('scroll',() => {

    if(scrollPercent > 25) {
        popup.style.display = sessionStorage.getItem('popup');
        console.log('scroooolllll');
    } 
})

document.querySelector('main').addEventListener('click', () => {
    popup.style.display = 'none';
    sessionStorage.removeItem('popup');
})

cerrarPopup.addEventListener('click', () => {
    popup.style.display = 'none';
    sessionStorage.removeItem('popup');
})

document.addEventListener('keydown', function(event) {
    if(event.key == 'Escape') {
        popup.style.display = 'none';
        sessionStorage.removeItem('popup');
    }
});
