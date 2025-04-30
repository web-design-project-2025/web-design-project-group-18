document.addEventListener('DOMContentLoaded', () => {
    const cardGrid = document.getElementById('card-grid');
    const cardTemplate = cardGrid.querySelector('.card'); // Get the existing card template
    const showMoreButton = document.getElementById('show-more'); 
    const cardsToReveal = 6;
    let currentIndex = 0;
    let newsData = [];


    async function fetchNews() {
        try {
            const response = await fetch('data/news.json');
            newsData = await response.json();
        } 
        catch (error) {
            console.error('Error loading news:', error);
        }
    }

    function createCard(newsItem) {
        const card = cardTemplate.cloneNode(true); // Clone the existing card template
        card.querySelector('.news-thumbnail').src = newsItem.thumbnail;
        card.querySelector('.news-thumbnail').alt = newsItem.title;
        card.querySelector('.category').textContent = newsItem.category;
        card.querySelector('.date').textContent = newsItem.date;
        card.querySelector('.card-title').textContent = newsItem.title;
        
        card.classList.remove('hidden');

        // Add click event listener to the card
        card.addEventListener('click', () => {
            localStorage.setItem('newsDetail', JSON.stringify(newsItem));
            window.location.href = 'news-detail.html';
        });

        return card;
    }

    function renderCards() {
        const nextIndex = Math.min(currentIndex + cardsToReveal, newsData.length);
        const newsToShow = newsData.slice(currentIndex, nextIndex);

        newsToShow.forEach(newsItem => {
            cardGrid.appendChild(createCard(newsItem));
        });

        currentIndex = nextIndex;
        showMoreButton.style.display = currentIndex >= newsData.length ? 'none' : 'block';
    }

    async function loadNews() {
        await fetchNews();
        renderCards();
        showMoreButton.addEventListener('click', renderCards);
    }

    loadNews();
});