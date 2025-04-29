async function loadNews() {
    const cardGrid = document.getElementById('card-grid');
    const cardTemplate = cardGrid.querySelector('.card'); // Get the existing card template

    try {
        const response = await fetch('data/news.json');
        const data = await response.json();
        cardGrid.innerHTML = '';

        data.forEach((newsItem) => {
            const card = cardTemplate.cloneNode(true); // Clone the existing card template
            card.querySelector('.news-thumbnail').src = newsItem.thumbnail;
            card.querySelector('.news-thumbnail').alt = newsItem.title;
            card.querySelector('.category').textContent = newsItem.category;
            card.querySelector('.date').textContent = newsItem.date;
            card.querySelector('.card-title').textContent = newsItem.title;

            cardGrid.appendChild(card);
        });
    } 
    catch (error) {
        console.error('Error loading news:', error);
    }
}

loadNews();