document.addEventListener('DOMContentLoaded', () => {
    const newsDetail = JSON.parse(localStorage.getItem('newsDetail'));

    if (newsDetail) {
        const detailContainer = document.querySelector('#news-detail .detail-container');
        detailContainer.querySelector('.detail-thumbnail').src = newsDetail.thumbnail;
        detailContainer.querySelector('.detail-thumbnail').alt = newsDetail.title;
        detailContainer.querySelector('.detail-title').textContent = newsDetail.title;
        detailContainer.querySelector('.detail-category').textContent = newsDetail.category;
        detailContainer.querySelector('.detail-date').textContent = newsDetail.date;
        detailContainer.querySelector('.detail-content').innerHTML  = newsDetail.content;

        // Remove click event listeners from the detail page
        const detailThumbnail = detailContainer.querySelector('.detail-thumbnail');
        detailThumbnail.style.pointerEvents = 'none';
    } else {
        document.querySelector('#news-detail').innerHTML = '<p>News detail not found.</p>';
    }
});

// Wait for container animation, then show content
window.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.detail-container');
  if (container) {
    container.addEventListener('animationend', function handler() {
      container.classList.add('show-content');
      container.removeEventListener('animationend', handler);
    });
  }

  // Existing scroll animation for detail-content
  const animatedEls = document.querySelectorAll('.detail-content h1, .detail-content h2, .detail-content h3, .detail-content p, .detail-content li');
  animatedEls.forEach(el => {
    el.classList.add('animate-on-scroll');
  });

  function revealOnScroll() {
    animatedEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        el.classList.add('visible');
      }
    });
  }

  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll(); // Initial check
});