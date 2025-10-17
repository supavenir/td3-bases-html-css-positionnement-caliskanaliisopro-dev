// Animations professionnelles
document.addEventListener('DOMContentLoaded', function() {
    // Animation des compteurs
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const current = Math.floor(progress * (end - start) + start);
            element.textContent = current + (element.dataset.suffix || '');
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animation au scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                if (el.classList.contains('stat-number')) {
                    const value = parseInt(el.textContent);
                    animateValue(el, 0, value, 2000);
                }
                el.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.1,
        root: null
    });

    // Observer les éléments animés
    document.querySelectorAll('[data-animate], .stat-number').forEach(el => {
        observer.observe(el);
    });

    // Effet de parallaxe léger
    window.addEventListener('scroll', () => {
        const parallaxElements = document.querySelectorAll('.pattern-dots, .pattern-grid');
        parallaxElements.forEach(el => {
            const speed = 0.5;
            const rect = el.getBoundingClientRect();
            const visible = rect.top < window.innerHeight && rect.bottom > 0;
            if (visible) {
                const yPos = -(window.scrollY * speed);
                el.style.transform = `translateY(${yPos}px)`;
            }
        });
    });

    // Smooth scroll pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});