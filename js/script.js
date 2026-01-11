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

    // =============== 4. Бургер-меню с крестиком ===============
    const burger = document.getElementById('burger');
    const mobileMenu = document.getElementById('menu');
    const closeMenu = document.getElementById('closeMenu');

    if (burger && mobileMenu) {
        // Открыть меню
        burger.addEventListener('click', () => {
            mobileMenu.classList.add('open');
            burger.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Закрыть по крестику
        if (closeMenu) {
            closeMenu.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            });
        }

        // Закрыть по клику на ссылку
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.remove('open');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Закрыть по клику на фон (вне пунктов меню)
        mobileMenu.addEventListener('click', (e) => {
            if (e.target === mobileMenu) {
                mobileMenu.classList.remove('open');
                burger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.warn('Бургер или меню не найдены — проверь id="burger" и id="menu"');
    }

    // =============== 5. Перевод на языки ===============
    const langToggle = document.getElementById('lang-toggle');
    const langDropdown = document.getElementById('lang-dropdown');
    const langButtons = document.querySelectorAll('#lang-dropdown button');

    // Проверим, найдены ли элементы
    if (!langToggle || !langDropdown) {
        console.error('❌ Элементы выбора языка не найдены. Проверь id="lang-toggle" и id="lang-dropdown"');
        return;
    }

    // Установка языка
    function setLanguage(lang) {
        document.querySelectorAll('.trans').forEach(el => {
            const translation = el.getAttribute(`data-${lang}`);
            if (translation) {
                el.textContent = translation;
            }
        });

        // Обновляем флаг на кнопке
        const flag = { ru: '🇷🇺', en: '🇬🇧', gr: '🇬🇷' }[lang] || '🇷🇺';
        langToggle.innerHTML = flag;

        // Сохраняем язык
        localStorage.setItem('language', lang);
        // Закрываем дропдаун
        langDropdown.classList.remove('active');
    }

    // Открыть/закрыть дропдаун
    langToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        langDropdown.classList.toggle('active');
    });

    // Закрыть при клике вне
    document.addEventListener('click', (e) => {
        if (!langToggle.contains(e.target) && !langDropdown.contains(e.target)) {
            langDropdown.classList.remove('active');
        }
    });

    // Обработка клика по кнопке языка
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            console.log('Выбран язык:', lang);
            setLanguage(lang);
        });
    });

    // Восстановить язык при загрузке
    const savedLang = localStorage.getItem('language') || 'ru';
    setLanguage(savedLang);

    console.log('✅ Перевод, меню, слайдер — всё работает');
});
