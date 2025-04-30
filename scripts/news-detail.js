document.addEventListener('DOMContentLoaded', () => {
    const newsDetail = JSON.parse(localStorage.getItem('newsDetail'));

    if (newsDetail) {
        const detailContainer = document.querySelector('#news-detail .detail-container');
        detailContainer.querySelector('.detail-thumbnail').src = newsDetail.thumbnail;
        detailContainer.querySelector('.detail-thumbnail').alt = newsDetail.title;
        detailContainer.querySelector('.detail-title').textContent = newsDetail.title;
        detailContainer.querySelector('.detail-category').textContent = newsDetail.category;
        detailContainer.querySelector('.detail-date').textContent = newsDetail.date;
        detailContainer.querySelector('.detail-content').textContent = newsDetail.content;
    } else {
        document.querySelector('#news-detail').innerHTML = '<p>News detail not found.</p>';
    }
});