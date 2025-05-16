document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.navbar-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            toggle.classList.toggle('active');
        });
    }

    // Scroll animation for text and image containers
    const animatedEls = document.querySelectorAll('.animate-on-scroll');
    const observer = new window.IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });
    animatedEls.forEach(el => observer.observe(el));
});