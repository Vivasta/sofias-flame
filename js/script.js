console.log('✅ script.js — загружен');

document.addEventListener('DOMContentLoaded', () => {
    console.log('✅ DOM загружен');

    // =============== 1. Слайдер ===============
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    if (slides.length === 0) {
        console.warn('❌ Слайды не найдены. Проверь class="slide"');
        return;
    }

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Автопрокрутка
    let autoSlide = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }, 5000);

    // Показать первый слайд
    showSlide(currentSlide);

    // Клик по точкам
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            clearInterval(autoSlide);
            const slideIndex = parseInt(dot.getAttribute('data-slide'));
            currentSlide = slideIndex;
            showSlide(slideIndex);
            // Возобновить автопрокрутку
            autoSlide = setInterval(() => {
                currentSlide = (currentSlide + 1) % slides.length;
                showSlide(currentSlide);
            }, 5000);
        });
    });

    // =============== 2. Анимация при прокрутке ===============
    const animatedElements = document.querySelectorAll('.animate');

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                } else {
                    entry.target.classList.remove('show');
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        }
    );

    animatedElements.forEach(el => observer.observe(el));

    // =============== 3. Скролл хедера ===============
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // =============== 4. Бургер-меню ===============
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('menu');

    if (burger && mobileMenu) {
        burger.addEventListener('click', () => {
            const isOpen = burger.classList.toggle('active');
            mobileMenu.classList.toggle('open');

            // Блокировка скролла
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    } else {
        console.warn('Бургер или меню не найдены — проверь id="burger" и id="menu"');
    }

    console.log('✅ script.js — полностью загружен и работает');
});
