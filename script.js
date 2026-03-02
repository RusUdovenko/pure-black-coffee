document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('typewriterOverlay');
    const header = document.getElementById('mainHeader');
    
    header.style.display = 'block';
    
    setTimeout(function() {
        overlay.classList.add('fade-out');
        
        setTimeout(function() {
            overlay.style.display = 'none';
        }, 1000);
    }, 3500);
});

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.aboutSwiper')) {
        new Swiper('.aboutSwiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            effect: 'slide',
            speed: 600,
        });
    }
});

document.querySelectorAll('a[href^="#"]:not([href="#"]):not([href^="#popup"])').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerOffset = 70;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    });
});

window.addEventListener('scroll', function() {
    const header = document.getElementById('mainHeader');
    if (window.scrollY > 10) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href').substring(1);
        if (href === currentSection) {
            link.classList.add('active');
        }
    });
});

function initPopups() {
    const popups = {
        classic: document.getElementById('popup-classic'),
        author: document.getElementById('popup-author'),
        culinary: document.getElementById('popup-culinary')
    };
    
    const closeButtons = document.querySelectorAll('.popup-close');

    Object.keys(popups).forEach(key => {
        document.querySelectorAll(`a[href="#popup:${key}"]`).forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                if (popups[key]) {
                    popups[key].style.display = 'block';
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    });

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            Object.values(popups).forEach(popup => {
                if (popup) popup.style.display = 'none';
            });
            document.body.style.overflow = 'auto';
        });
    });

    window.addEventListener('click', (e) => {
        Object.values(popups).forEach(popup => {
            if (popup && e.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
}

setTimeout(function() {
    initPopups();
}, 3500);