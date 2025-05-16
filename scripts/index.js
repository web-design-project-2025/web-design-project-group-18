document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.querySelector('.navbar-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', function () {
            navLinks.classList.toggle('open');
            toggle.classList.toggle('active');
        });
    }
});