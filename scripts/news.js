async function loadNews() {
    try {
        const response = await fetch('data/news.json'); 
        const data = await response.json();
        const cards = document.querySelectorAll('.card'); 

        cards.forEach((card, index) => {
            const category = card.querySelector('.category');
            const date = card.querySelector('.date');
            const title = card.querySelector('.card-title');
            const img = card.querySelector('.news-thumbnail');

            const newsItem = data[index]; // Use the index to get the corresponding news item
            if (newsItem) {
                date.textContent = newsItem.date; 
                title.textContent = newsItem.title; 
                img.src = newsItem.thumbnail;
                img.alt = newsItem.title; 
                category.textContent = newsItem.category; 
            }
        });
    } 
    catch (error) {
        console.error('Error loading news:', error);
    }
}

loadNews();